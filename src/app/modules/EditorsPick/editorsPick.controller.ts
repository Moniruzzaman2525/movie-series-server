import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { EditorsPickServer } from './editorsPick.server';

const createEditorPick = catchAsync(async (req, res) => {
    const result = await EditorsPickServer.createEditorPick(req.body);
    sendResponse(res, {
        success: true,
        message: 'Content created successfully',
        data: result,
        statuscode: httpStatus.CREATED,
    });
});

export const EditorsPickController = {
    createEditorPick
};
