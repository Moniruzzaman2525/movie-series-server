"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorsPickRoutes = void 0;
const express_1 = __importDefault(require("express"));
const editorsPick_controller_1 = require("./editorsPick.controller");
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const alowAuth_1 = __importDefault(require("../../middlewares/alowAuth"));
const router = express_1.default.Router();
router.get('/', (0, alowAuth_1.default)(client_1.UserRole.USER, client_1.UserRole.ADMIN), editorsPick_controller_1.EditorsPickController.getAllEditorPicks);
router.post('/', (0, auth_1.auth)(client_1.UserRole.ADMIN), editorsPick_controller_1.EditorsPickController.createEditorPick);
router.delete('/:id', (0, auth_1.auth)(client_1.UserRole.ADMIN), editorsPick_controller_1.EditorsPickController.removeEditorByPicks);
exports.EditorsPickRoutes = router;
