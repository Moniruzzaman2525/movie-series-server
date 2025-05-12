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
exports.AdminController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const admin_services_1 = require("./admin.services");
const approveOrUnpublishReview = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewId = req.params.id;
    const result = yield admin_services_1.AdminServices.approveOrUnpublishReview(reviewId, req.body);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Review status has been successfully updated.',
        data: result
    });
}));
const approveOrUnpublishComment = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.id;
    const result = yield admin_services_1.AdminServices.approveOrUnpublishComment(commentId, req.body);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Comment status has been successfully updated.',
        data: result
    });
}));
const removeInappropriateReview = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewId = req.params.id;
    const result = yield admin_services_1.AdminServices.removeInappropriateReview(reviewId);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Review has been successfully deleted.',
        data: result
    });
}));
const removeInappropriateComment = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.id;
    const result = yield admin_services_1.AdminServices.removeInappropriateComment(commentId);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Comment has been successfully deleted.',
        data: result
    });
}));
const getAverageRating = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const videoId = req.params.id;
    const result = yield admin_services_1.AdminServices.getAverageRating(videoId);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Average rating has been successfully fetched.',
        data: result
    });
}));
const getAllUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_services_1.AdminServices.getAllUser();
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'All user has been successfully fetched.',
        data: result
    });
}));
const getAllUserComments = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_services_1.AdminServices.getAllUserComments();
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'All user comments has been successfully fetched.',
        data: result
    });
}));
const getMostReviewedTitle = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_services_1.AdminServices.getMostReviewedTitle();
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Most reviewed title has been successfully fetched.',
        data: result
    });
}));
const removeUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const result = yield admin_services_1.AdminServices.removeUser(userId);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'User has been successfully deleted.',
        data: result
    });
}));
const activeUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const result = yield admin_services_1.AdminServices.activeUser(userId);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'User has been successfully deleted.',
        data: result
    });
}));
const getAllUserReview = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const result = yield admin_services_1.AdminServices.getAllUserReview(userId);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'User has been successfully deleted.',
        data: result
    });
}));
exports.AdminController = {
    approveOrUnpublishReview,
    approveOrUnpublishComment,
    removeInappropriateReview,
    removeInappropriateComment,
    getAverageRating,
    getMostReviewedTitle,
    getAllUser,
    removeUser,
    getAllUserReview,
    getAllUserComments,
    activeUser
};
