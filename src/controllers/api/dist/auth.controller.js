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
var api_response_class_1 = require("src/misc/api.response.class");
var crypto = require("crypto");
var login_info_administrator_dto_1 = require("src/dtos/administrator/login.info.administrator.dto");
var jwt = require("jsonwebtoken");
var jwt_data_administrator_dto_1 = require("src/dtos/administrator/jwt.data.administrator.dto");
var jwt_secret_1 = require("config/jwt.secret");
var AuthController = /** @class */ (function () {
    function AuthController(administratorService) {
        this.administratorService = administratorService;
    }
    AuthController.prototype.doLogin = function (data, req) {
        return __awaiter(this, void 0, Promise, function () {
            var administrator, passwordHash, passwordHashString, jwtData, sada, istekTimestamp, token, responseObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.administratorService.getByUsername(data.username)];
                    case 1:
                        administrator = _a.sent();
                        if (!administrator) {
                            return [2 /*return*/, new Promise(function (resolve) { return resolve(new api_response_class_1.ApiResponse('error', -3001)); })];
                        }
                        passwordHash = crypto.createHash('sha512');
                        passwordHash.update(data.password);
                        passwordHashString = passwordHash.digest('hex').toUpperCase();
                        if (administrator.passwordHash !== passwordHashString) {
                            return [2 /*return*/, new Promise(function (resolve) { return resolve(new api_response_class_1.ApiResponse('error', -3002)); })];
                        }
                        jwtData = new jwt_data_administrator_dto_1.JwtDataAdministatorDto();
                        jwtData.administratorId = administrator.administratorId;
                        jwtData.username = administrator.username;
                        sada = new Date();
                        sada.setDate(sada.getDate() + 14);
                        istekTimestamp = sada.getTime() / 1000;
                        jwtData.exp = istekTimestamp;
                        jwtData.ip = req.ip.toString();
                        jwtData.ua = req.headers["user-agent"];
                        token = jwt.sign(jwtData.toPlainObject(), jwt_secret_1.jwtSecret);
                        responseObject = new login_info_administrator_dto_1.LoginInfoAdministratorDto(administrator.administratorId, administrator.username, token);
                        return [2 /*return*/, new Promise(function (resolve) { return resolve(responseObject); })];
                }
            });
        });
    };
    __decorate([
        common_1.Post('login') //http://localhost:3000/auth/login/
        ,
        __param(0, common_1.Body()), __param(1, common_1.Req())
    ], AuthController.prototype, "doLogin");
    AuthController = __decorate([
        common_1.Controller('auth')
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;

//# sourceMappingURL=auth.controller.js.map
