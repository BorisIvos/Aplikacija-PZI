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
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var crud_1 = require("@nestjsx/crud");
var article_entity_1 = require("entities/article.entity");
var ArticleController = /** @class */ (function () {
    function ArticleController(service) {
        this.service = service;
    }
    ArticleController.prototype.createFullArticle = function (data) {
        return this.service.createFullArticle(data);
    };
    __decorate([
        common_1.Post('createFull') //Post http://localhost:3000/api/article/createFull/
        ,
        __param(0, common_1.Body())
    ], ArticleController.prototype, "createFullArticle");
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
