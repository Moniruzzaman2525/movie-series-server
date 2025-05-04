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
        if (existingLike) return { message: 'You have already liked this video' };

        await tx.like.create({ data: { userId: userData.id, videoId: existingVideo.id } });

        await tx.video.update({
            where: { id: existingVideo.id },
            data: { like: { increment: 1 } }
        });

        return { message: 'Successfully liked the video', likeCount: currentLikeCount + 1 };
    });

    return result;
};
const unlikeVideo = async (user: IAuthUser, payload: any) => {
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
        if (!existingLike) return { message: 'You have not liked this video yet' };

        await tx.like.delete({ where: { id: existingLike.id } });
        await tx.video.update({
            where: { id: existingVideo.id },
            data: { like: { decrement: 1 } }
        });

        return { message: 'Successfully unliked the video', likeCount: currentLikeCount - 1 };
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
            return { message: 'You have already liked this review' };
        }

        await tx.like.create({
            data: { userId: userData.id, reviewId: existingReview.id }
        });

        const updatedReview = await tx.review.update({
            where: { id: existingReview.id },
            data: {
                like: { increment: 1 }
            }
        });

        return { message: 'Successfully liked the review', likeCount: updatedReview.like };
    });

    return result;
};


const unlikeReview = async (user: IAuthUser, payload: any) => {
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

        if (!existingLike) {
            return { message: 'You have not liked this review yet' };
        }

        await tx.like.delete({
            where: { id: existingLike.id }
        });

        const updatedReview = await tx.review.update({
            where: { id: existingReview.id },
            data: {
                like: { decrement: 1 }
            }
        });

        return { message: 'Successfully unliked the review', likeCount: updatedReview.like };
    });

    return result;
};


export const LikeServices = {
    likeVideo,
    unlikeVideo,
    likeReview,
    unlikeReview
};
