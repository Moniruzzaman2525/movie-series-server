import prisma from "../../../helpers/prisma";
import ApiError from "../../errors/apiError";
import { IAuthUser } from "../../interface/common";

const likeVideo = async (user: IAuthUser, payload: any) => {

    const result = await prisma.$transaction(async (tx) => {
        const userData = await tx.user.findFirstOrThrow({
            where: {
                email: user?.email,
                isDeleted: false
            }
        });

        const existingVideo = await tx.video.findUnique({
            where: {
                id: payload.videoId
            }
        });

        if (!existingVideo) {
            throw new ApiError(404, 'Video not found');
        }

        const existingLike = await tx.like.findFirst({
            where: {
                userId: userData.id,
                videoId: existingVideo.id
            }
        });

        if (existingLike) {
            return {
                message: 'You have already liked this video'
            };
        }

        await tx.like.create({
            data: {
                userId: userData.id,
                videoId: existingVideo.id
            }
        });

        await tx.video.update({
            where: {
                id: existingVideo.id
            },
            data: {
                like: {
                    increment: 1
                }
            }
        });

        return {
            message: 'Successfully liked the video',
            videoId: existingVideo.id,
            likeCount: existingVideo.like + 1
        };
    });

    return result;
};


const unlikeVideo = async (user: IAuthUser, payload: any) => {

    const result = await prisma.$transaction(async (tx) => {
        const userData = await tx.user.findFirstOrThrow({
            where: {
                email: user?.email,
                isDeleted: false
            }
        });

        const existingVideo = await tx.video.findUnique({
            where: {
                id: payload.videoId
            }
        });

        if (!existingVideo) {
            throw new ApiError(404, 'Video not found');
        }

        const existingLike = await tx.like.findFirst({
            where: {
                userId: userData.id,
                videoId: existingVideo.id
            }
        });

        if (!existingLike) {
            return {
                message: 'You have not liked this video yet'
            };
        }

        await tx.like.delete({
            where: {
                id: existingLike.id
            }
        });

        await tx.video.update({
            where: {
                id: existingVideo.id
            },
            data: {
                like: {
                    decrement: 1
                }
            }
        });

        return {
            message: 'Successfully un liked the video',
            videoId: existingVideo.id,
            likeCount: existingVideo.like - 1
        };
    });

    return result;
};

export const LikeServices = {
    likeVideo,
    unlikeVideo
};
