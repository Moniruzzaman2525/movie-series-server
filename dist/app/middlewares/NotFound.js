"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const notFound = (req, res, next) => {
    res.status(404).json({
        message: 'API Not Found',
<<<<<<< HEAD
        data: null
=======
        data: null,
>>>>>>> 7d7c4759b342087cf4a68961a776024a2d4d5337
    });
    next();
};
exports.notFound = notFound;
