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
var Session_1 = require("./Session");
var Beacon_1 = require("./Beacon");
var Rank;
(function (Rank) {
    Rank[Rank["User"] = 0] = "User";
})(Rank = exports.Rank || (exports.Rank = {}));
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User_1 = User;
    // Queries
    User.GetIdByLogin = function (login) {
        return typeorm_1.getRepository(User_1)
            .createQueryBuilder('user')
            .select(['user.id'])
            .where('user.username = :login', { login: login })
            .orWhere('user.mail = :login', { login: login })
            .getOne();
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({
            unique: true
        }),
        class_validator_1.Length(3),
        class_validator_1.IsAlphanumeric(),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        typeorm_1.Column({
            unique: true
        }),
        class_validator_1.IsEmail(),
        __metadata("design:type", String)
    ], User.prototype, "mail", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.Length(3),
        class_validator_1.IsAlpha(),
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.Length(3),
        class_validator_1.IsAlpha(),
        __metadata("design:type", String)
    ], User.prototype, "last_name", void 0);
    __decorate([
        typeorm_1.Column({
            length: 20
        }),
        class_validator_1.IsMobilePhone('en-US'),
        __metadata("design:type", String)
    ], User.prototype, "phone_number", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsEnum(Rank),
        __metadata("design:type", Number)
    ], User.prototype, "rank", void 0);
    __decorate([
        typeorm_1.Column({
            default: 'true'
        }),
        __metadata("design:type", Boolean)
    ], User.prototype, "active", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'timestamp',
            default: 'NOW()'
        }),
        __metadata("design:type", Date)
    ], User.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Session_1.Session; }, function (sessions) { return sessions.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "sessions", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Beacon_1.Beacon; }, function (beacon) { return beacon.owner; }),
        __metadata("design:type", Array)
    ], User.prototype, "beacons", void 0);
    User = User_1 = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
    var User_1;
}(typeorm_1.BaseEntity));
exports.User = User;
//# sourceMappingURL=User.js.map