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
exports.LikeController = void 0;
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const likes_services_1 = require("./likes.services");
const likeVideo = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield likes_services_1.LikeServices.likeVideo(user, req.body);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.CREATED,
        success: true,
        message: 'Video like successfully',
        data: result,
    });
}));
const unlikeVideo = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield likes_services_1.LikeServices.unlikeVideo(user, req.body);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.CREATED,
        success: true,
        message: 'Video unlike successfully',
        data: result,
    });
}));
const likeReview = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield likes_services_1.LikeServices.likeReview(user, req.body);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.CREATED,
        success: true,
        message: 'Review like successfully',
        data: result,
    });
}));
const unlikeReview = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield likes_services_1.LikeServices.unlikeReview(user, req.body);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.CREATED,
        success: true,
        message: 'Review unlike successfully',
        data: result,
    });
}));
exports.LikeController = {
    likeVideo,
    unlikeVideo,
    likeReview,
    unlikeReview
};
