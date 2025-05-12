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
        algorithm: 'HS256',
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
    verifyToken,
};
