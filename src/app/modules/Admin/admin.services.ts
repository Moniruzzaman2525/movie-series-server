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
    })

    const result = await prisma.video.aggregate({
        where: {
            id: videoId
        },
        _avg: {
            rating: true
        }
    })

    return result
}
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


export const AdminServices = {
    approveOrUnpublishReview,
    approveOrUnpublishComment,
    removeInappropriateReview,
    removeInappropriateComment,
    getAverageRating,
    getMostReviewedTitle
}
