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
exports.ReviewController = void 0;
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const reviews_services_1 = require("./reviews.services");
const addReview = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield reviews_services_1.ReviewServices.addReview(user, req.body);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.CREATED,
        success: true,
        message: 'Review add successfully',
        data: result,
    });
}));
const editReview = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const reviewId = req.params.id;
    const result = yield reviews_services_1.ReviewServices.editReview(user, reviewId, req.body);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Review edit successfully',
        data: result,
    });
}));
const deleteReview = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const reviewId = req.params.id;
    const result = yield reviews_services_1.ReviewServices.deleteReview(user, reviewId);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Review delete successfully',
        data: result,
    });
}));
const getSingleReview = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewId = req.params.id;
    const result = yield reviews_services_1.ReviewServices.getSingleReview(reviewId);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Review fetched successfully',
        data: result,
    });
}));
const getReview = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviews_services_1.ReviewServices.getReview();
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Review fetched successfully',
        data: result,
    });
}));
exports.ReviewController = {
    addReview,
    editReview,
    deleteReview,
    getSingleReview,
    getReview
};
