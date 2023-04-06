"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var Validator = require("class-validator");
var Administrator = /** @class */ (function () {
    function Administrator() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({
            type: "int",
            name: "administrator_id",
            unsigned: true
        })
    ], Administrator.prototype, "administratorId");
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            unique: true,
            length: 32
        }),
        Validator.IsNotEmpty(),
        Validator.IsString(),
        Validator.Matches(/^[a-z][a-z0-9\.]{3,30}[a-z0-9]$/)
    ], Administrator.prototype, "username");
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            name: "password_hash",
            length: 128
        }),
        Validator.IsNotEmpty(),
        Validator.IsHash('sha512')
    ], Administrator.prototype, "passwordHash");
    Administrator = __decorate([
        typeorm_1.Index("uq_administrator_username", ["username"], { unique: true }),
        typeorm_1.Entity("administrator")
    ], Administrator);
    return Administrator;
}());
exports.Administrator = Administrator;

//# sourceMappingURL=administrator.entity.js.map
