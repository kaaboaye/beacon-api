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
require("reflect-metadata");
var User_1 = require("./User");
var Beacon_1 = require("./Beacon");
var Location_1 = require("../helpers/Location");
var BeaconLocation = /** @class */ (function (_super) {
    __extends(BeaconLocation, _super);
    function BeaconLocation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], BeaconLocation.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Beacon_1.Beacon; }, function (beacon) { return beacon.id; }, {
            nullable: false
        }),
        __metadata("design:type", Beacon_1.Beacon)
    ], BeaconLocation.prototype, "beacon", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.User; }, function (reporter) { return reporter.id; }, {
            nullable: false
        }),
        __metadata("design:type", User_1.User)
    ], BeaconLocation.prototype, "reporter", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'point'
        }),
        __metadata("design:type", Location_1.Location)
    ], BeaconLocation.prototype, "location", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'timestamp'
        }),
        __metadata("design:type", Date)
    ], BeaconLocation.prototype, "created_at", void 0);
    BeaconLocation = __decorate([
        typeorm_1.Entity()
    ], BeaconLocation);
    return BeaconLocation;
}(typeorm_1.BaseEntity));
exports.BeaconLocation = BeaconLocation;
//# sourceMappingURL=BeaconLocation.js.map