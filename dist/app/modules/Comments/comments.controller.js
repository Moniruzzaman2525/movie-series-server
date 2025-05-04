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
exports.CommentController = void 0;
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const comments_services_1 = require("./comments.services");
const addComments = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield comments_services_1.CommentServices.addComment(user, req.body);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.CREATED,
        success: true,
        message: 'Comment add successfully',
        data: result,
    });
}));
const getAllComment = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comments_services_1.CommentServices.getAllComment();
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Comment fetched successfully',
        data: result,
    });
}));
const editComment = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const commentId = req.params.id;
    const result = yield comments_services_1.CommentServices.editComment(user, commentId, req.body);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Comment edit successfully',
        data: result,
    });
}));
const deleteComment = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const commentId = req.params.id;
    const result = yield comments_services_1.CommentServices.deleteComment(user, commentId);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Review delete successfully',
        data: result,
    });
}));
const getSingleComment = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.id;
    const result = yield comments_services_1.CommentServices.getSingleComment(commentId);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Review delete successfully',
        data: result,
    });
}));
const getCommentByUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield comments_services_1.CommentServices.getCommentByUser(id);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Comment fetched successfully',
        data: result,
    });
}));
exports.CommentController = {
    addComments,
    getAllComment,
    editComment,
    deleteComment,
    getSingleComment,
    getCommentByUser,
};
