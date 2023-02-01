"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var crud_1 = require("@nestjsx/crud");
var article_entity_1 = require("entities/article.entity");
var multer_1 = require("multer");
var storage_config_1 = require("config/storage.config");
var photo_entity_1 = require("entities/photo.entity");
var api_response_class_1 = require("src/misc/api.response.class");
var fileType = require("file-type");
var fs = require("fs");
var sharp = require("sharp");
var ArticleController = /** @class */ (function () {
    function ArticleController(service, photoService) {
        this.service = service;
        this.photoService = photoService;
    }
    ArticleController.prototype.createFullArticle = function (data) {
        return this.service.createFullArticle(data);
    };
    ArticleController.prototype.uploadPhoto = function (articleId, photo, req) {
        return __awaiter(this, void 0, Promise, function () {
            var fileTypeResult, realMimeType, newPhoto, savedPhoto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (req.fileFilterError) {
                            return [2 /*return*/, new api_response_class_1.ApiResponse('error', -4002, req.fileFilterError)];
                        }
                        if (!photo) {
                            return [2 /*return*/, new api_response_class_1.ApiResponse('error', -4002, 'File not uploaded!')];
                        }
                        return [4 /*yield*/, fileType.fromFile(photo.path)];
                    case 1:
                        fileTypeResult = _a.sent();
                        if (!fileTypeResult) {
                            fs.unlinkSync(photo.path);
                            return [2 /*return*/, new api_response_class_1.ApiResponse('error', -4002, 'Cannot detect file type!')];
                        }
                        realMimeType = fileTypeResult.mime;
                        if (!(realMimeType.includes('jpeg') || realMimeType.includes('png'))) {
                            fs.unlinkSync(photo.path);
                            return [2 /*return*/, new api_response_class_1.ApiResponse('error', -4002, 'Bad file content type!')];
                        }
                        return [4 /*yield*/, this.createThumb(photo)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.createSmallImage(photo)];
                    case 3:
                        _a.sent();
                        newPhoto = new photo_entity_1.Photo();
                        newPhoto.articleId = articleId;
                        newPhoto.imagePath = photo.filename;
                        return [4 /*yield*/, this.photoService.add(newPhoto)];
                    case 4:
                        savedPhoto = _a.sent();
                        if (!savedPhoto) {
                            return [2 /*return*/, new api_response_class_1.ApiResponse('error', -4001)];
                        }
                        return [2 /*return*/, savedPhoto];
                }
            });
        });
    };
    ArticleController.prototype.createThumb = function (photo) {
        return __awaiter(this, void 0, void 0, function () {
            var originalFilePath, fileName, destinationFilePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        originalFilePath = photo.path;
                        fileName = photo.filename;
                        destinationFilePath = storage_config_1.StorageConfig.photoDestination + "thumb/" + fileName;
                        return [4 /*yield*/, sharp(originalFilePath)
                                .resize({
                                fit: 'cover',
                                width: storage_config_1.StorageConfig.photoThumbSize.width,
                                height: storage_config_1.StorageConfig.photoThumbSize.height,
                                background: {
                                    r: 255, g: 255, b: 255, alpha: 0.0
                                }
                            })
                                .toFile(destinationFilePath)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ArticleController.prototype.createSmallImage = function (photo) {
        return __awaiter(this, void 0, void 0, function () {
            var originalFilePath, fileName, destinationFilePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        originalFilePath = photo.path;
                        fileName = photo.filename;
                        destinationFilePath = storage_config_1.StorageConfig.photoDestination + "small/" + fileName;
                        return [4 /*yield*/, sharp(originalFilePath)
                                .resize({
                                fit: 'contain',
                                width: storage_config_1.StorageConfig.photoSmallSize.width,
                                height: storage_config_1.StorageConfig.photoSmallSize.height,
                                background: {
                                    r: 255, g: 255, b: 255, alpha: 0.0
                                }
                            })
                                .toFile(destinationFilePath)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        common_1.Post('createFull') //Post http://localhost:3000/api/article/createFull/
        ,
        __param(0, common_1.Body())
    ], ArticleController.prototype, "createFullArticle");
    __decorate([
        common_1.Post(':id/uploadPhoto/') // POST http://localhost:3000/api/article/:id/uploadPhoto
        ,
        common_1.UseInterceptors(platform_express_1.FileInterceptor('photo', {
            storage: multer_1.diskStorage({
                destination: storage_config_1.StorageConfig.photoDestination,
                filename: function (req, file, callback) {
                    var original = file.originalname;
                    var normalized = original.replace(/\s+/g, '-');
                    normalized = normalized.replace(/[^A-z0-9\.\-]/g, '');
                    var sada = new Date();
                    var datePart = '';
                    datePart += sada.getFullYear().toString();
                    datePart += (sada.getMonth() + 1).toString();
                    datePart += sada.getDate().toString();
                    var randomPart = new Array(10)
                        .fill(0)
                        .map(function (e) { return (Math.random() * 9).toFixed(0).toString(); })
                        .join('');
                    var fileName = datePart + '-' + randomPart + '-' + normalized;
                    fileName = fileName.toLocaleLowerCase();
                    callback(null, fileName);
                }
            }),
            fileFilter: function (req, file, callback) {
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
                fileSize: storage_config_1.StorageConfig.photoMaxFileSize
            }
        })),
        __param(0, common_1.Param('id')),
        __param(1, common_1.UploadedFile()),
        __param(2, common_1.Req())
    ], ArticleController.prototype, "uploadPhoto");
    ArticleController = __decorate([
        common_1.Controller('api/article'),
        crud_1.Crud({
            model: {
                type: article_entity_1.Article
            },
            params: {
                id: {
                    field: 'articleId',
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
            }
        })
    ], ArticleController);
    return ArticleController;
}());
exports.ArticleController = ArticleController;

//# sourceMappingURL=article.controller.js.map
