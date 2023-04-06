"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var Validator = require("class-validator");
var UserRegistrationDto = /** @class */ (function () {
    function UserRegistrationDto() {
    }
    __decorate([
        Validator.IsNotEmpty(),
        Validator.IsEmail({
            allow_ip_domain: false,
            allow_utf8_local_part: true,
            require_tld: true
        })
    ], UserRegistrationDto.prototype, "email");
    __decorate([
        Validator.IsNotEmpty(),
        Validator.IsString(),
        Validator.Length(4, 128)
    ], UserRegistrationDto.prototype, "password");
    __decorate([
        Validator.IsNotEmpty(),
        Validator.IsString(),
        Validator.Length(2, 64)
    ], UserRegistrationDto.prototype, "forename");
    __decorate([
        Validator.IsNotEmpty(),
        Validator.IsString(),
        Validator.Length(2, 64)
    ], UserRegistrationDto.prototype, "surename");
    __decorate([
        Validator.IsNotEmpty(),
        Validator.IsPhoneNumber(null)
    ], UserRegistrationDto.prototype, "phoneNumber");
    __decorate([
        Validator.IsNotEmpty(),
        Validator.IsString(),
        Validator.Length(10, 512)
    ], UserRegistrationDto.prototype, "postalAddress");
    return UserRegistrationDto;
}());
exports.UserRegistrationDto = UserRegistrationDto;

//# sourceMappingURL=user.registration.dto.js.map
