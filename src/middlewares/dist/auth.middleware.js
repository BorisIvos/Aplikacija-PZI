"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var jwt = require("jsonwebtoken");
var jwt_secret_1 = require("config/jwt.secret");
var decorators_1 = require("@nestjs/common/decorators");
var AuthMidleware = /** @class */ (function () {
    function AuthMidleware(administratorService, userService) {
        this.administratorService = administratorService;
        this.userService = userService;
    }
    AuthMidleware.prototype.use = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var token, tokenParts, tokenString, jwtData, ip, administrator, user, trenutniTimestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.headers.authorization) {
                            throw new common_1.HttpException('Token not found', common_1.HttpStatus.UNAUTHORIZED);
                        }
                        token = req.headers.authorization;
                        tokenParts = token.split(' ');
                        if (tokenParts.length !== 2) {
                            throw new common_1.HttpException('Bad token found1', common_1.HttpStatus.UNAUTHORIZED);
                        }
                        tokenString = tokenParts[1];
                        try {
                            jwtData = jwt.verify(tokenString, jwt_secret_1.jwtSecret);
                        }
                        catch (e) {
                            throw new common_1.HttpException('Bad token found2', common_1.HttpStatus.UNAUTHORIZED);
                        }
                        if (!jwtData) {
                            throw new common_1.HttpException('Bad token found2', common_1.HttpStatus.UNAUTHORIZED);
                        }
                        ip = req.ip.toString();
                        if (jwtData.ip !== req.ip.toString()) {
                            throw new common_1.HttpException('Bad token found3', common_1.HttpStatus.UNAUTHORIZED);
                        }
                        if (!(jwtData.role === "administrator")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.administratorService.getById(jwtData.id)];
                    case 1:
                        administrator = _a.sent();
                        if (!administrator) {
                            throw new common_1.HttpException('Account not found', common_1.HttpStatus.UNAUTHORIZED);
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(jwtData.role === "user")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.userService.getById(jwtData.id)];
                    case 3:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.HttpException('Account not found', common_1.HttpStatus.UNAUTHORIZED);
                        }
                        _a.label = 4;
                    case 4:
                        trenutniTimestamp = new Date().getTime() / 1000;
                        if (trenutniTimestamp >= jwtData.exp) {
                            throw new common_1.HttpException('the token has expired', common_1.HttpStatus.UNAUTHORIZED);
                        }
                        next();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthMidleware = __decorate([
        decorators_1.Injectable()
    ], AuthMidleware);
    return AuthMidleware;
}());
exports.AuthMidleware = AuthMidleware;

//# sourceMappingURL=auth.middleware.js.map
