import { CommentStatus, ReviewStatus } from "@prisma/client"
import prisma from "../../../helpers/prisma"

const approveOrUnpublishReview = async (reviewId: string, payload: { status: ReviewStatus }) => {

    await prisma.review.findFirstOrThrow({
        where: {
            id: reviewId
        }
    })

    const result = await prisma.review.update({
        where: {
            id: reviewId
        },
        data: {
            status: payload.status
        }
    })

    return result
}

const approveOrUnpublishComment = async (commentId: string, payload: { status: CommentStatus }) => {

    await prisma.comment.findFirstOrThrow({
        where: {
            id: commentId
        }
    })

    const result = await prisma.comment.update({
        where: {
            id: commentId
        },
        data: {
            status: payload.status
        }
    })

    return result
}
const removeInappropriateReview = async (reviewId: string) => {

    await prisma.review.findFirstOrThrow({
        where: {
            id: reviewId
        }
    })

    const result = await prisma.review.delete({
        where: {
            id: reviewId
        }
    })

    return result
}
const removeInappropriateComment = async (commentId: string) => {

    await prisma.comment.findFirstOrThrow({
        where: {
            id: commentId
        }
    })

    const result = await prisma.comment.delete({
        where: {
            id: commentId
        }
    })

    return result
}

const getAverageRating = async (videoId: string) => {

    await prisma.video.findFirstOrThrow({
        where: {
            id: videoId
        }
    });

    const result = await prisma.review.aggregate({
        where: {
            videoId: videoId
        },
        _avg: {
            rating: true
        }
    });

    return result;
};

const getMostReviewedTitle = async () => {
    const titles = await prisma.video.findMany({
        include: {
            review: true,
        },
    });


    const reviews = await prisma.review.findMany({
        include: {
            user: true,
            video: true,
        }
    });
    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
    const titlesReviewed = titles.length;
    const activeReviewers = await prisma.user.count();

    const stats = {
        totalReviews,
        averageRating: averageRating.toFixed(1),
        titlesReviewed,
        activeReviewers,
    };


    const formattedTitles = titles.map((video) => {
        const reviewCount = video.review.length;
        const averageVideoRating =
            video.review.reduce((sum, review) => sum + review.rating, 0) / reviewCount || 0;
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

    return demoData

};

const getAllUser = async () => {
    const result = await prisma.user.findMany({
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

    return result
}
const getAllUserComments = async () => {
    const result = await prisma.comment.findMany({
        include: {
            user: true
        },
        orderBy: {
            createdAt: 'asc'
        }
    });

    return result
}
const removeUser = async (userId: string) => {

    const result = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            isDeleted: true
        }
    })

    return result
}
const activeUser = async (userId: string) => {

    const result = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            isDeleted: false
        }
    })

    return result
}

const getAllUserReview = async (userId: string) => {

    const result = await prisma.review.findMany({
        include: {
            user: true
        },
        orderBy: {
            createdAt: 'asc'
        }
    })

    return result
}


export const AdminServices = {
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
}
