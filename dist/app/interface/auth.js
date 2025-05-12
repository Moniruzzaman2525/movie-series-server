"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../config"));
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const auth = (...roles) => {
    try {
        return (req, res, next) => {
            const token = req.headers.authorization;
            if (!token) {
                throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You are unauthorized');
            }
            const decoded = jwtHelpers_1.jwtHelpers.decodeToken(token, config_1.default.jwt.jwt_secret);
            req.user = decoded;
            if (roles.length > 0 && !roles.includes(decoded.role)) {
                throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You are unauthorized');
            }
            next();
        };
    }
    catch (err) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You are unauthorized');
    }
};
exports.auth = auth;
