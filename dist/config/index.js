"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd() + '.env') });
exports.default = {
    port: process.env.PORT,
    base_url: process.env.BASE_URL,
    jwt: {
        jwt_secret: process.env.JWT_SECRET,
        expires_in: process.env.EXPIRES_IN,
        refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
        refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
        reset_password_secret: process.env.RESET_PASSWORD_TOKEN,
        reset_password_token_expire_in: process.env.RESET_TOKEN_EXPIRES_IN,
        reset_password_link: process.env.RESET_PASSWORD_LINK,
    },
    cloud: {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
    },
    emailSender: {
        email: process.env.EMAIL,
        app_pass: process.env.APP_PASS,
    },
    payment: {
        store_id: process.env.SSLCOMMERZ_STORE_ID,
        store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD,
    }
};
