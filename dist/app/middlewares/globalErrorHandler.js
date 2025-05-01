"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const stack = err.stack;
<<<<<<< HEAD
=======
    console.log(err);
>>>>>>> 7d7c4759b342087cf4a68961a776024a2d4d5337
    res.status(statusCode).json({
        statusCode,
        message,
        stack,
    });
};
exports.default = globalErrorHandler;
