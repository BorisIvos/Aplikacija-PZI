"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var RoleCheckedGuard = /** @class */ (function () {
    function RoleCheckedGuard(reflector) {
        this.reflector = reflector;
    }
    RoleCheckedGuard.prototype.canActivate = function (context) {
        var req = context.switchToHttp().getRequest();
        var role = req.token.role;
        var allowedToRoles = this
            .reflector
            .get('allow_to_roles', context.getHandler());
        if (!allowedToRoles.includes(role)) {
            return false;
        }
        return true;
        // true  - odobravamo izvrsavanje metoda
        // false - ne odobravamo izvrsavanje metoda // throw new HttpExc...
    };
    RoleCheckedGuard = __decorate([
        common_1.Injectable()
    ], RoleCheckedGuard);
    return RoleCheckedGuard;
}());
exports.RoleCheckedGuard = RoleCheckedGuard;

//# sourceMappingURL=role.checker.guard.js.map
