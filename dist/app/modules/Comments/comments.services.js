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
exports.CommentServices = void 0;
const prisma_1 = __importDefault(require("../../../helpers/prisma"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const client_1 = require("@prisma/client");
const addComment = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, "User is not authenticated or doesn't exist");
    }
    const userData = yield prisma_1.default.user.findFirstOrThrow({
        where: {
            email: user.email,
            isDeleted: false,
        },
    });
    let target = null;
    if (payload.videoId) {
        target = 'video';
        yield prisma_1.default.video.findFirstOrThrow({
            where: {
                id: payload.videoId,
            },
        });
    }
    if (payload.reviewId) {
        target = 'review';
        yield prisma_1.default.review.findFirstOrThrow({
            where: {
                id: payload.reviewId,
                status: client_1.ReviewStatus.APPROVED
            },
        });
    }
    if (!target) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, "Either videoId or reviewId must be provided.");
    }
    if (!payload.parentCommentId) {
        const result = yield prisma_1.default.comment.create({
            data: Object.assign(Object.assign({}, payload), { userId: userData.id, [target + "Id"]: payload[`${target}Id`] }),
        });
        // const pushCommentId = await prisma.video.update({
        //     where: {
        //         id: result.videoId!,
        //     },
        //     data: {
        //         Comment: {
        //             connect: {
        //                 id: result.id,
        //             },
        //         },
        //     },
        // });
        // console.log(pushCommentId);
        return result;
    }
    const parentComment = yield prisma_1.default.comment.findUnique({
        where: {
            id: payload.parentCommentId,
        },
    });
    if (!parentComment) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, "Parent comment not found.");
    }
    if (parentComment.videoId !== payload.videoId && parentComment.reviewId !== payload.reviewId) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, "Parent comment does not belong to the specified video or review.");
    }
    const result = yield prisma_1.default.comment.create({
        data: Object.assign(Object.assign({}, payload), { userId: userData.id, [target + "Id"]: payload[`${target}Id`] }),
    });
    return result;
});
const getAllComment = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.comment.findMany();
    return result;
});
const getCommentByContent = (contentId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.video.findFirstOrThrow({
        where: { id: contentId },
    });
    const result = yield prisma_1.default.comment.findMany({
        where: {
            videoId: contentId,
            OR: [{ status: 'APPROVED' }, ...(userId ? [{ userId }] : [])],
            parentCommentId: null,
        },
        include: {
            _count: {
                select: { Like: true },
            },
            replies: {
                where: {
                    OR: [{ status: 'APPROVED' }, ...(userId ? [{ userId }] : [])],
                },
                include: {
                    user: true,
                    _count: {
                        select: { Like: true },
                    },
                    Like: userId
                        ? {
                            where: { userId },
                            select: { commentId: true },
                        }
                        : false,
                },
            },
            user: true,
            Like: userId
                ? {
                    where: { userId },
                    select: { commentId: true },
                }
                : false,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    result.forEach((comment) => {
        var _a, _b, _c;
        comment.isLiked = comment.Like && comment.Like.length > 0;
        comment.likes = (_b = (_a = comment._count) === null || _a === void 0 ? void 0 : _a.Like) !== null && _b !== void 0 ? _b : 0;
        (_c = comment.replies) === null || _c === void 0 ? void 0 : _c.forEach((reply) => {
            var _a, _b;
            reply.isLiked = reply.Like && reply.Like.length > 0;
            reply.likes = (_b = (_a = reply._count) === null || _a === void 0 ? void 0 : _a.Like) !== null && _b !== void 0 ? _b : 0;
            delete reply.Like;
            delete reply._count;
        });
        delete comment.Like;
        delete comment._count;
    });
    return result;
});
const editComment = (user, commentId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'User is not authenticated');
    }
    const userData = yield prisma_1.default.user.findFirstOrThrow({
        where: {
            email: user.email,
            isDeleted: false,
        },
    });
    const comment = yield prisma_1.default.comment.findFirstOrThrow({
        where: {
            id: commentId,
            status: client_1.CommentStatus.PENDING,
        },
    });
    if (comment.userId !== userData.id) {
        throw new apiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to edit this review');
    }
    const result = yield prisma_1.default.comment.update({
        where: {
            id: commentId,
        },
        data: Object.assign({}, payload),
    });
    return result;
});
const deleteComment = (user, commentId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'User is not authenticated');
    }
    const userData = yield prisma_1.default.user.findFirstOrThrow({
        where: {
            email: user.email,
            isDeleted: false,
        },
    });
    const comment = yield prisma_1.default.comment.findFirstOrThrow({
        where: {
            id: commentId,
            status: client_1.CommentStatus.PENDING,
        },
    });
    if (comment.userId !== userData.id) {
        throw new apiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to edit this review');
    }
    const result = yield prisma_1.default.comment.delete({
        where: {
            id: commentId,
        },
    });
    return result;
});
const getSingleComment = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.comment.findFirstOrThrow({
        where: {
            id: commentId,
        },
    });
    return result;
});
const getCommentByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.comment.findMany({
        where: {
            userId: userId,
        },
    });
    return result;
});
const getCommentByReviewId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.comment.findFirst({
        where: {
            reviewId: id
        }
    });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Reply not found');
    }
    const result = yield prisma_1.default.comment.findMany({
        where: {
            reviewId: id,
        },
        include: {
            user: true
        }
    });
    return result;
});
exports.CommentServices = {
    addComment,
    getAllComment,
    editComment,
    deleteComment,
    getSingleComment,
    getCommentByUser,
    getCommentByContent,
    getCommentByReviewId
};
