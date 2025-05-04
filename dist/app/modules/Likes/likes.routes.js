"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const likes_controller_1 = require("./likes.controller");
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/video/like', (0, auth_1.auth)(client_1.UserRole.USER, client_1.UserRole.ADMIN), likes_controller_1.LikeController.likeVideo);
router.post('/video/un-like', (0, auth_1.auth)(client_1.UserRole.USER, client_1.UserRole.ADMIN), likes_controller_1.LikeController.unlikeVideo);
router.post('/review/like', (0, auth_1.auth)(client_1.UserRole.USER, client_1.UserRole.ADMIN), likes_controller_1.LikeController.likeReview);
router.post('/review/un-like', (0, auth_1.auth)(client_1.UserRole.USER, client_1.UserRole.ADMIN), likes_controller_1.LikeController.unlikeReview);
exports.LikesRoutes = router;
