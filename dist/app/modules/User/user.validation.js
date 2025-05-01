"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationSchema = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    name: zod_1.z.string({
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
};
