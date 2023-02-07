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
var cart_entity_1 = require("src/entities/cart.entity");
var order_entity_1 = require("src/entities/order.entity");
var typeorm_1 = require("@nestjs/typeorm");
var api_response_class_1 = require("src/misc/api.response.class");
var OrderService = /** @class */ (function () {
    function OrderService(cart, order) {
        this.cart = cart;
        this.order = order;
    }
    OrderService.prototype.add = function (cartId) {
        return __awaiter(this, void 0, Promise, function () {
            var order, cart, newOrder, savedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.order.findOne({
                            cartId: cartId
                        })];
                    case 1:
                        order = _a.sent();
                        if (order) {
                            return [2 /*return*/, new api_response_class_1.ApiResponse("error", -7001, "An order for this cart has already been made.")];
                        }
                        return [4 /*yield*/, this.cart.findOne(cartId, {
                                relations: [
                                    "cartArticles",
                                ]
                            })];
                    case 2:
                        cart = _a.sent();
                        if (!cart) {
                            return [2 /*return*/, new api_response_class_1.ApiResponse("error", -7002, "No such cart found.")];
                        }
                        if (cart.cartArticles.length === 0) {
                            return [2 /*return*/, new api_response_class_1.ApiResponse("error", -7003, "This cart is empty.")];
                        }
                        newOrder = new order_entity_1.Order();
                        newOrder.cartId = cartId;
                        return [4 /*yield*/, this.order.save(newOrder)];
                    case 3:
                        savedOrder = _a.sent();
                        cart.createdAt = new Date();
                        return [4 /*yield*/, this.cart.save(cart)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.getById(savedOrder.orderId)];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OrderService.prototype.getById = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.order.findOne(orderId, {
                            relations: [
                                "cart",
                                "cart.user",
                                "cart.cartArticles",
                                "cart.cartArticles.article",
                                "cart.cartArticles.article.category",
                                "cart.cartArticles.article.articlePrices",
                            ]
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OrderService.prototype.getAllByUserId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.order.find({
                            where: {
                                userId: userId
                            },
                            relations: [
                                "cart",
                                "cart.user",
                                "cart.cartArticles",
                                "cart.cartArticles.article",
                                "cart.cartArticles.article.category",
                                "cart.cartArticles.article.articlePrices",
                            ]
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OrderService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.order.find({
                            relations: [
                                "cart",
                                "cart.user",
                                "cart.cartArticles",
                                "cart.cartArticles.article",
                                "cart.cartArticles.article.category",
                                "cart.cartArticles.article.articlePrices",
                            ]
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OrderService.prototype.changeStatus = function (orderId, newStatus) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getById(orderId)];
                    case 1:
                        order = _a.sent();
                        if (!order) {
                            return [2 /*return*/, new api_response_class_1.ApiResponse("error", -9001, "No such order found!")];
                        }
                        order.status = newStatus;
                        return [4 /*yield*/, this.order.save(order)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getById(orderId)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OrderService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(cart_entity_1.Cart)),
        __param(1, typeorm_1.InjectRepository(order_entity_1.Order))
    ], OrderService);
    return OrderService;
}());
exports.OrderService = OrderService;

//# sourceMappingURL=order.service.js.map
