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
exports.CommentServices = {
    addComment,
    getAllComment,
    editComment,
    deleteComment,
    getSingleComment
};
