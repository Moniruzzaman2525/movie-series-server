import { UserServices } from './user.services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';

const createUser = catchAsync(async (req, res, next) => {
  const result = await UserServices.createUser(req.body);

  sendResponse(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
};
