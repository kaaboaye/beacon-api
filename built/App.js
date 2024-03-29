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
Object.defineProperty(exports, "__esModule", { value: true });
var Hapi = require("hapi");
var Config_1 = require("./Config");
var controllers_1 = require("./controllers");
var Session_1 = require("./entity/Session");
function Init() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        var port, server_1, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    port = Config_1.default.port;
                    server_1 = new Hapi.Server({
                        port: port,
                        debug: { request: ['error'] }
                    });
                    if (Config_1.default.routePrefix) {
                        server_1.realm.modifiers.route.prefix = Config_1.default.routePrefix;
                    }
                    server_1.events.on('route', function (route) {
                        console.log("New route added: " + route.method.toUpperCase() + " " + route.path);
                    });
                    server_1.events.on('response', function (r) {
                        console.log(r.method.toUpperCase() + " " + r.url.path + " -> " + r.response.statusCode);
                    });
                    return [4 /*yield*/, server_1.register(require('hapi-auth-bearer-token/lib'))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, server_1.auth.strategy('simple', 'bearer-access-token', {
                            validate: function (request, token, h) { return __awaiter(_this, void 0, void 0, function () {
                                var session;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, Session_1.Session.findOne({
                                                where: {
                                                    token: token
                                                },
                                                order: {
                                                    created_at: 'DESC'
                                                },
                                                relations: ['user']
                                            })];
                                        case 1:
                                            session = _a.sent();
                                            if (!session || new Date().getTime() > session.expire_at.getTime()) {
                                                return [2 /*return*/, { isValid: false, credentials: {} }];
                                            }
                                            return [2 /*return*/, { isValid: true, credentials: session }];
                                    }
                                });
                            }); }
                        })];
                case 2:
                    _a.sent();
                    server_1.auth.default('simple');
                    controllers_1.default.forEach(function (controller) {
                        server_1.route(controller);
                    });
                    return [2 /*return*/, server_1];
                case 3:
                    err_1 = _a.sent();
                    console.log('Error starting server: ', err_1);
                    throw err_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.Init = Init;
//# sourceMappingURL=App.js.map