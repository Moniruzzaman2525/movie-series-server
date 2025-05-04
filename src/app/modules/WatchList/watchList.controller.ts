import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { WatchServices } from './watchList.services';
import { IAuthUser } from '../../interface/common';

const addToWatchList = catchAsync(async (req, res, next) => {

    const user = req.user;
    const result = await WatchServices.addToWatchList(user as IAuthUser, req.body);
    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Video added to watch list successfully',
        data: result
    });
});
const getWatchList = catchAsync(async (req, res, next) => {

    const user = req.user;
    const result = await WatchServices.getWatchList(user as IAuthUser);
    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Watch list fetched successfully',
        data: result
    });
});
const removeWatchList = catchAsync(async (req, res, next) => {

    const user = req.user;
    const videoId = req.params.id
    const result = await WatchServices.removeWatchList(user as IAuthUser, videoId);
    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Video removed from watch list successfully',
        data: result
    });
});



export const WatchController = {
    addToWatchList,
    getWatchList,
    removeWatchList
};
