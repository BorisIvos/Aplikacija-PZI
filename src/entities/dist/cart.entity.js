"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var cart_article_entity_1 = require("./cart-article.entity");
var user_entity_1 = require("./user.entity");
var order_entity_1 = require("./order.entity");
var Cart = /** @class */ (function () {
    function Cart() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "cart_id", unsigned: true })
    ], Cart.prototype, "cartId");
    __decorate([
        typeorm_1.Column({ type: "int", name: "user_id", unsigned: true })
    ], Cart.prototype, "userId");
    __decorate([
        typeorm_1.Column({
            type: "timestamp",
            name: "created_at",
            "default": function () { return "CURRENT_TIMESTAMP"; }
        })
    ], Cart.prototype, "createdAt");
    __decorate([
        typeorm_1.OneToMany(function () { return cart_article_entity_1.CartArticle; }, function (cartArticle) { return cartArticle.cart; })
    ], Cart.prototype, "cartArticles");
    __decorate([
        typeorm_1.ManyToOne(function () { return user_entity_1.User; }, function (user) { return user.carts; }, { onDelete: "NO ACTION", onUpdate: "CASCADE" }),
        typeorm_1.JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
    ], Cart.prototype, "user");
    __decorate([
        typeorm_1.OneToOne(function () { return order_entity_1.Order; }, function (order) { return order.cart; })
    ], Cart.prototype, "order");
    Cart = __decorate([
        typeorm_1.Index("fk_cart_user_id", ["userId"], {}),
        typeorm_1.Entity("cart")
    ], Cart);
    return Cart;
}());
exports.Cart = Cart;

//# sourceMappingURL=cart.entity.js.map
