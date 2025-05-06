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
        message: result.message,
        data: result,
    });
});


const likeReview = catchAsync(async (req, res, next) => {
    const user = req.user;
    const result = await LikeServices.likeReview(user as IAuthUser, req.body);
    sendResponse(res, {
        statuscode: httpStatus.CREATED,
        success: true,
        message: result.message,
        data: result,
    });
});

const likeComment = catchAsync(async (req, res, next) => {
    const user = req.user;
    const result = await LikeServices.likeComment(user as IAuthUser, req.body);
    sendResponse(res, {
        statuscode: httpStatus.CREATED,
        success: true,
        message: result.message,
        data: result,
    });
});


export const LikeController = {
    likeVideo,
    likeReview,
    likeComment
};
