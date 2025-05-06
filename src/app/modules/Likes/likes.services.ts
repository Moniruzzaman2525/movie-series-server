import prisma from "../../../helpers/prisma";
import ApiError from "../../errors/apiError";
import { IAuthUser } from "../../interface/common";

const likeVideo = async (user: IAuthUser, payload: any) => {
    const result = await prisma.$transaction(async (tx) => {
        const userData = await tx.user.findFirstOrThrow({
            where: { email: user?.email, isDeleted: false }
        });

        const existingVideo = await tx.video.findUnique({
            where: { id: payload.videoId }
        });
        if (!existingVideo) throw new ApiError(404, 'Video not found');

        const currentLikeCount = existingVideo.like ?? 0;

        const existingLike = await tx.like.findFirst({
            where: { userId: userData.id, videoId: existingVideo.id }
        });

        if (existingLike) {

            await tx.like.delete({ where: { id: existingLike.id } });
            await tx.video.update({
                where: { id: existingVideo.id },
                data: { like: { decrement: 1 } }
            });
            return {
                message: 'Successfully un liked the video',
            };
        } else {

            await tx.like.create({ data: { userId: userData.id, videoId: existingVideo.id } });
            await tx.video.update({
                where: { id: existingVideo.id },
                data: { like: { increment: 1 } }
            });
            return {
                message: 'Successfully liked the video',
            };
        }
    });

    return result;
};
const likeReview = async (user: IAuthUser, payload: any) => {
    const result = await prisma.$transaction(async (tx) => {
        const userData = await tx.user.findFirstOrThrow({
            where: { email: user?.email, isDeleted: false }
        });

        const existingReview = await tx.review.findUnique({
            where: { id: payload.reviewId }
        });
        if (!existingReview) throw new ApiError(404, 'Review not found');

        const existingLike = await tx.like.findFirst({
            where: { userId: userData.id, reviewId: existingReview.id }
        });

        if (existingLike) {

            await tx.like.delete({
                where: { id: existingLike.id }
            });

            const updatedReview = await tx.review.update({
                where: { id: existingReview.id },
                data: {
                    like: { decrement: 1 }
                }
            });

            return {
                message: 'Successfully un liked the review',
            };
        } else {

            await tx.like.create({
                data: { userId: userData.id, reviewId: existingReview.id }
            });

            const updatedReview = await tx.review.update({
                where: { id: existingReview.id },
                data: {
                    like: { increment: 1 }
                }
            });

            return {
                message: 'Successfully liked the review',
            };
        }
    });

    return result;
};
const likeComment = async (user: IAuthUser, payload: { commentId: string }) => {
    const result = await prisma.$transaction(async (tx) => {
        const userData = await tx.user.findFirstOrThrow({
            where: { email: user?.email, isDeleted: false }
        });

        const existingComment = await tx.comment.findUnique({
            where: { id: payload.commentId }
        });
        if (!existingComment) throw new ApiError(404, 'Comment not found');

        const existingLike = await tx.like.findFirst({
            where: { userId: userData.id, commentId: existingComment.id }
        });

        if (existingLike) {

            await tx.like.delete({
                where: { id: existingLike.id }
            });

            const updatedComment = await tx.comment.update({
                where: { id: existingComment.id },
                data: { like: { decrement: 1 } }
            });

            return {
                message: 'Successfully un liked the comment',
            };
        } else {

            await tx.like.create({
                data: { userId: userData.id, commentId: existingComment.id }
            });

            const updatedComment = await tx.comment.update({
                where: { id: existingComment.id },
                data: { like: { increment: 1 } }
            });

            return {
                message: 'Successfully liked the comment', 
            };
        }
    });

    return result;
};




export const LikeServices = {
    likeVideo,
    likeReview,
    likeComment
};
