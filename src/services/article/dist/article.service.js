"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var typeorm_1 = require("@nestjs/typeorm");
var crud_typeorm_1 = require("@nestjsx/crud-typeorm");
var article_feuters_entity_1 = require("src/entities/article-feuters.entity");
var article_price_1 = require("src/entities/article-price");
var article_entity_1 = require("src/entities/article.entity");
var api_response_class_1 = require("src/misc/api.response.class");
var ArticleService = /** @class */ (function (_super) {
    __extends(ArticleService, _super);
    function ArticleService(article, 
    //// Cim se spomene neki repozitori mora se evidentirati u osnovno modulu
    articlePrice, articleFeature) {
        var _this = _super.call(this, article) || this;
        _this.article = article;
        _this.articlePrice = articlePrice;
        _this.articleFeature = articleFeature;
        return _this;
    }
    ArticleService.prototype.createFullArticle = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var newArticle, savedArticle, newArticlePrice, _i, _a, feature, newArticleFeature;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        newArticle = new article_entity_1.Article();
                        newArticle.name = data.name;
                        newArticle.categoryId = data.categoryId;
                        newArticle.excerpt = data.excerpt;
                        newArticle.description = data.description;
                        return [4 /*yield*/, this.article.save(newArticle)];
                    case 1:
                        savedArticle = _b.sent();
                        newArticlePrice = new article_price_1.ArticlePrice();
                        newArticlePrice.articleId = savedArticle.articleId;
                        newArticlePrice.price = data.price;
                        return [4 /*yield*/, this.articlePrice.save(newArticlePrice)];
                    case 2:
                        _b.sent();
                        _i = 0, _a = data.features;
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        feature = _a[_i];
                        newArticleFeature = new article_feuters_entity_1.ArticleFeature();
                        newArticleFeature.articleId = savedArticle.articleId;
                        newArticleFeature.featureId = feature.featureId;
                        newArticleFeature.value = feature.value;
                        return [4 /*yield*/, this.articleFeature.save(newArticleFeature)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [4 /*yield*/, this.article.findOne(savedArticle.articleId, {
                            relations: [
                                "category",
                                "articleFeatures",
                                "features",
                                "articlePrices",
                            ]
                        })];
                    case 7: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    ArticleService.prototype.editFullArticle = function (articleId, data) {
        return __awaiter(this, void 0, Promise, function () {
            var existingArticle, savedArticle, newPriceString, lastPrice, lastPriceString, newArticlePrice, savedArticlePrice, _i, _a, feature, newArticleFeature;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.article.findOne(articleId, {
                            relations: ['articlePrices']
                        })];
                    case 1:
                        existingArticle = _b.sent();
                        if (!existingArticle) {
                            return [2 /*return*/, new api_response_class_1.ApiResponse('error', -5001, 'Article not found.')];
                        }
                        existingArticle.name = data.name;
                        existingArticle.categoryId = data.categoryId;
                        existingArticle.excerpt = data.excerpt;
                        existingArticle.description = data.description;
                        existingArticle.status = data.status;
                        existingArticle.isPromoted = data.isPromoted;
                        return [4 /*yield*/, this.article.save(existingArticle)];
                    case 2:
                        savedArticle = _b.sent();
                        if (!savedArticle) {
                            return [2 /*return*/, new api_response_class_1.ApiResponse('error', -5002, 'Could not save new article data')];
                        }
                        newPriceString = Number(data.price).toFixed(2);
                        lastPrice = existingArticle.articlePrices[existingArticle.articlePrices.length - 1].price;
                        lastPriceString = Number(lastPrice).toFixed(2);
                        if (!(newPriceString !== lastPriceString)) return [3 /*break*/, 4];
                        newArticlePrice = new article_price_1.ArticlePrice();
                        newArticlePrice.articleId = articleId;
                        newArticlePrice.price = data.price;
                        return [4 /*yield*/, this.articlePrice.save(newArticlePrice)];
                    case 3:
                        savedArticlePrice = _b.sent();
                        if (!savedArticlePrice) {
                            return [2 /*return*/, new api_response_class_1.ApiResponse('error', -5003, 'Could not save the new article price.')];
                        }
                        _b.label = 4;
                    case 4:
                        if (!(data.features !== null)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.articleFeature.remove(existingArticle.articleFeatures)];
                    case 5:
                        _b.sent();
                        _i = 0, _a = data.features;
                        _b.label = 6;
                    case 6:
                        if (!(_i < _a.length)) return [3 /*break*/, 9];
                        feature = _a[_i];
                        newArticleFeature = new article_feuters_entity_1.ArticleFeature();
                        newArticleFeature.articleId = articleId;
                        newArticleFeature.featureId = feature.featureId;
                        newArticleFeature.value = feature.value;
                        return [4 /*yield*/, this.articleFeature.save(newArticleFeature)];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 6];
                    case 9: return [4 /*yield*/, this.article.findOne(articleId, {
                            relations: [
                                "category",
                                "articleFeatures",
                                "features",
                                "articlePrices",
                            ]
                        })];
                    case 10: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    ArticleService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(article_entity_1.Article)),
        __param(1, typeorm_1.InjectRepository(article_price_1.ArticlePrice)),
        __param(2, typeorm_1.InjectRepository(article_feuters_entity_1.ArticleFeature))
    ], ArticleService);
    return ArticleService;
}(crud_typeorm_1.TypeOrmCrudService));
exports.ArticleService = ArticleService;

//# sourceMappingURL=article.service.js.map
