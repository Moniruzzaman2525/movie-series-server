import { CommentStatus, ReviewStatus } from "@prisma/client"
import prisma from "../../../helpers/prisma"

const approveOrUnpublishReview = async (reviewId: string, payload: { status: ReviewStatus }) => {

    await prisma.review.findFirstOrThrow({
        where: {
            id: reviewId
        }
    })

    console.log(payload)
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

    await prisma.comment.findFirstOrThrow({
        where: {
            id: reviewId
        }
    })

    const result = await prisma.comment.delete({
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
    const result = await prisma.video.findMany({
        orderBy: {
            review: {
                _count: 'desc',
            }
        },
        take: 10,
        select: {
            id: true,
            title: true,
            _count: {
                select: {
                    review: true
                }
            }
        }
    });

    return result;
};

const getAllUser = async () => {
    const result = await prisma.user.findMany({
        where: {
            isDeleted: false
        },
        select: {
            id: true,
            name: true,
            email: true,
            createAt: true,
            role: true,
            updateAt: true,
        },

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

const getAllUserReview = async (userId: string) => {

    const result = await prisma.review.findMany({
        include: {
            user: true
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
    getAllUserReview
}
