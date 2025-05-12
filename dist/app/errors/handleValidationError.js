"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handleValidationError = (err) => {
    const message = err.errors.length > 0 ? err.errors[0].message : 'Validation error';
    const statusCode = http_status_1.default.BAD_REQUEST;
    return { statusCode, message };
};
exports.default = handleValidationError;
