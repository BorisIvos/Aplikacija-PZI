"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var article_entity_1 = require("./article.entity");
var Validator = require("class-validator");
var ArticlePrice = /** @class */ (function () {
    function ArticlePrice() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({
            type: "int",
            name: "article_price_id",
            unsigned: true
        })
    ], ArticlePrice.prototype, "articlePriceId");
    __decorate([
        typeorm_1.Column({ type: "int", name: "article_id", unsigned: true })
    ], ArticlePrice.prototype, "articleId");
    __decorate([
        typeorm_1.Column({
            type: "decimal",
            unsigned: true,
            precision: 10,
            scale: 2
        }),
        Validator.IsNotEmpty(),
        Validator.IsPositive(),
        Validator.IsNumber({
            allowInfinity: false,
            allowNaN: false,
            maxDecimalPlaces: 2
        })
    ], ArticlePrice.prototype, "price");
    __decorate([
        typeorm_1.Column({
            type: "timestamp",
            name: "created_at",
            "default": function () { return "CURRENT_TIMESTAMP"; }
        })
    ], ArticlePrice.prototype, "createdAt");
    __decorate([
        typeorm_1.ManyToOne(function () { return article_entity_1.Article; }, function (article) { return article.articlePrices; }, { onDelete: "NO ACTION", onUpdate: "CASCADE" }),
        typeorm_1.JoinColumn([{ name: "article_id", referencedColumnName: "articleId" }])
    ], ArticlePrice.prototype, "article");
    ArticlePrice = __decorate([
        typeorm_1.Index("fk_article_price_article_id", ["articleId"], {}),
        typeorm_1.Entity("article_price")
    ], ArticlePrice);
    return ArticlePrice;
}());
exports.ArticlePrice = ArticlePrice;

//# sourceMappingURL=article-price.js.map
