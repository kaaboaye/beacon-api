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
var Session_1 = require("../entity/Session");
var User_1 = require("../entity/User");
var AuthorisationToken_1 = require("../helpers/AuthorisationToken");
var ShortToken_1 = require("../entity/ShortToken");
var Token_1 = require("../helpers/Token");
var Config_1 = require("../Config");
var nodemailer_1 = require("nodemailer");
var Sessions = [];
var path = '/sessions';
Sessions.push({
    path: path,
    method: 'get',
    handler: function (request, h) { return __awaiter(_this, void 0, void 0, function () {
        var s;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Session_1.Session.find()];
                case 1:
                    s = _a.sent();
                    return [2 /*return*/, s];
            }
        });
    }); }
});
Sessions.push({
    path: path + '/new',
    method: 'post',
    options: {
        auth: false
    },
    handler: function (request, h) { return __awaiter(_this, void 0, void 0, function () {
        var login, user, expire, authToken, shortToken, mailer, e_1, handler;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    // Check if there is any payload
                    if (!request.payload) {
                        throw new Error('NoPayload');
                    }
                    login = request.payload.login;
                    return [4 /*yield*/, User_1.User.GetByLogin(login)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        throw new Error('NoSuchUser');
                    }
                    console.log(user);
                    expire = new Date();
                    expire.setMinutes(expire.getMinutes() + 15);
                    authToken = AuthorisationToken_1.AuthorisationToken.Generate({
                        UserId: user.id,
                        Purpose: Token_1.Purpose.Login,
                        ExpirationDate: expire
                    });
                    shortToken = new ShortToken_1.ShortToken();
                    shortToken.token = ShortToken_1.ShortToken.Generate();
                    shortToken.user = user;
                    shortToken.purpose = Token_1.Purpose.Login;
                    shortToken.created_at = new Date();
                    shortToken.expire_at = expire;
                    return [4 /*yield*/, shortToken.save()];
                case 2:
                    _a.sent();
                    mailer = nodemailer_1.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'beacon.society.mailer@gmail.com',
                            pass: '46cb33aa9629024c6d3045fecda87d9d6752e9d8da686a651fb754e2c11f69d2'
                        }
                    });
                    mailer.sendMail({
                        from: 'beacon.society.mailer@gmail.com',
                        to: user.mail,
                        subject: "Authorisation Tokens for " + user.username,
                        html: "<p><a href=\"" + Config_1.default.apiUrl + "/sessions/auth/" + encodeURIComponent(authToken) + "\">Click</a></p>\n               <p>or provide following token: " + shortToken.token + "</p>"
                    });
                    return [2 /*return*/, {
                            to_jest_mail: true,
                            AuthorisationToken: authToken,
                            ShortToken: shortToken.token
                        }];
                case 3:
                    e_1 = _a.sent();
                    handler = [
                        'NoPayload',
                        'NoSuchUser',
                    ];
                    if (handler.includes(e_1.message)) {
                        return [2 /*return*/, {
                                error: {
                                    message: e_1.message
                                }
                            }];
                    }
                    throw e_1;
                case 4: return [2 /*return*/];
            }
        });
    }); }
});
Sessions.push({
    path: path + '/new',
    method: 'put',
    options: {
        auth: false
    },
    handler: function (request, h) { return __awaiter(_this, void 0, void 0, function () {
        var _a, type, token, uid, _b, e_2, handler;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 7, , 8]);
                    // Check if there is any payload
                    if (!request.payload) {
                        throw new Error('NoPayload');
                    }
                    _a = request.payload, type = _a.type, token = _a.token;
                    uid = void 0;
                    _b = type;
                    switch (_b) {
                        case Token_1.Type.AuthorisationToken: return [3 /*break*/, 1];
                        case Token_1.Type.ShortToken: return [3 /*break*/, 2];
                    }
                    return [3 /*break*/, 4];
                case 1:
                    {
                        uid = AuthorisationToken_1.AuthorisationToken.Verify(token, Token_1.Purpose.Login).UserId;
                        return [3 /*break*/, 5];
                    }
                    _c.label = 2;
                case 2: return [4 /*yield*/, ShortToken_1.ShortToken.Verify(token, Token_1.Purpose.Login)];
                case 3:
                    uid = _c.sent();
                    return [3 /*break*/, 5];
                case 4: throw new Error('BadTokenType');
                case 5: return [4 /*yield*/, Session_1.Session.SetUp(uid)];
                case 6: 
                // Set up the session
                return [2 /*return*/, _c.sent()];
                case 7:
                    e_2 = _c.sent();
                    handler = [
                        'NoPayload',
                        'BadTokenType'
                    ].concat(AuthorisationToken_1.AuthorisationTokenExceptions, ShortToken_1.ShortTokenExceptions);
                    if (handler.includes(e_2.message)) {
                        return [2 /*return*/, {
                                error: {
                                    message: e_2.message
                                }
                            }];
                    }
                    throw e_2;
                case 8: return [2 /*return*/];
            }
        });
    }); }
});
Sessions.push({
    path: path + '/auth/{token}',
    method: 'get',
    options: {
        auth: false
    },
    handler: function (request, h) { return __awaiter(_this, void 0, void 0, function () {
        var token, payload, e_3, handler;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    token = request.params.token;
                    if (!token) {
                        throw new Error('NoToken');
                    }
                    payload = AuthorisationToken_1.AuthorisationToken.Verify(token, Token_1.Purpose.Login);
                    return [4 /*yield*/, Session_1.Session.SetUp(payload.UserId)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_3 = _a.sent();
                    handler = [
                        'NoToken'
                    ].concat(AuthorisationToken_1.AuthorisationTokenExceptions);
                    if (handler.includes(e_3.message)) {
                        return [2 /*return*/, {
                                error: {
                                    message: e_3.message
                                }
                            }];
                    }
                    throw e_3;
                case 3: return [2 /*return*/];
            }
        });
    }); }
});
exports.default = Sessions;
//# sourceMappingURL=Sessions.js.map