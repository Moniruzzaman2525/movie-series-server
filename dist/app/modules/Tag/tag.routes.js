"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const tag_controller_1 = require("./tag.controller");
const router = express_1.default.Router();
router.get('/', (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.USER), tag_controller_1.TagController.getAllTags);
router.post('/', (0, auth_1.auth)(client_1.UserRole.ADMIN), tag_controller_1.TagController.createTag);
router.post('/assign-tags', (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.USER), tag_controller_1.TagController.assignTagsToReview);
exports.TagRoutes = router;
