import { Body, Controller, Delete, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Crud } from "@nestjsx/crud";
import { Article } from "src/entities/article.entity";
import { AddArticleDto } from "src/dtos/article/add.article.dto";
import { ArticleService } from "src/services/article/article.service";
import { diskStorage} from "multer";
import { StorageConfig } from "config/storage.config";
import { PhotoService } from "src/services/photo/photo.services";
import { Photo } from "src/entities/photo.entity";
import { ApiResponse } from "src/misc/api.response.class";
import * as fileType from 'file-type';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { DeleteResult } from "typeorm";
import { EditArticleDto } from "src/dtos/article/edit.article.dtos";

import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";
import { RoleCheckedGuard } from "src/misc/role.checker.guard";



@Controller('api/article')
@Crud({
    model: {
        type: Article
    },
    params: {
        id: {
            field: 'article_Id',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            category: {
                eager: true
            },
            photos: {
                eager: true
            },
            articlePrices: {
                eager: true
            },
            articleFeatures: {
                eager: true
            },
            features: {
                eager: true
            }
            
           
         }
     },

     routes: {
        only: [
            'getOneBase',
            'getManyBase',
        ],
        getOneBase: {
            decorators: [
                UseGuards(RoleCheckedGuard),
                AllowToRoles('administrator', 'user')
            ],
        },
     },


 })

    
export class ArticleController {
    constructor(public service: ArticleService,
                public photoService: PhotoService,
                                
        ) { }
    
    @Post()  //Post http://localhost:3000/api/article/createFull/
    @UseGuards(RoleCheckedGuard)
    @AllowToRoles('administrator')
    createFullArticle(@Body() data: AddArticleDto){
        return this.service.createFullArticle(data);
    }

    @Patch(':id')    //PATCH http://localhost:3000/api/article/2/
    @UseGuards(RoleCheckedGuard)
    @AllowToRoles('administrator')
    editFullArticle(@Param('id') id:number, @Body() data: EditArticleDto) {
        return this.service.editFullArticle(id, data);
    }

    @Post(':id/uploadPhoto/') // POST http://localhost:3000/api/article/:id/uploadPhoto
    @UseGuards(RoleCheckedGuard)
    @AllowToRoles('administrator')
    @UseInterceptors(
        FileInterceptor('photo', {
            storage: diskStorage({
                destination: StorageConfig.photo.destination,
                filename: (req, file, callback) => {
                    let original: string = file.originalname;

                    let normalized = original.replace(/\s+/g, '-');
                    normalized = normalized.replace(/[^A-z0-9\.\-]/g, '');
                    let sada = new Date();
                    let datePart = '';
                    datePart += sada.getFullYear().toString();
                    datePart += (sada.getMonth() + 1).toString();
                    datePart += sada.getDate().toString();

                    let randomPart: string =
                        new Array(10)
                            .fill(0)
                            .map(e => (Math.random() * 9).toFixed(0).toString())
                            .join('');

                    let fileName = datePart + '-' + randomPart + '-' + normalized;
                    fileName = fileName.toLocaleLowerCase();

                    callback(null, fileName);
                }
            }),
            fileFilter: (req, file, callback) => {
                // 1. Check ekstenzije: JPG, PNG
                if (!file.originalname.toLowerCase().match(/\.(jpg|png)$/)) {
                    req.fileFilterError = 'Bad file extension!';
                    callback(null, false);
                    return;
                }

                // 2. Check tipa sadrzaja: image/jpeg, image/png (mimetype)
                if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
                    req.fileFilterError = 'Bad file content type!';
                    callback(null, false);
                    return;
                }

                callback(null, true);
            },
            limits: {
                files: 1,
                fileSize: StorageConfig.photo.maxSize,
            },
        })
    )
    async uploadPhoto(
        @Param('id') articleId: number,
        @UploadedFile() photo,
        @Req() req
        ): Promise<ApiResponse | Photo> {
           if (req.fileFilterError){
               return new ApiResponse ('error', -4002, req.fileFilterError);
           }

           if(!photo){
                return new ApiResponse('error', -4002, 'File not uploaded!');

           }

           

           const fileTypeResult = await fileType.fromFile(photo.path);
           if(!fileTypeResult) {
                fs.unlinkSync(photo.path);
                return new ApiResponse('error', -4002, 'Cannot detect file type!');
           }

           const realMimeType = fileTypeResult.mime;
           if (!(realMimeType.includes('jpeg') || realMimeType.includes('png'))){
               fs.unlinkSync(photo.path);
               
               return new ApiResponse('error', -4002, 'Bad file content type!');

           }
        await this.createResizedImage(photo, StorageConfig.photo.resize.thumb)
        await this.createResizedImage(photo, StorageConfig.photo.resize.small)
        

        const newPhoto: Photo = new Photo();

        newPhoto.articleId = articleId;
        newPhoto.imagePath = photo.filename;

        const savedPhoto = await this.photoService.add(newPhoto);
        if(!savedPhoto){
            return new ApiResponse('error', -4001)
        }
        return savedPhoto;

    }
    async createResizedImage(photo, resizedSettings) {
        const originalFilePath = photo.path;
        const fileName = photo.filename;

        const destinationFilePath =
        StorageConfig.photo.destination +
        resizedSettings.directory +
        fileName;

        await sharp(originalFilePath)
            .resize({
                fit: 'cover',
                width: resizedSettings.photo.resize.width,
                height: resizedSettings.photo.resize.height,
               
            })
            .toFile(destinationFilePath);

    }
   // http://localhost:3000/api/article/1/deltePhoto/45/
    @Delete(':articleId/deltePhoto/:photoId')
    @UseGuards(RoleCheckedGuard)
    @AllowToRoles('administrator')
    public async deltePhoto(
        @Param('articleId') articleId: number,
        @Param('photoId') photoId: number,
    ) {
        const photo = await this.photoService.findOne({
            articleId: articleId,
            photoId: photoId

        });

        if (!photo){
            return new ApiResponse('error', -4004, 'Photo not found');

        }
        try{ 
        fs.unlinkSync(StorageConfig.photo.destination + photo.imagePath);
        fs.unlinkSync(StorageConfig.photo.destination +
                      StorageConfig.photo.resize.thumb.directory + 
                      photo.imagePath);
        fs.unlinkSync(StorageConfig.photo.destination +
                      StorageConfig.photo.resize.small.directory + 
                      photo.imagePath);
         } catch(e) {}
       const deleteResult = await this.photoService.deleteById(photoId);

       if (deleteResult.affected === 0) {
           return new ApiResponse('error', -4004, 'Photo not found!');
        }

       return new ApiResponse('ok', 0, 'One photo deleted!');

    }
}


function deleteById(id: any, number: any) {
    throw new Error("Function not implemented.");
}

