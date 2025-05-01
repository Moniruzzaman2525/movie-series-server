import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { IAuthUser } from '../../interface/common';
import { LikeServices } from './likes.services';

const likeVideo = catchAsync(async (req, res, next) => {
    const user = req.user;
    const result = await LikeServices.likeVideo(user as IAuthUser, req.body);
    sendResponse(res, {
        statuscode: httpStatus.CREATED,
        success: true,
        message: 'Video like successfully',
        data: result,
    });
});

const unlikeVideo = catchAsync(async (req, res, next) => {
    const user = req.user;
    const result = await LikeServices.unlikeVideo(user as IAuthUser, req.body);
    sendResponse(res, {
        statuscode: httpStatus.CREATED,
        success: true,
        message: 'Video un like successfully',
        data: result,
    });
});


export const LikeController = {
    likeVideo,
    unlikeVideo
};
