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
    console.log(payload);
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
    const result = yield prisma_1.default.review.aggregate({
        where: {
            videoId: videoId
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
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany({
        where: {
            isDeleted: false
        },
        select: {
            id: true,
            name: true,
            email: true,
            createAt: true,
            role: true,
            updateAt: true,
        },
    });
    return result;
});
const removeUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: {
            id: userId
        },
        data: {
            isDeleted: true
        }
    });
    return result;
});
const getAllUserReview = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.findMany({
        include: {
            user: true
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
    getMostReviewedTitle,
    getAllUser,
    removeUser,
    getAllUserReview
};
