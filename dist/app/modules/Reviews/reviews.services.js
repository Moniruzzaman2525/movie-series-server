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
exports.ReviewServices = void 0;
<<<<<<< HEAD
const prisma_1 = __importDefault(require("../../../helpers/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const addReview = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User is not authenticated or doesn't exist");
=======
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../helpers/prisma"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const addReview = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, "User is not authenticated or doesn't exist");
>>>>>>> 7d7c4759b342087cf4a68961a776024a2d4d5337
    }
    const userData = yield prisma_1.default.user.findFirstOrThrow({
        where: {
            email: user.email,
<<<<<<< HEAD
            isDeleted: false
        }
    });
    yield prisma_1.default.video.findFirstOrThrow({
        where: {
            id: payload.videoId
        }
    });
    const result = yield prisma_1.default.review.create({
        data: Object.assign(Object.assign({}, payload), { userId: userData.id })
=======
            isDeleted: false,
        },
    });
    yield prisma_1.default.video.findFirstOrThrow({
        where: {
            id: payload.videoId,
        },
    });
    const result = yield prisma_1.default.review.create({
        data: Object.assign(Object.assign({}, payload), { userId: userData.id }),
>>>>>>> 7d7c4759b342087cf4a68961a776024a2d4d5337
    });
    return result;
});
const editReview = (user, reviewId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user) {
<<<<<<< HEAD
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User is not authenticated");
=======
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'User is not authenticated');
>>>>>>> 7d7c4759b342087cf4a68961a776024a2d4d5337
    }
    const userData = yield prisma_1.default.user.findFirstOrThrow({
        where: {
            email: user.email,
<<<<<<< HEAD
            isDeleted: false
        }
=======
            isDeleted: false,
        },
>>>>>>> 7d7c4759b342087cf4a68961a776024a2d4d5337
    });
    const review = yield prisma_1.default.review.findFirstOrThrow({
        where: {
            id: reviewId,
<<<<<<< HEAD
            isApproved: false
        }
    });
    if (review.userId !== userData.id) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "You are not authorized to edit this review");
    }
    const result = yield prisma_1.default.review.update({
        where: {
            id: reviewId
        },
        data: Object.assign({}, payload)
=======
            status: client_1.ReviewStatus.PENDING,
        },
    });
    if (review.userId !== userData.id) {
        throw new apiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to edit this review');
    }
    const result = yield prisma_1.default.review.update({
        where: {
            id: reviewId,
        },
        data: Object.assign({}, payload),
>>>>>>> 7d7c4759b342087cf4a68961a776024a2d4d5337
    });
    return result;
});
const deleteReview = (user, reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user) {
<<<<<<< HEAD
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User is not authenticated");
=======
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'User is not authenticated');
>>>>>>> 7d7c4759b342087cf4a68961a776024a2d4d5337
    }
    const userData = yield prisma_1.default.user.findFirstOrThrow({
        where: {
            email: user.email,
<<<<<<< HEAD
            isDeleted: false
        }
=======
            isDeleted: false,
        },
>>>>>>> 7d7c4759b342087cf4a68961a776024a2d4d5337
    });
    const review = yield prisma_1.default.review.findFirstOrThrow({
        where: {
            id: reviewId,
<<<<<<< HEAD
            isApproved: false
        }
    });
    if (review.userId !== userData.id) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "You are not authorized to edit this review");
    }
    const result = yield prisma_1.default.review.delete({
        where: {
            id: reviewId
        }
    });
    return result;
});
exports.ReviewServices = {
    addReview,
    editReview,
    deleteReview
=======
            status: client_1.ReviewStatus.PENDING,
        },
    });
    if (review.userId !== userData.id) {
        throw new apiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to edit this review');
    }
    const result = yield prisma_1.default.review.delete({
        where: {
            id: reviewId,
        },
    });
    return result;
});
const getSingleReview = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.findFirstOrThrow({
        where: {
            id: reviewId,
        },
    });
    return result;
});
const getReview = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.findMany();
    return result;
});
exports.ReviewServices = {
    addReview,
    editReview,
    deleteReview,
    getSingleReview,
    getReview
>>>>>>> 7d7c4759b342087cf4a68961a776024a2d4d5337
};
