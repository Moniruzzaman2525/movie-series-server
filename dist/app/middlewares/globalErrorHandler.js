"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const stack = err.stack;
    console.log(err);
    res.status(statusCode).json({
        statusCode,
        message,
        stack,
    });
};
exports.default = globalErrorHandler;
