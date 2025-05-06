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
const alowAuth_1 = __importDefault(require("../../middlewares/alowAuth"));
const router = express_1.default.Router();
router.get('/category', content_controller_1.contentController.contentByCategory);
router.get('/', (0, alowAuth_1.default)(client_1.UserRole.USER, client_1.UserRole.ADMIN), content_controller_1.contentController.getAllContent);
router.get('/:id', content_controller_1.contentController.getSingleContent);
router.post('/', utils_1.upload.single('file'), (0, auth_1.auth)(client_1.UserRole.ADMIN), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return content_controller_1.contentController.createContent(req, res, next);
});
router.patch('/:id', (0, auth_1.auth)(client_1.UserRole.ADMIN), utils_1.upload.single('file'), (req, res, next) => {
    if (req.body.data) {
        req.body = JSON.parse(req.body.data);
    }
    return content_controller_1.contentController.updateContent(req, res, next);
});
router.delete('/:id', (0, auth_1.auth)(client_1.UserRole.ADMIN), content_controller_1.contentController.deleteContent);
exports.ContentRouter = router;
