"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRouter = void 0;
const express_1 = __importDefault(require("express"));
const content_controller_1 = require("./content.controller");
const utils_1 = require("../../../utils");
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get('/', content_controller_1.contentController.getAllContent);
router.post('/', utils_1.upload.single('file'), (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.USER), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return content_controller_1.contentController.createContent(req, res, next);
});
exports.ContentRouter = router;
