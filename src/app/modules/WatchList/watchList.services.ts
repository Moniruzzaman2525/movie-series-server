import prisma from "../../../helpers/prisma";
import ApiError from "../../errors/apiError";
import { IAuthUser } from "../../interface/common";
import httpStatus from 'http-status';


const addToWatchList = async (user: IAuthUser, payload: any) => {

    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "User is not authenticated or doesn't exist");
    }

    const video = await prisma.video.findFirstOrThrow({
        where: {
            id: payload.videoId
        }
    });

    const result = await prisma.watchList.create({
        data: {
            userId: user?.id,
            videoId: video.id
        }
    })
    return result
}

const getWatchList = async (user: IAuthUser) => {



    const result = await prisma.video.findMany({
        where: {
            watchList: {
                some: {
                    userId: user?.id,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            Comment: {
                where: {
                    OR: [
                        { status: 'APPROVED' },
                        { userId: user?.id },
                    ],
                    parentCommentId: null,
                },
                include: {
                    replies: {
                        where: {
                            OR: [
                                { status: 'APPROVED' },
                                { userId: user?.id },
                            ],
                        },
                        include: {
                            user: true,
                        },
                    },
                    user: true,
                    Like: {
                        where: { userId: user?.id },
                        select: { commentId: true },
                    },
                },
            },
            review: {
                where: {
                    OR: [
                        { status: 'APPROVED' },
                        { userId: user?.id },
                    ],
                },
                include: {
                    user: true,
                },
            },
            VideoTag: {
                select: {
                    tag: true,
                },
            },
            Like: {
                where: { userId: user?.id },
                select: {
                    videoId: true,
                },
            },
            watchList: {
                where: { userId: user?.id },
                select: { videoId: true },
            },
            EditorsPick: true,
        },
    });

    result.forEach((video) => {
        const likedVideoIds = video.Like?.map((like) => like.videoId) || [];
        const watchListVideoIds = video.watchList?.map((w) => w.videoId) || [];

        (video as any).liked = likedVideoIds.includes(video.id);
        (video as any).inWatchList = watchListVideoIds.includes(video.id);
        (video as any).totalComments = video.Comment?.length || 0;

        const ratings = (video.review || [])
            .map((r) => r.rating)
            .filter((r) => typeof r === 'number');

        const overallRating =
            ratings.length > 0
                ? parseFloat((ratings.reduce((acc, r) => acc + r, 0) / ratings.length).toFixed(2))
                : 0;

        (video as any).overallRating = overallRating;
    });

    return result
};

const removeWatchList = async (user: IAuthUser, videoId: string) => {

    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "User is not authenticated or doesn't exist");
    }
    const result = await prisma.watchList.deleteMany({
        where: {
            userId: user?.id,
            videoId: videoId
        }
    })
    return result
}

export const WatchServices = {
    addToWatchList,
    getWatchList,
    removeWatchList
}
