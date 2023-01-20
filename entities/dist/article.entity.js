"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var category_entity_1 = require("./category.entity");
var article_feuters_entity_1 = require("./article-feuters.entity");
var article_price_1 = require("./article-price");
var cart_article_entity_1 = require("./cart-article.entity");
var photo_entity_1 = require("./photo.entity");
var Article = /** @class */ (function () {
    function Article() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "article_id", unsigned: true })
    ], Article.prototype, "articleId");
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 128 })
    ], Article.prototype, "name");
    __decorate([
        typeorm_1.Column({ type: "int", name: "category_id", unsigned: true })
    ], Article.prototype, "categoryId");
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 255 })
    ], Article.prototype, "excerpt");
    __decorate([
        typeorm_1.Column({ type: "text" })
    ], Article.prototype, "description");
    __decorate([
        typeorm_1.Column({
            type: "enum",
            "enum": ["available", "visible", "hidden"],
            "default": function () { return "'available'"; }
        })
    ], Article.prototype, "status");
    __decorate([
        typeorm_1.Column({
            type: "tinyint",
            name: "is_promoted",
            unsigned: true,
            "default": function () { return "'0'"; }
        })
    ], Article.prototype, "isPromoted");
    __decorate([
        typeorm_1.Column({
            type: "timestamp",
            name: "created_at",
            "default": function () { return "CURRENT_TIMESTAMP"; }
        })
    ], Article.prototype, "createdAt");
    __decorate([
        typeorm_1.ManyToOne(function () { return category_entity_1.Category; }, function (category) { return category.articles; }, {
            onDelete: "RESTRICT",
            onUpdate: "CASCADE"
        }),
        typeorm_1.JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
    ], Article.prototype, "category");
    __decorate([
        typeorm_1.OneToMany(function () { return article_feuters_entity_1.ArticleFeature; }, function (articleFeature) { return articleFeature.article; })
    ], Article.prototype, "articleFeatures");
    __decorate([
        typeorm_1.OneToMany(function () { return article_price_1.ArticlePrice; }, function (articlePrice) { return articlePrice.article; })
    ], Article.prototype, "articlePrices");
    __decorate([
        typeorm_1.OneToMany(function () { return cart_article_entity_1.CartArticle; }, function (cartArticle) { return cartArticle.article; })
    ], Article.prototype, "cartArticles");
    __decorate([
        typeorm_1.OneToMany(function () { return photo_entity_1.Photo; }, function (photo) { return photo.article; })
    ], Article.prototype, "photos");
    Article = __decorate([
        typeorm_1.Index("FK_article_category", ["categoryId"], {}),
        typeorm_1.Entity("article")
    ], Article);
    return Article;
}());
exports.Article = Article;

//# sourceMappingURL=article.entity.js.map
