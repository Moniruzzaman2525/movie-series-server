import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { contentService } from './content.service';
import { pick } from './content.constans';

const createContent = catchAsync(async (req, res) => {
  const result = await contentService.createContent(req);
  sendResponse(res, {
    success: true,
    message: 'Content created successfully',
    data: result,
    statuscode: httpStatus.CREATED,
  });
});

const getAllContent = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['category', 'genre','cast']);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const result = await contentService.getAllContent(filters, options);
  sendResponse(res, {
    success: true,
    message: 'Content fetched successfully',
    data: result,
    statuscode: httpStatus.OK,
  });
});

const updateContent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await contentService.updateContent(id, req);
  sendResponse(res, {
    success: true,
    message: 'Content updated successfully',
    data: result,
    statuscode: httpStatus.OK,
  });
});

const deleteContent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await contentService.deleteContent(id);
  sendResponse(res, {
    success: true,
    message: 'Content deleted successfully',
    data: result,
    statuscode: httpStatus.OK,
  });
});

const getSingleContent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await contentService.getContentById(id);
  sendResponse(res, {
    success: true,
    message: 'Content fetched successfully',
    data: result,
    statuscode: httpStatus.OK,
  });
});

const contentByCategory = catchAsync(async (req, res) => {
  console.log(req);
  // const { id } = req.params;
  const result = await contentService.contentGetCategory();
  console.log(result);
  sendResponse(res, {
    success: true,
    message: 'Content fetched successfully',
    data: result,
    statuscode: httpStatus.OK,
  });
});
export const contentController = {
  createContent,
  getAllContent,
  updateContent,
  deleteContent,
  getSingleContent,
  contentByCategory,
};
