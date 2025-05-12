import { Prisma } from '@prisma/client';
import httpStatus from 'http-status';
export const handleNotFoundError = (err: Prisma.PrismaClientKnownRequestError) => {
    let modelName
    const existingModel = err.meta?.modelName || 'Unknown Model';
    if (existingModel === 'ServiceRecord') {
        modelName = 'Service record';
    } else {
        modelName = existingModel;
    }
    const errorMessage = `${modelName} not found`;
    const statusCode = httpStatus.NOT_FOUND;

    return { statusCode, message: errorMessage };
};

export default handleNotFoundError;
