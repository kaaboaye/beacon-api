"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
require("reflect-metadata");
var User_1 = require("./User");
var Token_1 = require("../helpers/Token");
exports.ShortTokenExceptions = [
    'ShortTokenInvalid',
    'ShortTokenExpired',
    'ShortTokenWrongPurpose'
];
var ShortToken = /** @class */ (function (_super) {
    __extends(ShortToken, _super);
    function ShortToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShortToken_1 = ShortToken;
    // Static
    ShortToken.Generate = function () {
        // Take random integer
        var num = Math.floor(Math.random() * 99999999);
        // Convert the number to the string
        var token = num.toString();
        token = token.padStart(8, '0');
        // Insert '-' in the middle
        token = token.substr(0, 4) + '-' + token.substr(4);
        return token;
    };
    ShortToken.Verify = function (token, purpose) {
        return __awaiter(this, void 0, void 0, function () {
            var st;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ShortToken_1.findOne({
                            where: {
                                token: token
                            },
                            order: {
                                created_at: 'DESC'
                            },
                            relations: ['user']
                        })];
                    case 1:
                        st = _a.sent();
                        if (!st) {
                            throw new Error('ShortTokenInvalid');
                        }
                        if (new Date().getTime() > st.expire_at.getTime()) {
                            throw new Error('ShortTokenExpired');
                        }
                        if (st.purpose !== purpose) {
                            throw new Error('ShortTokenWrongPurpose');
                        }
                        return [2 /*return*/, st.user.id];
                }
            });
        });
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], ShortToken.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], ShortToken.prototype, "token", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.User; }, function (user) { return user.id; }),
        typeorm_1.JoinColumn({ name: "userId" }),
        __metadata("design:type", User_1.User)
    ], ShortToken.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsEnum(Token_1.Purpose),
        __metadata("design:type", Number)
    ], ShortToken.prototype, "purpose", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'timestamp'
        }),
        __metadata("design:type", Date)
    ], ShortToken.prototype, "expire_at", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'timestamp'
        }),
        __metadata("design:type", Date)
    ], ShortToken.prototype, "created_at", void 0);
    ShortToken = ShortToken_1 = __decorate([
        typeorm_1.Entity()
    ], ShortToken);
    return ShortToken;
    var ShortToken_1;
}(typeorm_1.BaseEntity));
exports.ShortToken = ShortToken;
//# sourceMappingURL=ShortToken.js.map