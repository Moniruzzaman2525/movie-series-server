"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, jsonData) => {
    res.status(jsonData.statuscode).json({
        success: jsonData.success,
        message: jsonData.message,
        data: jsonData.data,
<<<<<<< HEAD
        meta: jsonData.meta
=======
        meta: jsonData.meta,
>>>>>>> 7d7c4759b342087cf4a68961a776024a2d4d5337
    });
};
exports.default = sendResponse;
