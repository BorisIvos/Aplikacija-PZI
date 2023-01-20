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
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
    ], User.prototype, "userId");
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            unique: true,
            length: 255
        })
    ], User.prototype, "email");
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            name: "password_hash",
            length: 128
        })
    ], User.prototype, "passwordHash");
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 64 })
    ], User.prototype, "forname");
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 64 })
    ], User.prototype, "surename");
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            name: "phone_number",
            unique: true,
            length: 24
        })
    ], User.prototype, "phoneNumber");
    __decorate([
        typeorm_1.Column({ type: "text", name: "postal_address" })
    ], User.prototype, "postalAddress");
    __decorate([
        typeorm_1.OneToMany(function () { return cart_entity_1.Cart; }, function (cart) { return cart.user; })
    ], User.prototype, "carts");
    User = __decorate([
        typeorm_1.Index("uq_user_email", ["email"], { unique: true }),
        typeorm_1.Index("uq_user_phone_number", ["phoneNumber"], { unique: true }),
        typeorm_1.Entity("user")
    ], User);
    return User;
}());
exports.User = User;

//# sourceMappingURL=user.entity.js.map
