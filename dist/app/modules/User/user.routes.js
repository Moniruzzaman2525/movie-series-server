"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get('/me', (0, auth_1.auth)(client_1.UserRole.USER, client_1.UserRole.ADMIN), user_controller_1.UserController.getMe);
router.post('/', (0, validateRequest_1.default)(user_validation_1.UserValidationSchema.create), user_controller_1.UserController.createUser);
router.patch('/update-profile', (0, auth_1.auth)(client_1.UserRole.USER, client_1.UserRole.ADMIN), user_controller_1.UserController.updateProfile);
router.patch('/update-password', (0, auth_1.auth)(client_1.UserRole.USER, client_1.UserRole.ADMIN), user_controller_1.UserController.changePassword);
exports.UserRoutes = router;
