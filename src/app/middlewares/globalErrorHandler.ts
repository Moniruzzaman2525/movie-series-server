import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import config from '../../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import handleNotFoundError from '../errors/handleNotFoundError';
import ApiError from '../errors/apiError';

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {


  console.log(err)

  let status = 500;
  let message = 'Something went wrong';
  let stack = err.stack

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    status = simplifiedError.statusCode;
    message = simplifiedError.message;
  }
  else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    status = simplifiedError.statusCode;
    message = simplifiedError.message;
  }
  else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    status = simplifiedError.statusCode;
    message = simplifiedError.message;
  }
  else if (err?.code === 'P2002') {
    const simplifiedError = handleDuplicateError(err);
    status = simplifiedError.statusCode;
    message = simplifiedError.message;
  }
  else if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
    const simplifiedError = handleNotFoundError(err);
    status = simplifiedError.statusCode;
    message = simplifiedError.message;
  }
  else if (err instanceof ApiError) {
    status = err.statusCode;
    message = err.message;
  }

  res.status(status).json({
    success: false,
    status: status,
    message,
    stack,
  });
};

export default globalErrorHandler;
