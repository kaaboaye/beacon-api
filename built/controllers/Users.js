"use strict";
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../entity/User");
var class_validator_1 = require("class-validator");
var Users = [];
var path = '/users';
Users.push({
    path: path,
    method: 'get',
    handler: function (request, h) { return __awaiter(_this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User_1.User.find()];
                case 1:
                    users = _a.sent();
                    return [2 /*return*/, { users: users }];
            }
        });
    }); }
});
Users.push({
    path: path,
    method: 'post',
    options: {
        auth: false
    },
    handler: function (request, h) { return __awaiter(_this, void 0, void 0, function () {
        var _a, username, mail, name, last_name, phone_number, u, err, err_1, name, message, detail;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    if (!request.payload) {
                        return [2 /*return*/, {
                                error: {
                                    name: 'NoPayload'
                                }
                            }];
                    }
                    _a = request.payload, username = _a.username, mail = _a.mail, name = _a.name, last_name = _a.last_name, phone_number = _a.phone_number;
                    u = new User_1.User();
                    u.username = username;
                    u.mail = mail;
                    u.name = name;
                    u.last_name = last_name;
                    u.phone_number = phone_number;
                    u.rank = User_1.Rank.User;
                    return [4 /*yield*/, class_validator_1.validate(u)];
                case 1:
                    err = _b.sent();
                    if (err.length > 0) {
                        return [2 /*return*/, { err: err }];
                    }
                    return [4 /*yield*/, u.save()];
                case 2:
                    _b.sent();
                    return [2 /*return*/, { id: u.id }];
                case 3:
                    err_1 = _b.sent();
                    switch (err_1.name) {
                        case 'QueryFailedError': {
                            name = err_1.name, message = err_1.message, detail = err_1.detail;
                            return [2 /*return*/, {
                                    error: { name: name, message: message, detail: detail }
                                }];
                        }
                    }
                    throw err_1;
                case 4: return [2 /*return*/];
            }
        });
    }); }
});
exports.default = Users;
//# sourceMappingURL=Users.js.map