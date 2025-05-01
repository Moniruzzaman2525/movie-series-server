"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelpers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload, secret, expiresIn) => {
    const token = jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn,
<<<<<<< HEAD
        algorithm: 'HS256'
=======
        algorithm: 'HS256',
>>>>>>> 7d7c4759b342087cf4a68961a776024a2d4d5337
    });
    return token;
};
const decodeToken = (token, secret) => {
    const decoded = jsonwebtoken_1.default.verify(token, secret);
    return decoded;
};
const verifyToken = (token, secret) => jsonwebtoken_1.default.verify(token, secret);
exports.jwtHelpers = {
    generateToken,
    decodeToken,
<<<<<<< HEAD
    verifyToken
=======
    verifyToken,
>>>>>>> 7d7c4759b342087cf4a68961a776024a2d4d5337
};
