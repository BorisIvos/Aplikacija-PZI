"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var cart_entity_1 = require("./cart.entity");
var Order = /** @class */ (function () {
    function Order() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "order_id", unsigned: true })
    ], Order.prototype, "orderId");
    __decorate([
        typeorm_1.Column({
            type: "timestamp",
            name: "created_at",
            "default": function () { return "CURRENT_TIMESTAMP"; }
        })
    ], Order.prototype, "createdAt");
    __decorate([
        typeorm_1.Column({
            type: "int",
            name: "cart_id",
            unique: true,
            unsigned: true
        })
    ], Order.prototype, "cartId");
    __decorate([
        typeorm_1.Column({
            type: "enum",
            "enum": ["rejected", "accepted", "shipped", "pending"],
            "default": function () { return "'pending'"; }
        })
    ], Order.prototype, "status");
    __decorate([
        typeorm_1.OneToOne(function () { return cart_entity_1.Cart; }, function (cart) { return cart.order; }, {
            onDelete: "RESTRICT",
            onUpdate: "CASCADE"
        }),
        typeorm_1.JoinColumn([{ name: "cart_id", referencedColumnName: "cartId" }])
    ], Order.prototype, "cart");
    Order = __decorate([
        typeorm_1.Index("uq_order_cart_id", ["cartId"], { unique: true }),
        typeorm_1.Entity("order")
    ], Order);
    return Order;
}());
exports.Order = Order;

//# sourceMappingURL=order.entity.js.map
