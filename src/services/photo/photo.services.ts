import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Photo } from "src/entities/photo.entity";
import { Repository } from "typeorm";

@Injectable()
export class PhotoService extends TypeOrmCrudService<Photo> {
    delet(id: any) {
        throw new Error("Method not implemented.");
    }
    constructor(
        @InjectRepository(Photo)
        private readonly photo: Repository<Photo>){
        super(photo);

    }  

    add(newPhoto: Photo): Promise<Photo> {
        return this.photo.save(newPhoto)
    }

    async deleteById(id: number) {
        return await this.photo.delete(id);
    }
}