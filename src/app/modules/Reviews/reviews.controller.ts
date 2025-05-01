import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { ReviewServices } from './reviews.services';
import { IAuthUser } from '../../interface/common';

const addReview = catchAsync(async (req, res, next) => {
  const user = req.user;
  const result = await ReviewServices.addReview(user as IAuthUser, req.body);
  sendResponse(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'Review add successfully',
    data: result,
  });
});

const editReview = catchAsync(async (req, res, next) => {
  const user = req.user;
  const reviewId = req.params.id;
  const result = await ReviewServices.editReview(user as IAuthUser, reviewId, req.body);
  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Review edit successfully',
    data: result,
  });
});

const deleteReview = catchAsync(async (req, res, next) => {
  const user = req.user;
  const reviewId = req.params.id;
  const result = await ReviewServices.deleteReview(user as IAuthUser, reviewId);
  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Review delete successfully',
    data: result,
  });
});

const getSingleReview = catchAsync(async (req, res, next) => {
  const reviewId = req.params.id;
  const result = await ReviewServices.getSingleReview(reviewId);
  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Review delete successfully',
    data: result,
  });
});

const getReview = catchAsync(async (req, res, next) => {
  const result = await ReviewServices.getReview();
  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Review delete successfully',
    data: result,
  });
});

export const ReviewController = {
  addReview,
  editReview,
  deleteReview,
  getSingleReview,
  getReview
};
