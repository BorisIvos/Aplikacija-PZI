"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var cart_article_entity_1 = require("src/entities/cart-article.entity");
var cart_entity_1 = require("src/entities/cart.entity");
var CartService = /** @class */ (function () {
    function CartService(cart, cartArticle) {
        this.cart = cart;
        this.cartArticle = cartArticle;
    }
    CartService.prototype.getLastActiveCartByUserId = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            var carts, cart;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cart.find({
                            where: {
                                userId: userId
                            },
                            order: {
                                createdAt: "DESC"
                            },
                            take: 1,
                            relations: ["order"]
                        })];
                    case 1:
                        carts = _a.sent();
                        if (!carts || carts.length === 0) {
                            return [2 /*return*/, null];
                        }
                        cart = carts[0];
                        if (cart.order !== null) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, cart];
                }
            });
        });
    };
    CartService.prototype.createNewCartForUser = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            var newCart;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newCart = new cart_entity_1.Cart();
                        newCart.userId = userId;
                        return [4 /*yield*/, this.cart.save(newCart)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CartService.prototype.addArticleToCart = function (cartId, articleId, quantity) {
        return __awaiter(this, void 0, Promise, function () {
            var record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cartArticle.findOne({
                            cartId: cartId,
                            articleId: articleId
                        })];
                    case 1:
                        record = _a.sent();
                        if (!record) {
                            record = new cart_article_entity_1.CartArticle();
                            record.cartId = cartId;
                            record.articleId = articleId;
                            record.quantity = quantity;
                        }
                        else {
                            record.quantity += quantity;
                        }
                        return [4 /*yield*/, this.cartArticle.save(record)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.getById(cartId)];
                }
            });
        });
    };
    CartService.prototype.getById = function (cartId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cart.findOne(cartId, {
                            relations: [
                                "user",
                                "cartArticles",
                                "cartArticles.article",
                                "cartArticles.article.category",
                                "cartArticles.article.articlePrices",
                            ]
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CartService.prototype.changeQuantity = function (cartId, articleId, newQuantity) {
        return __awaiter(this, void 0, Promise, function () {
            var record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cartArticle.findOne({
                            cartId: cartId,
                            articleId: articleId
                        })];
                    case 1:
                        record = _a.sent();
                        if (!record) return [3 /*break*/, 5];
                        record.quantity = newQuantity;
                        if (!(record.quantity === 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.cartArticle["delete"](record.cartArticleId)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.cartArticle.save(record)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.getById(cartId)];
                    case 6: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CartService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(cart_entity_1.Cart)),
        __param(1, typeorm_1.InjectRepository(cart_article_entity_1.CartArticle))
    ], CartService);
    return CartService;
}());
exports.CartService = CartService;

//# sourceMappingURL=cart.service.js.map
