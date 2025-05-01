import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const loginUser = catchAsync(async (req, res, next) => {
    // const result = await AdminServices.loginUser(req.body);

    // const { refreshToken, accessToken } = result;

    // res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

    // sendResponse(res, {
    //     statuscode: httpStatus.OK,
    //     success: true,
    //     message: 'User login successfully',
    //     data: { accessToken },
    // });
});


export const AuthController = {

};
