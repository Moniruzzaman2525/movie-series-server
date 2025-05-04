"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleNotFoundError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const handleNotFoundError = (err) => {
    var _a;
    let modelName;
    const existingModel = ((_a = err.meta) === null || _a === void 0 ? void 0 : _a.modelName) || 'Unknown Model';
    if (existingModel === 'ServiceRecord') {
        modelName = 'Service record';
    }
    else {
        modelName = existingModel;
    }
    const errorMessage = `${modelName} not found`;
    const statusCode = http_status_1.default.NOT_FOUND;
    return { statusCode, message: errorMessage };
};
exports.handleNotFoundError = handleNotFoundError;
exports.default = exports.handleNotFoundError;
