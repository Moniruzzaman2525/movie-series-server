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
    const editorsPickVideos = await prisma.editorsPick.findMany({
        take: 10,
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            video: {
                include: {
                    review: {
                        where: { status: 'APPROVED' },
                    },
                    VideoTag: {
                        select: { tag: true },
                    },
                    Like: userId
                        ? {
                            where: { userId },
                            select: { videoId: true },
                        }
                        : undefined,
                    watchList: userId
                        ? {
                            where: { userId },
                            select: { videoId: true },
                        }
                        : undefined,
                },
            },
        },
    });

    const processed = editorsPickVideos.map(entry => {
        const video = entry.video;
        const ratings = video.review
            .map(r => r.rating)
            .filter(r => typeof r === 'number');
        const overallRating = ratings.length > 0
            ? parseFloat((ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2))
            : 0;

        return {
            ...video,
            overallRating,
            liked: video.Like?.some(l => l.videoId === video.id) ?? false,
            inWatchList: video.watchList?.some(w => w.videoId === video.id) ?? false,
        };
    });

    return {
        meta: {
            total: processed.length,
        },
        data: processed,
    };
};


export const EditorsPickServer = {
    createEditorPick,
    getAllEditorPicks
}
