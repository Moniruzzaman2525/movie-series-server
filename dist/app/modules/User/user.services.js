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
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma_1.default.user.findFirst({
        where: {
<<<<<<< HEAD
            email: payload.email
        }
    });
    if (existingUser) {
        throw new Error("User with this email already exists");
=======
            email: payload.email,
        },
    });
    if (existingUser) {
        throw new Error('User with this email already exists');
>>>>>>> 7d7c4759b342087cf4a68961a776024a2d4d5337
    }
    const hashPassword = yield bcrypt_1.default.hash(payload.password, 12);
    const result = yield prisma_1.default.user.create({
        data: Object.assign(Object.assign({}, payload), { password: hashPassword }),
        select: {
            id: true,
            name: true,
            email: true,
            createAt: true,
<<<<<<< HEAD
            updateAt: true
        }
=======
            updateAt: true,
        },
>>>>>>> 7d7c4759b342087cf4a68961a776024a2d4d5337
    });
    return result;
});
exports.UserServices = {
    createUser,
};
