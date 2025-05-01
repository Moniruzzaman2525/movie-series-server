import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthServices } from './auth.services';

const loginUser = catchAsync(async (req, res, next) => {
  const result = await AuthServices.loginUser(req.body);

  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'User login successfully',
    data: { accessToken },
  });
});

const forgetPassword = catchAsync(async (req, res, next) => {
  const result = await AuthServices.forgetPassword(req.body);

<<<<<<< HEAD

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: "A password reset link has been sent to your email. Please check your inbox.",
        data: result
    })
})
=======
  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'A password reset link has been sent to your email. Please check your inbox.',
    data: result,
  });
});
>>>>>>> 7d7c4759b342087cf4a68961a776024a2d4d5337

const resetPassword = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization || '';

  const result = await AuthServices.resetPassword(token, req.body);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Password changes successfully.',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  forgetPassword,
  resetPassword,
};
