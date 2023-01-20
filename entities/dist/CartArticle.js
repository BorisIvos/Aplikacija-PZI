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
var cart_entity_1 = require("./cart.entity");
var CartArticle = /** @class */ (function () {
    function CartArticle() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({
            type: "int",
            name: "cart_article_id",
            unsigned: true
        })
    ], CartArticle.prototype, "cartArticleId");
    __decorate([
        typeorm_1.Column("int", { name: "cart_id", unsigned: true, "default": function () { return "'0'"; } })
    ], CartArticle.prototype, "cartId");
    __decorate([
        typeorm_1.Column("int", { name: "article_id", unsigned: true, "default": function () { return "'0'"; } })
    ], CartArticle.prototype, "articleId");
    __decorate([
        typeorm_1.Column("int", { name: "quantity", unsigned: true, "default": function () { return "'0'"; } })
    ], CartArticle.prototype, "quantity");
    __decorate([
        typeorm_1.ManyToOne(function () { return article_entity_1.Article; }, function (article) { return article.cartArticles; }, {
            onDelete: "RESTRICT",
            onUpdate: "CASCADE"
        }),
        typeorm_1.JoinColumn([{ name: "article_id", referencedColumnName: "articleId" }])
    ], CartArticle.prototype, "article");
    __decorate([
        typeorm_1.ManyToOne(function () { return cart_entity_1.Cart; }, function (cart) { return cart.cartArticles; }, {
            onDelete: "RESTRICT",
            onUpdate: "CASCADE"
        }),
        typeorm_1.JoinColumn([{ name: "cart_id", referencedColumnName: "cartId" }])
    ], CartArticle.prototype, "cart");
    CartArticle = __decorate([
        typeorm_1.Index("fk_cart_article_article_id", ["articleId"], {}),
        typeorm_1.Index("uq_cart_article_cart_id_article_id", ["cartId", "articleId"], {
            unique: true
        }),
        typeorm_1.Entity("cart_article", { schema: "aplikacija" })
    ], CartArticle);
    return CartArticle;
}());
exports.CartArticle = CartArticle;

//# sourceMappingURL=CartArticle.js.map
