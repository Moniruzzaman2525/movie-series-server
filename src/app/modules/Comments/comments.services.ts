import prisma from "../../../helpers/prisma";
import ApiError from "../../errors/apiError";
import httpStatus from 'http-status';
import { IAuthUser } from "../../interface/common";


const addComments = async (user: any, payload: any) => {
    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "User is not authenticated or doesn't exist");
    }
    const userData = await prisma.user.findFirstOrThrow({
        where: {
            email: user.email,
            isDeleted: false,
        },
    });


    await prisma.video.findFirstOrThrow({
        where: {
            id: payload.videoId,
        },
    });

    const result = await prisma.comment.create({
        data: {
            ...payload,
            userId: userData.id,
        },
    });

    return result;
};

const getAllComment = async () => {

    const result = await prisma.comment.findMany()
    return result;
};

const editComment = async (user: IAuthUser, commentId: string, payload: any) => {
    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User is not authenticated');
    }
    const userData = await prisma.user.findFirstOrThrow({
        where: {
            email: user.email,
            isDeleted: false,
        },
    });

    const comment = await prisma.comment.findFirstOrThrow({
        where: {
            id: commentId,
            isApproved: false,
        },
    });

    if (comment.userId !== userData.id) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to edit this review');
    }

    const result = await prisma.comment.update({
        where: {
            id: commentId,
        },
        data: {
            ...payload,
        },
    });

    return result;
};

export const CommentServices = {
    addComments,
    getAllComment,
    editComment
}
