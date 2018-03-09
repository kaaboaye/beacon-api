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
var SessionToken_1 = require("../helpers/SessionToken");
var Sessions = [];
var path = '/sessions';
Sessions.push({
    path: path,
    method: 'get',
    handler: function (request, h) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Session_1.Session.find()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); }
});
Sessions.push({
    path: path + '/new',
    method: 'post',
    handler: function (request, h) { return __awaiter(_this, void 0, void 0, function () {
        var login, user, expire, authToken, shortToken, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    // Check if there is any payload
                    if (!request.payload) {
                        return [2 /*return*/, {
                                error: {
                                    name: 'NoPayload'
                                }
                            }];
                    }
                    login = request.payload.login;
                    return [4 /*yield*/, User_1.User.GetIdByLogin(login)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, {
                                error: {
                                    name: 'NoSuchUser'
                                }
                            }];
                    }
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
                    // Send tokens via email. But later
                    return [2 /*return*/, {
                            to_jest_mail: false,
                            AuthorisationToken: authToken,
                            ShortToken: shortToken.token
                        }];
                case 3:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [2 /*return*/, { error: e_1.name }];
                case 4: return [2 /*return*/];
            }
        });
    }); }
});
Sessions.push({
    path: path + '/validate',
    method: 'post',
    handler: function (request, h) { return __awaiter(_this, void 0, void 0, function () {
        var _a, type, token, uid, _b, payload, st, session, e_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 6, , 7]);
                    // Check if there is any payload
                    if (!request.payload) {
                        return [2 /*return*/, {
                                error: {
                                    name: 'NoPayload'
                                }
                            }];
                    }
                    _a = request.payload, type = _a.type, token = _a.token;
                    uid = -1;
                    _b = type;
                    switch (_b) {
                        case Token_1.Type.AuthorisationToken: return [3 /*break*/, 1];
                        case Token_1.Type.ShortToken: return [3 /*break*/, 2];
                    }
                    return [3 /*break*/, 4];
                case 1:
                    {
                        // Check if valid
                        if (!AuthorisationToken_1.AuthorisationToken.Verify(token)) {
                            return [2 /*return*/, {
                                    error: {
                                        name: 'InvalidAuthorisationToken'
                                    }
                                }];
                        }
                        payload = AuthorisationToken_1.AuthorisationToken.GetPayload(token);
                        // Check if expired
                        if (new Date().getTime() > new Date(payload.ExpirationDate).getTime()) {
                            return [2 /*return*/, {
                                    error: {
                                        name: 'ExpiredAuthorisationToken'
                                    }
                                }];
                        }
                        // Check purpose
                        if (Token_1.Purpose.Login !== payload.Purpose) {
                            return [2 /*return*/, {
                                    error: {
                                        name: 'WrongPurposeAuthorisationToken'
                                    }
                                }];
                        }
                        // Set User id
                        uid = payload.UserId;
                        return [3 /*break*/, 4];
                    }
                    _c.label = 2;
                case 2: return [4 /*yield*/, ShortToken_1.ShortToken.GetValidToken(token)];
                case 3:
                    st = _c.sent();
                    // Check if such token exist and didn't expired
                    if (!st) {
                        return [2 /*return*/, {
                                error: {
                                    name: 'InvalidShortToken'
                                }
                            }];
                    }
                    // Check purpose
                    if (Token_1.Purpose.Login !== st.purpose) {
                        return [2 /*return*/, {
                                error: {
                                    name: 'WrongPurposeShortToken'
                                }
                            }];
                    }
                    // Set User id
                    uid = st.userId;
                    return [3 /*break*/, 4];
                case 4:
                    if (-1 === uid) {
                        return [2 /*return*/, {
                                error: {
                                    name: 'NoToken'
                                }
                            }];
                    }
                    session = new Session_1.Session();
                    session.user = uid;
                    session.token = SessionToken_1.SessionToken.Generate();
                    session.expire_at = new Date();
                    session.created_at = new Date();
                    return [4 /*yield*/, session.save()];
                case 5:
                    _c.sent();
                    return [2 /*return*/, session];
                case 6:
                    e_2 = _c.sent();
                    switch (e_2.message) {
                        case 'AuthorisationTokenIncorrectFormat':
                            return [2 /*return*/, {
                                    error: {
                                        message: e_2.message
                                    }
                                }];
                    }
                    throw e_2;
                case 7: return [2 /*return*/];
            }
        });
    }); }
});
exports.default = Sessions;
//# sourceMappingURL=Sessions.js.map