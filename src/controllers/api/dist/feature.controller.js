"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var feature_entity_1 = require("src/entities/feature.entity");
var crud_1 = require("@nestjsx/crud");
var role_checker_guard_1 = require("src/misc/role.checker.guard");
var allow_to_roles_descriptor_1 = require("src/misc/allow.to.roles.descriptor");
var FeatureController = /** @class */ (function () {
    function FeatureController(service) {
        this.service = service;
    }
    FeatureController = __decorate([
        common_1.Controller('api/feature'),
        crud_1.Crud({
            model: {
                type: feature_entity_1.Feature
            },
            params: {
                id: {
                    field: 'featureId',
                    type: 'number',
                    primary: true
                }
            },
            query: {
                join: {
                    category: {
                        eager: true
                    },
                    articleFeatures: {
                        eager: false
                    },
                    articles: {
                        eager: false
                    }
                }
            },
            routes: {
                only: [
                    "createOneBase",
                    "createManyBase",
                    "getManyBase",
                    "getOneBase",
                    "updateOneBase",
                ],
                createOneBase: {
                    decorators: [
                        common_1.UseGuards(role_checker_guard_1.RoleCheckedGuard),
                        allow_to_roles_descriptor_1.AllowToRoles('administrator'),
                    ]
                },
                createManyBase: {
                    decorators: [
                        common_1.UseGuards(role_checker_guard_1.RoleCheckedGuard),
                        allow_to_roles_descriptor_1.AllowToRoles('administrator'),
                    ]
                },
                updateOneBase: {
                    decorators: [
                        common_1.UseGuards(role_checker_guard_1.RoleCheckedGuard),
                        allow_to_roles_descriptor_1.AllowToRoles('administrator'),
                    ]
                },
                getManyBase: {
                    decorators: [
                        common_1.UseGuards(role_checker_guard_1.RoleCheckedGuard),
                        allow_to_roles_descriptor_1.AllowToRoles('administrator', 'user')
                    ]
                }
            }
        })
    ], FeatureController);
    return FeatureController;
}());
exports.FeatureController = FeatureController;

//# sourceMappingURL=feature.controller.js.map
