"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var secret = 'BraciaBolecZabiliJFK';
exports.AuthorisationTokenExceptions = [
    'AuthorisationTokenIncorrectFormat',
    'AuthorisationTokenInvalid',
    'AuthorisationTokenExpired',
    'AuthorisationTokenWrongPurpose'
];
var AuthorisationToken = /** @class */ (function () {
    function AuthorisationToken() {
    }
    AuthorisationToken.Generate = function (payload) {
        var data = Buffer.from(JSON.stringify(payload)).toString('base64');
        var signature = this.getSignature(data);
        return data + "." + signature;
    };
    AuthorisationToken.Verify = function (token, purpose) {
        var _a = token.split('.'), data = _a[0], signature = _a[1], more = _a[2];
        if (!data || !signature || more) {
            throw new Error('AuthorisationTokenIncorrectFormat');
        }
        // Check the signature
        if (this.getSignature(data) !== signature) {
            throw new Error('AuthorisationTokenInvalid');
        }
        // Get payload
        var payload = JSON.parse(Buffer.from(data, 'base64').toString());
        // Check if expired
        if (new Date().getTime() > new Date(payload.ExpirationDate).getTime()) {
            throw new Error('AuthorisationTokenExpired');
        }
        // Check purpose
        if (purpose !== payload.Purpose) {
            throw new Error('AuthorisationTokenWrongPurpose');
        }
        return payload;
    };
    AuthorisationToken.GetPayload = function (token) {
        var data = token.split('.')[0];
        data = Buffer.from(data, 'base64').toString();
        return JSON.parse(data);
    };
    AuthorisationToken.getSignature = function (data) {
        return crypto_1.createHmac('sha512', secret)
            .update(data)
            .digest('base64');
    };
    return AuthorisationToken;
}());
exports.AuthorisationToken = AuthorisationToken;
//# sourceMappingURL=AuthorisationToken.js.map