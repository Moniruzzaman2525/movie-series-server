import prisma from "../../../helpers/prisma";
import ApiError from "../../errors/apiError";
import { IAuthUser } from "../../interface/common";
import httpStatus from 'http-status';


const addToWatchList = async (user: IAuthUser, payload: any) => {

    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED,"User is not authenticated or doesn't exist");
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
    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "User is not authenticated or doesn't exist");
    }
    const result = await prisma.watchList.findMany({
        where: {
            userId: user?.id
        }
    })
    return result
}

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
