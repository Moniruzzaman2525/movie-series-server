import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { TagServices } from './tag.services';

const getAllTags = catchAsync(async (req, res, next) => {

    const result = await TagServices.getAllTags();
    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Tags fetched successfully',
        data: result
    });
});

const createTag = catchAsync(async (req, res, next) => {

    const result = await TagServices.createTag(req.body);
    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Tag created successfully',
        data: result
    });
});

const assignTagsToReview = catchAsync(async (req, res, next) => {


    const result = await TagServices.assignTagsToReview(req.body);
    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Tag assigned successfully',
        data: result
    });
});



export const TagController = {
    getAllTags,
    createTag,
    assignTagsToReview
};
