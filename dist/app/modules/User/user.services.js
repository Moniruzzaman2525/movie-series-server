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
exports.UserServices = void 0;
const prisma_1 = __importDefault(require("../../../helpers/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma_1.default.user.findFirst({
        where: {
            email: payload.email,
        },
    });
    if (existingUser) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'User with this email already exists');
    }
    const hashPassword = yield bcrypt_1.default.hash(payload.password, 12);
    const result = yield prisma_1.default.user.create({
        data: Object.assign(Object.assign({}, payload), { password: hashPassword }),
        select: {
            id: true,
            name: true,
            email: true,
            createAt: true,
            updateAt: true,
        },
    });
    return result;
});
const getMe = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id: user.id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createAt: true,
            updateAt: true,
        },
    });
    return result;
});
const updateProfile = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = yield prisma_1.default.user.update({
        where: {
            id: user.id,
        },
        data: {
            name: payload.name,
            email: user.email,
        },
    });
    return result;
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const currentUser = yield prisma_1.default.user.findUnique({
        where: {
            id: user.id,
        },
    });
    if (!currentUser) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const isCorrectPassword = yield bcrypt_1.default.compare(payload.oldPassword, currentUser.password);
    if (!isCorrectPassword) {
        throw new Error('Invalid password');
    }
    const hashPassword = yield bcrypt_1.default.hash(payload.password, 12);
    const result = yield prisma_1.default.user.update({
        where: {
            id: user.id,
        },
        data: {
            password: hashPassword
        },
    });
    return result;
});
exports.UserServices = {
    createUser,
    getMe,
    updateProfile,
    changePassword
};
