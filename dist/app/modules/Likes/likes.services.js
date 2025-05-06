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
exports.LikeServices = void 0;
const prisma_1 = __importDefault(require("../../../helpers/prisma"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
const likeVideo = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const userData = yield tx.user.findFirstOrThrow({
            where: { email: user === null || user === void 0 ? void 0 : user.email, isDeleted: false }
        });
        const existingVideo = yield tx.video.findUnique({
            where: { id: payload.videoId }
        });
        if (!existingVideo)
            throw new apiError_1.default(404, 'Video not found');
        const currentLikeCount = (_a = existingVideo.like) !== null && _a !== void 0 ? _a : 0;
        const existingLike = yield tx.like.findFirst({
            where: { userId: userData.id, videoId: existingVideo.id }
        });
        if (existingLike) {
            yield tx.like.delete({ where: { id: existingLike.id } });
            yield tx.video.update({
                where: { id: existingVideo.id },
                data: { like: { decrement: 1 } }
            });
            return {
                message: 'Successfully un liked the video',
            };
        }
        else {
            yield tx.like.create({ data: { userId: userData.id, videoId: existingVideo.id } });
            yield tx.video.update({
                where: { id: existingVideo.id },
                data: { like: { increment: 1 } }
            });
            return {
                message: 'Successfully liked the video',
            };
        }
    }));
    return result;
});
const likeReview = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const userData = yield tx.user.findFirstOrThrow({
            where: { email: user === null || user === void 0 ? void 0 : user.email, isDeleted: false }
        });
        const existingReview = yield tx.review.findUnique({
            where: { id: payload.reviewId }
        });
        if (!existingReview)
            throw new apiError_1.default(404, 'Review not found');
        const existingLike = yield tx.like.findFirst({
            where: { userId: userData.id, reviewId: existingReview.id }
        });
        if (existingLike) {
            yield tx.like.delete({
                where: { id: existingLike.id }
            });
            const updatedReview = yield tx.review.update({
                where: { id: existingReview.id },
                data: {
                    like: { decrement: 1 }
                }
            });
            return {
                message: 'Successfully un liked the review',
            };
        }
        else {
            yield tx.like.create({
                data: { userId: userData.id, reviewId: existingReview.id }
            });
            const updatedReview = yield tx.review.update({
                where: { id: existingReview.id },
                data: {
                    like: { increment: 1 }
                }
            });
            return {
                message: 'Successfully liked the review',
            };
        }
    }));
    return result;
});
const likeComment = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const userData = yield tx.user.findFirstOrThrow({
            where: { email: user === null || user === void 0 ? void 0 : user.email, isDeleted: false }
        });
        const existingComment = yield tx.comment.findUnique({
            where: { id: payload.commentId }
        });
        if (!existingComment)
            throw new apiError_1.default(404, 'Comment not found');
        const existingLike = yield tx.like.findFirst({
            where: { userId: userData.id, commentId: existingComment.id }
        });
        if (existingLike) {
            yield tx.like.delete({
                where: { id: existingLike.id }
            });
            const updatedComment = yield tx.comment.update({
                where: { id: existingComment.id },
                data: { like: { decrement: 1 } }
            });
            return {
                message: 'Successfully un liked the comment',
            };
        }
        else {
            yield tx.like.create({
                data: { userId: userData.id, commentId: existingComment.id }
            });
            const updatedComment = yield tx.comment.update({
                where: { id: existingComment.id },
                data: { like: { increment: 1 } }
            });
            return {
                message: 'Successfully liked the comment',
            };
        }
    }));
    return result;
});
exports.LikeServices = {
    likeVideo,
    likeReview,
    likeComment
};
