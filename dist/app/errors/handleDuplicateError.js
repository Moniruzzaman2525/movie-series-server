"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handleDuplicateError = (err) => {
    var _a, _b;
    const extractedField = (_b = (_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b[0];
    const errorMessage = extractedField
        ? `${extractedField} already exists`
        : 'Duplicate value exists in the database';
    const capitalizedMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
    const statusCode = http_status_1.default.BAD_REQUEST;
    return { statusCode, message: capitalizedMessage };
};
exports.default = handleDuplicateError;
