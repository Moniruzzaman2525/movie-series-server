import prisma from "../../../helpers/prisma"


const createEditorPick = async (payload: any) => {

    await prisma.video.findFirstOrThrow({
        where: {
            id: payload.videoId
        }
    })
    const result = await prisma.editorsPick.create({
        data: {
            videoId: payload.videoId
        }
    })
    return result

}


const getAllEditorPicks = async (userId?: string) => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);
    startOfWeek.setHours(0, 0, 0, 0);

    const result = await prisma.video.findMany({
        where: {
            EditorsPick: {
                some: {},
            },
            review: {
                some: {
                    createdAt: {
                        gte: startOfWeek,
                    },
                    status: 'APPROVED',
                },
            },
        },
        include: {
            Comment: {
                where: {
                    OR: [
                        { status: 'APPROVED' },
                        ...(userId ? [{ userId }] : []),
                    ],
                    parentCommentId: null,
                },
                include: {
                    replies: {
                        where: {
                            OR: [
                                { status: 'APPROVED' },
                                ...(userId ? [{ userId }] : []),
                            ],
                        },
                        include: {
                            user: true,
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
            },
            review: {
                where: {
                    createdAt: {
                        gte: startOfWeek,
                    },
                    status: 'APPROVED',
                },
            },
            VideoTag: {
                select: {
                    tag: true,
                },
            },
            Like: userId ? {
                where: {
                    userId,
                },
                select: {
                    videoId: true,
                },
            } : undefined,
            watchList: userId ? {
                where: {
                    userId,
                },
                select: {
                    videoId: true,
                },
            } : undefined,
            EditorsPick: true,
        },
    });

    result.forEach((video) => {
        const likedVideoIds = video.Like ? video.Like.map(like => like.videoId) : [];
        const watchListVideoIds = video.watchList ? video.watchList.map(w => w.videoId) : [];

        (video as any).liked = likedVideoIds.includes(video.id);
        (video as any).inWatchList = watchListVideoIds.includes(video.id);
        (video as any).totalComments = video.Comment?.length || 0;

        const ratings = (video.review || [])
            .map(r => r.rating)
            .filter(r => typeof r === 'number');

        const overallRating = ratings.length > 0
            ? parseFloat((ratings.reduce((acc, r) => acc + r, 0) / ratings.length).toFixed(2))
            : 0;

        (video as any).overallRating = overallRating;
    });

    return result;
};


const removeEditorByPicks = async (videoId: string) => {
    const result = await prisma.editorsPick.deleteMany({
        where: {
            videoId: videoId
        }
    })
    return result
}

export const EditorsPickServer = {
    createEditorPick,
    getAllEditorPicks,
    removeEditorByPicks
}
