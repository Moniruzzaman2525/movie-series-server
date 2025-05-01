import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AdminServices } from './admin.services';

const approveOrUnpublishReview = catchAsync(async (req, res, next) => {

    const reviewId = req.params.id
    const result = await AdminServices.approveOrUnpublishReview(reviewId, req.body);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Review status has been successfully updated.',
        data: result
    });
});

const approveOrUnpublishComment = catchAsync(async (req, res, next) => {

    const commentId = req.params.id
    const result = await AdminServices.approveOrUnpublishComment(commentId, req.body);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Comment status has been successfully updated.',
        data: result
    });
});

const removeInappropriateReview = catchAsync(async (req, res, next) => {

    const reviewId = req.params.id
    const result = await AdminServices.removeInappropriateReview(reviewId);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Review has been successfully deleted.',
        data: result
    });
});

const removeInappropriateComment = catchAsync(async (req, res, next) => {

    const commentId = req.params.id
    const result = await AdminServices.removeInappropriateComment(commentId);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Comment has been successfully deleted.',
        data: result
    });
});

const getAverageRating = catchAsync(async (req, res, next) => {

    const videoId = req.params.id
    const result = await AdminServices.getAverageRating(videoId);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Comment has been successfully deleted.',
        data: result
    });
});

const getMostReviewedTitle = catchAsync(async (req, res, next) => {

    const result = await AdminServices.getMostReviewedTitle();

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Comment has been successfully deleted.',
        data: result
    });
});


export const AdminController = {
    approveOrUnpublishReview,
    approveOrUnpublishComment,
    removeInappropriateReview,
    removeInappropriateComment,
    getAverageRating,
    getMostReviewedTitle
};
