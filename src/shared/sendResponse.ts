import { Response } from 'express';
import { IResponse } from '../app/interface/response';

const sendResponse = <T>(res: Response, jsonData: IResponse<T>) => {
  res.status(jsonData.statuscode).json({
    success: jsonData.success,
    message: jsonData.message,
    data: jsonData.data,
    meta: jsonData.meta,
  });
};

export default sendResponse;
