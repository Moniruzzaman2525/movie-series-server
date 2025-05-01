"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsRoutes = void 0;
const express_1 = __importDefault(require("express"));
<<<<<<< HEAD
const router = express_1.default.Router();
=======
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const comments_controller_1 = require("./comments.controller");
const router = express_1.default.Router();
router.get('/', (0, auth_1.auth)(client_1.UserRole.USER, client_1.UserRole.ADMIN), comments_controller_1.CommentController.getAllComment);
router.post('/', (0, auth_1.auth)(client_1.UserRole.USER), comments_controller_1.CommentController.addComments);
router.patch('/edit-comment/:id', (0, auth_1.auth)(client_1.UserRole.USER), comments_controller_1.CommentController.editComment);
router.delete('/delete-comment/:id', (0, auth_1.auth)(client_1.UserRole.USER), comments_controller_1.CommentController.deleteComment);
router.get('/:id', (0, auth_1.auth)(client_1.UserRole.USER), comments_controller_1.CommentController.getSingleComment);
>>>>>>> 7d7c4759b342087cf4a68961a776024a2d4d5337
exports.CommentsRoutes = router;
