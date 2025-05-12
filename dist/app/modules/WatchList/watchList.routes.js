"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchListRoutes = void 0;
const express_1 = __importDefault(require("express"));
const watchList_controller_1 = require("./watchList.controller");
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get('/', (0, auth_1.auth)(client_1.UserRole.USER, client_1.UserRole.ADMIN), watchList_controller_1.WatchController.getWatchList);
router.post('/', (0, auth_1.auth)(client_1.UserRole.USER, client_1.UserRole.ADMIN), watchList_controller_1.WatchController.addToWatchList);
router.delete('/:id', (0, auth_1.auth)(client_1.UserRole.USER, client_1.UserRole.ADMIN), watchList_controller_1.WatchController.removeWatchList);
exports.WatchListRoutes = router;
