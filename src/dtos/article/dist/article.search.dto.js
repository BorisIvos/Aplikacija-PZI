"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var Validator = require("class-validator");
var ArticleSearchDto = /** @class */ (function () {
    function ArticleSearchDto() {
    }
    __decorate([
        Validator.IsNotEmpty(),
        Validator.IsPositive(),
        Validator.IsNumber({
            allowInfinity: false,
            allowNaN: false,
            maxDecimalPlaces: 0
        })
    ], ArticleSearchDto.prototype, "categoryId");
    __decorate([
        Validator.IsOptional(),
        Validator.IsString(),
        Validator.Length(0, 128)
    ], ArticleSearchDto.prototype, "keywords");
    __decorate([
        Validator.IsOptional(),
        Validator.IsPositive(),
        Validator.IsNumber({
            allowInfinity: false,
            allowNaN: false,
            maxDecimalPlaces: 2
        })
    ], ArticleSearchDto.prototype, "priceMin");
    __decorate([
        Validator.IsOptional(),
        Validator.IsPositive(),
        Validator.IsNumber({
            allowInfinity: false,
            allowNaN: false,
            maxDecimalPlaces: 2
        })
    ], ArticleSearchDto.prototype, "priceMax");
    __decorate([
        Validator.IsOptional(),
        Validator.IsIn(['name', 'price'])
    ], ArticleSearchDto.prototype, "orderBy");
    __decorate([
        Validator.IsOptional(),
        Validator.IsIn(['ASC', 'DESC'])
    ], ArticleSearchDto.prototype, "orderDirection");
    __decorate([
        Validator.IsOptional(),
        Validator.IsPositive(),
        Validator.IsNumber({
            allowInfinity: false,
            allowNaN: false,
            maxDecimalPlaces: 0
        })
    ], ArticleSearchDto.prototype, "page");
    __decorate([
        Validator.IsOptional(),
        Validator.IsIn([5, 10, 25, 50, 75])
    ], ArticleSearchDto.prototype, "itemsPerPage");
    return ArticleSearchDto;
}());
exports.ArticleSearchDto = ArticleSearchDto;

//# sourceMappingURL=article.search.dto.js.map
