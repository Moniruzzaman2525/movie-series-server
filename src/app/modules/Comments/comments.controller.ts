import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { IAuthUser } from '../../interface/common';
import { CommentServices } from './comments.services';

const addComments = catchAsync(async (req, res, next) => {
    const user = req.user;
    const result = await CommentServices.addComments(user as IAuthUser, req.body);
    sendResponse(res, {
        statuscode: httpStatus.CREATED,
        success: true,
        message: 'Review add successfully',
        data: result,
    });
});

const getAllComment = catchAsync(async (req, res, next) => {
    const result = await CommentServices.getAllComment();
    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Comment fetch successfully',
        data: result,
    });
});

const editComment = catchAsync(async (req, res, next) => {
    const user = req.user;
    const commentId = req.params.id;
    const result = await CommentServices.editComment(user as IAuthUser, commentId, req.body);
    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Review edit successfully',
        data: result,
    });
});

const deleteComment = catchAsync(async (req, res, next) => {
    const user = req.user;
    const commentId = req.params.id;
    const result = await CommentServices.deleteComment(user as IAuthUser, commentId);
    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Review delete successfully',
        data: result,
    });
});

export const CommentController = {
    addComments,
    getAllComment,
    editComment,
    deleteComment
};
