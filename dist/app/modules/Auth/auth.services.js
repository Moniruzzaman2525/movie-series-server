"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../helpers/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const sendEmail_1 = require("../../../utils/sendEmail");
<<<<<<< HEAD
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findFirstOrThrow({
        where: {
            email: payload.email
        }
=======
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
// import ApiError from '../../errors/ApiError';
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findFirstOrThrow({
        where: {
            email: payload.email,
        },
>>>>>>> 7d7c4759b342087cf4a68961a776024a2d4d5337
    });
    const isCorrectPassword = yield bcrypt_1.default.compare(payload.password, userData.password);
    if (!isCorrectPassword) {
        throw new Error('Invalid password');
    }
    const accessToken = jwtHelpers_1.jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role,
<<<<<<< HEAD
        id: userData.id
=======
        id: userData.id,
>>>>>>> 7d7c4759b342087cf4a68961a776024a2d4d5337
    }, config_1.default.jwt.jwt_secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role,
<<<<<<< HEAD
        id: userData.id
    }, config_1.default.jwt.refresh_token_secret, config_1.default.jwt.refresh_token_expires_in);
    return {
        accessToken,
        refreshToken
=======
        id: userData.id,
    }, config_1.default.jwt.refresh_token_secret, config_1.default.jwt.refresh_token_expires_in);
    return {
        accessToken,
        refreshToken,
>>>>>>> 7d7c4759b342087cf4a68961a776024a2d4d5337
    };
});
const forgetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findFirstOrThrow({
        where: {
<<<<<<< HEAD
            email: payload.email
        }
=======
            email: payload.email,
        },
>>>>>>> 7d7c4759b342087cf4a68961a776024a2d4d5337
    });
    const resetPassToken = jwtHelpers_1.jwtHelpers.generateToken({ email: userData.email, role: userData.role }, config_1.default.jwt.reset_password_secret, config_1.default.jwt.refresh_token_expires_in);
    const resetPasswordLink = config_1.default.jwt.reset_password_link + `?id=${userData.id}&token=${resetPassToken}`;
    const replacements = {
        userName: userData.name,
        resetLink: resetPasswordLink,
    };
    const res = yield (0, sendEmail_1.sendEmail)(userData.email, 'Reset your password within ten minutes!', 'resetPasswordEmail', replacements);
    return res;
});
const resetPassword = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findFirstOrThrow({
        where: {
            id: payload.id,
<<<<<<< HEAD
            isDeleted: false
        }
    });
    const isValidToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.reset_password_secret);
    if (!isValidToken) {
        throw new ApiError_1.default(403, 'You are not authorization');
=======
            isDeleted: false,
        },
    });
    const isValidToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.reset_password_secret);
    if (!isValidToken) {
        throw new apiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorization');
>>>>>>> 7d7c4759b342087cf4a68961a776024a2d4d5337
    }
    const hashPassword = yield bcrypt_1.default.hash(payload.password, 12);
    yield prisma_1.default.user.update({
        where: {
<<<<<<< HEAD
            id: payload.id
        },
        data: {
            password: hashPassword
        }
    });
    return {
        message: 'Password reset successfully'
=======
            id: payload.id,
        },
        data: {
            password: hashPassword,
        },
    });
    return {
        message: 'Password reset successfully',
>>>>>>> 7d7c4759b342087cf4a68961a776024a2d4d5337
    };
});
exports.AuthServices = {
    loginUser,
    forgetPassword,
<<<<<<< HEAD
    resetPassword
=======
    resetPassword,
>>>>>>> 7d7c4759b342087cf4a68961a776024a2d4d5337
};
