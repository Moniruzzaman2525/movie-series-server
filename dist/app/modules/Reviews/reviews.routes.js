"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const reviews_controller_1 = require("./reviews.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.auth)(client_1.UserRole.USER), reviews_controller_1.ReviewController.addReview);
router.patch('/edit-review/:id', (0, auth_1.auth)(client_1.UserRole.USER), reviews_controller_1.ReviewController.editReview);
router.delete('/delete-review/:id', (0, auth_1.auth)(client_1.UserRole.USER), reviews_controller_1.ReviewController.deleteReview);
exports.ReviewRoutes = router;
