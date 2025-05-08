import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { IAuthUser } from '../../interface/common';
import { CommentServices } from './comments.services';

const addComments = catchAsync(async (req, res, next) => {
    const user = req.user;
    const result = await CommentServices.addComment(user as IAuthUser, req.body);
    sendResponse(res, {
        statuscode: httpStatus.CREATED,
        success: true,
        message: 'Comment add successfully',
        data: result,
    });
});

const getAllComment = catchAsync(async (req, res, next) => {
    const result = await CommentServices.getAllComment();
    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Comment fetched successfully',
        data: result,
    });
});
const getCommentByContent = catchAsync(async (req, res, next) => {
    const contentId = req.params.id;
    const user = req.user
    const userId = user ? user.id : null;

    const result = await CommentServices.getCommentByContent(contentId, userId);
    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Comment fetched successfully',
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
        message: 'Comment edit successfully',
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

const getSingleComment = catchAsync(async (req, res, next) => {
    const commentId = req.params.id;
    const result = await CommentServices.getSingleComment(commentId);
    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Review delete successfully',
        data: result,
    });
});

const getCommentByUser = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const result = await CommentServices.getCommentByUser(id);
    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Comment fetched successfully',
        data: result,
    });
})

const getCommentByReviewId = catchAsync(async (req, res, next) => {
    const { reviewId } = req.params
    console.log(reviewId);
    const result = await CommentServices.getCommentByReviewId(reviewId);
    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Comment fetched successfully',
        data: result,
    });
})
export const CommentController = {
    addComments,
    getAllComment,
    editComment,
    deleteComment,
    getSingleComment,
    getCommentByUser,
    getCommentByContent,
    getCommentByReviewId,
};
