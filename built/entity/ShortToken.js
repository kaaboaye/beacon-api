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
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
require("reflect-metadata");
var User_1 = require("./User");
var Token_1 = require("../helpers/Token");
var ShortToken = /** @class */ (function (_super) {
    __extends(ShortToken, _super);
    function ShortToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShortToken_1 = ShortToken;
    // Queries
    ShortToken.GetValidToken = function (token) {
        return typeorm_1.getRepository(ShortToken_1)
            .createQueryBuilder('st')
            .select()
            .where('st = :token', { token: token })
            .andWhere('st.expire_at < NOW()')
            .orderBy({
            'st.created_at': "DESC"
        })
            .getOne();
    };
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