"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get('/get-most-review-title', (0, auth_1.auth)(client_1.UserRole.ADMIN), admin_controller_1.AdminController.getMostReviewedTitle);
router.get('/get-aggregated-ratting/:id', (0, auth_1.auth)(client_1.UserRole.ADMIN), admin_controller_1.AdminController.getAverageRating);
router.patch('/review/:id', (0, auth_1.auth)(client_1.UserRole.ADMIN), admin_controller_1.AdminController.approveOrUnpublishReview);
router.patch('/comment/:id', (0, auth_1.auth)(client_1.UserRole.ADMIN), admin_controller_1.AdminController.approveOrUnpublishComment);
router.delete('/remove-inappropriate-review/:id', (0, auth_1.auth)(client_1.UserRole.ADMIN), admin_controller_1.AdminController.removeInappropriateReview);
router.delete('/remove-inappropriate-comment/:id', (0, auth_1.auth)(client_1.UserRole.ADMIN), admin_controller_1.AdminController.removeInappropriateComment);
exports.AdminRoute = router;
