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
    yield prisma_1.default.review.findFirstOrThrow({
        where: {
            id: reviewId
        }
    });
    const result = yield prisma_1.default.review.delete({
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
    const titles = yield prisma_1.default.video.findMany({
        include: {
            review: true,
        },
    });
    const reviews = yield prisma_1.default.review.findMany({
        include: {
            user: true,
            video: true,
        }
    });
    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
    const titlesReviewed = titles.length;
    const activeReviewers = yield prisma_1.default.user.count();
    const stats = {
        totalReviews,
        averageRating: averageRating.toFixed(1),
        titlesReviewed,
        activeReviewers,
    };
    const formattedTitles = titles.map((video) => {
        const reviewCount = video.review.length;
        const averageVideoRating = video.review.reduce((sum, review) => sum + review.rating, 0) / reviewCount || 0;
        return {
            id: video.id,
            title: video.title,
            category: video.category,
            reviewCount,
            averageRating: averageVideoRating.toFixed(1),
        };
    });
    const ratingSummary = [1, 2, 3, 4, 5].map((rating) => {
        const count = reviews.filter((review) => review.rating === rating).length;
        return {
            rating,
            count,
            percentage: ((count / totalReviews) * 100).toFixed(0),
        };
    });
    const formattedReviews = reviews
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 7)
        .map((review) => {
        const createdAt = new Date(review.createdAt).getTime();
        const hoursAgo = Math.floor((new Date().getTime() - createdAt) / (1000 * 60 * 60));
        return {
            id: review.id,
            title: review.video.title,
            user: {
                name: review.user.name || "N/A",
                // avatar: review.user.
            },
            rating: review.rating,
            comment: review.content,
            date: `${hoursAgo} hours ago`,
        };
    });
    const demoData = {
        stats,
        titles: formattedTitles,
        ratingSummary,
        reviews: formattedReviews,
    };
    return demoData;
});
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany({
        orderBy: {
            createAt: 'asc'
        },
        select: {
            id: true,
            name: true,
            email: true,
            createAt: true,
            role: true,
            isDeleted: true,
            updateAt: true,
        },
    });
    return result;
});
const getAllUserComments = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.comment.findMany({
        include: {
            user: true
        },
        orderBy: {
            createdAt: 'asc'
        }
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
const activeUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: {
            id: userId
        },
        data: {
            isDeleted: false
        }
    });
    return result;
});
const getAllUserReview = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.findMany({
        include: {
            user: true
        },
        orderBy: {
            createdAt: 'asc'
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
    getAllUserReview,
    getAllUserComments,
    activeUser,
};
