"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var SessionToken = /** @class */ (function () {
    function SessionToken() {
    }
    SessionToken.Generate = function () {
        return crypto_1.randomBytes(64).toString('base64');
    };
    return SessionToken;
}());
exports.SessionToken = SessionToken;
//# sourceMappingURL=SessionToken.js.map