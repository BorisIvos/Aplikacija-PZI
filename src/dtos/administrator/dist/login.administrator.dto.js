"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var Validator = require("class-validator");
var LoginAdministratorDto = /** @class */ (function () {
    function LoginAdministratorDto() {
    }
    __decorate([
        Validator.IsNotEmpty(),
        Validator.IsString(),
        Validator.Matches(/^[a-z][a-z0-9\.]{3,30}[a-z0-9]$/)
    ], LoginAdministratorDto.prototype, "username");
    __decorate([
        Validator.IsNotEmpty(),
        Validator.IsString(),
        Validator.Length(4, 128)
    ], LoginAdministratorDto.prototype, "password");
    return LoginAdministratorDto;
}());
exports.LoginAdministratorDto = LoginAdministratorDto;

//# sourceMappingURL=login.administrator.dto.js.map
