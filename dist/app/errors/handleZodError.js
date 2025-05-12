"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handleZodError = (err) => {
    const messages = err.errors.map(e => e.message);
    const message = messages.length > 1
        ? `${messages.slice(0, -1).join(', ')} and ${messages[messages.length - 1]}`
        : messages[0] || 'Zod validation error';
    const statusCode = http_status_1.default.BAD_REQUEST;
    return { statusCode, message };
};
exports.default = handleZodError;
