"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const config_1 = __importDefault(require("../config"));
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloud.cloud_name,
    api_key: config_1.default.cloud.api_key,
    api_secret: config_1.default.cloud.api_secret,
});
const removeExtension = (filename) => {
    return filename.split('.').slice(0, -1).join('.');
};
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: {
        public_id: (_req, file) => Math.random().toString(36).substring(2) +
            '-' +
            Date.now() +
            '-' +
            file.fieldname +
            '-' +
            removeExtension(file.originalname),
    },
});
exports.multerUpload = (0, multer_1.default)({ storage });
