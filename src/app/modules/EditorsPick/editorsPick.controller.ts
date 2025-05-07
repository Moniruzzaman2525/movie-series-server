import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { EditorsPickServer } from './editorsPick.server';

const createEditorPick = catchAsync(async (req, res) => {
    const result = await EditorsPickServer.createEditorPick(req.body);
    sendResponse(res, {
        success: true,
        message: 'Content add editor picks successfully',
        data: result,
        statuscode: httpStatus.CREATED,
    });
});
const getAllEditorPicks = catchAsync(async (req, res) => {
    const user = req.user
    const userId = user ? user.id : null;
    const result = await EditorsPickServer.getAllEditorPicks(userId);
    sendResponse(res, {
        success: true,
        message: 'Content get editor picks successfully',
        data: result,
        statuscode: httpStatus.CREATED,
    });
});

export const EditorsPickController = {
    createEditorPick,
    getAllEditorPicks
};
