"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, jsonData) => {
    res.status(jsonData.statuscode).json({
        success: jsonData.success,
        message: jsonData.message,
        data: jsonData.data,
        meta: jsonData.meta,
    });
};
exports.default = sendResponse;
