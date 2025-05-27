import { UserServices } from './user.services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { IAuthUser } from '../../interface/common';

const createUser = catchAsync(async (req, res, next) => {
  const result = await UserServices.createUser(req.body);

  sendResponse(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});
const getMe = catchAsync(async (req, res, next) => {
  const user = req.user;
  const result = await UserServices.getMe(user as IAuthUser);

  sendResponse(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'Profile get successfully',
    data: result,
  });
});
const updateProfile = catchAsync(async (req, res, next) => {
  const user = req.user;
  const result = await UserServices.updateProfile(user as IAuthUser, req.body);

  sendResponse(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'Profile update successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  getMe,
  updateProfile
};
