"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorsPickController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const editorsPick_server_1 = require("./editorsPick.server");
const createEditorPick = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield editorsPick_server_1.EditorsPickServer.createEditorPick(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Content add editor picks successfully',
        data: result,
        statuscode: http_status_1.default.CREATED,
    });
}));
const removeEditorByPicks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const videoId = req.params.id;
    const result = yield editorsPick_server_1.EditorsPickServer.removeEditorByPicks(videoId);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Content remove editor picks successfully',
        data: result,
        statuscode: http_status_1.default.CREATED,
    });
}));
const getAllEditorPicks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const userId = user ? user.id : null;
    const result = yield editorsPick_server_1.EditorsPickServer.getAllEditorPicks(userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Content get editor picks successfully',
        data: result,
        statuscode: http_status_1.default.CREATED,
    });
}));
exports.EditorsPickController = {
    createEditorPick,
    getAllEditorPicks,
    removeEditorByPicks
};
