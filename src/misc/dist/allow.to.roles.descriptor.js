"use strict";
exports.__esModule = true;
var common_1 = require("@nestjs/common");
exports.AllowToRoles = function () {
    var roles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        roles[_i] = arguments[_i];
    }
    return common_1.SetMetadata('allow_to_roles', roles);
};

//# sourceMappingURL=allow.to.roles.descriptor.js.map
