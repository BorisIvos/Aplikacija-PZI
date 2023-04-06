"use strict";
exports.__esModule = true;
var LoginInfoDto = /** @class */ (function () {
    function LoginInfoDto(id, identity, jwt, refreshToken, refreshTokenExpiresAt) {
        this.id = id;
        this.identity = identity;
        this.token = jwt;
        this.refreshToken = refreshToken;
        this.refreshTokenExpiresAt = refreshTokenExpiresAt;
    }
    return LoginInfoDto;
}());
exports.LoginInfoDto = LoginInfoDto;

//# sourceMappingURL=login.info.dto.js.map
