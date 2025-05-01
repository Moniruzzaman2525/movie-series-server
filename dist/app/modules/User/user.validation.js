"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationSchema = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    name: zod_1.z.string({
<<<<<<< HEAD
        required_error: "Name is required"
    }),
    email: zod_1.z.string({
        required_error: "Email is required"
    }),
    password: zod_1.z.string({
        required_error: "Password is required"
    }),
});
exports.UserValidationSchema = {
    create
=======
        required_error: 'Name is required',
    }),
    email: zod_1.z.string({
        required_error: 'Email is required',
    }),
    password: zod_1.z.string({
        required_error: 'Password is required',
    }),
});
exports.UserValidationSchema = {
    create,
>>>>>>> 7d7c4759b342087cf4a68961a776024a2d4d5337
};
