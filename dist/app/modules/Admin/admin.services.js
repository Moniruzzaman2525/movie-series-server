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
exports.AdminServices = void 0;
const prisma_1 = __importDefault(require("../../../helpers/prisma"));
const approveOrUnpublishReview = (reviewId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.review.findFirstOrThrow({
        where: {
            id: reviewId
        }
    });
    const result = yield prisma_1.default.review.update({
        where: {
            id: reviewId
        },
        data: {
            status: payload.status
        }
    });
    return result;
});
const approveOrUnpublishComment = (commentId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.comment.findFirstOrThrow({
        where: {
            id: commentId
        }
    });
    const result = yield prisma_1.default.comment.update({
        where: {
            id: commentId
        },
        data: {
            status: payload.status
        }
    });
    return result;
});
const removeInappropriateReview = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.comment.findFirstOrThrow({
        where: {
            id: reviewId
        }
    });
    const result = yield prisma_1.default.comment.delete({
        where: {
            id: reviewId
        }
    });
    return result;
});
const removeInappropriateComment = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.comment.findFirstOrThrow({
        where: {
            id: commentId
        }
    });
    const result = yield prisma_1.default.comment.delete({
        where: {
            id: commentId
        }
    });
    return result;
});
const getAverageRating = (videoId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.video.findFirstOrThrow({
        where: {
            id: videoId
        }
    });
<<<<<<< HEAD
    const result = yield prisma_1.default.video.aggregate({
        where: {
            id: videoId
=======
    const result = yield prisma_1.default.review.aggregate({
        where: {
            videoId: videoId
>>>>>>> bc18c1ac3ff382e4adb0b37489644dd86272fcbb
        },
        _avg: {
            rating: true
        }
    });
    return result;
});
const getMostReviewedTitle = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.video.findMany({
        orderBy: {
            review: {
                _count: 'desc',
            }
        },
        take: 10,
        select: {
            id: true,
            title: true,
            _count: {
                select: {
                    review: true
                }
            }
        }
    });
    return result;
});
exports.AdminServices = {
    approveOrUnpublishReview,
    approveOrUnpublishComment,
    removeInappropriateReview,
    removeInappropriateComment,
    getAverageRating,
    getMostReviewedTitle
};
