"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var database_configuration_1 = require("config/database.configuration");
var administrator_entity_1 = require("src/entities/administrator.entity");
var article_feuters_entity_1 = require("src/entities/article-feuters.entity");
var article_price_1 = require("src/entities/article-price");
var article_entity_1 = require("src/entities/article.entity");
var cart_article_entity_1 = require("src/entities/cart-article.entity");
var cart_entity_1 = require("src/entities/cart.entity");
var category_entity_1 = require("src/entities/category.entity");
var features_entity_1 = require("src/entities/features.entity");
var order_entity_1 = require("src/entities/order.entity");
var photo_entity_1 = require("src/entities/photo.entity");
var user_entity_1 = require("src/entities/user.entity");
var administrator_controller_1 = require("./controllers/api/administrator.controller");
var article_controller_1 = require("./controllers/api/article.controller");
var auth_controller_1 = require("./controllers/api/auth.controller");
var category_controller_1 = require("./controllers/api/category.controller");
var app_controller_1 = require("./controllers/app.controller");
var auth_middleware_1 = require("./middlewares/auth.middleware");
var administrator_service_1 = require("./services/administrator/administrator.service");
var category_service_1 = require("./services/administrator/category/category.service");
var article_service_1 = require("./services/article/article.service");
var photo_services_1 = require("./services/photo/photo.services");
database_configuration_1.DatabaseConfiguration;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        consumer
            .apply(auth_middleware_1.AuthMidleware)
            .exclude('auth/*')
            .forRoutes('api/*');
    };
    AppModule = __decorate([
        common_1.Module({
            imports: [
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'mysql',
                    host: database_configuration_1.DatabaseConfiguration.hostname,
                    port: 3306,
                    username: database_configuration_1.DatabaseConfiguration.username,
                    password: database_configuration_1.DatabaseConfiguration.password,
                    database: database_configuration_1.DatabaseConfiguration.database,
                    entities: [administrator_entity_1.Administrator,
                        article_feuters_entity_1.ArticleFeature,
                        article_price_1.ArticlePrice,
                        article_entity_1.Article,
                        cart_article_entity_1.CartArticle,
                        cart_entity_1.Cart,
                        category_entity_1.Category,
                        features_entity_1.Feature,
                        order_entity_1.Order,
                        photo_entity_1.Photo,
                        user_entity_1.User,
                    ]
                }),
                typeorm_1.TypeOrmModule.forFeature([
                    administrator_entity_1.Administrator,
                    article_feuters_entity_1.ArticleFeature,
                    article_price_1.ArticlePrice,
                    article_entity_1.Article,
                    cart_article_entity_1.CartArticle,
                    cart_entity_1.Cart,
                    category_entity_1.Category,
                    features_entity_1.Feature,
                    order_entity_1.Order,
                    photo_entity_1.Photo,
                    user_entity_1.User,
                ])
            ],
            controllers: [
                app_controller_1.AppController,
                administrator_controller_1.AdministratorController,
                category_controller_1.CategoryController,
                article_controller_1.ArticleController,
                auth_controller_1.AuthController,
            ],
            providers: [
                administrator_service_1.AdministratorService,
                category_service_1.CategoryService,
                article_service_1.ArticleService,
                photo_services_1.PhotoService,
            ],
            exports: [
                administrator_service_1.AdministratorService,
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

//# sourceMappingURL=app.module.js.map
