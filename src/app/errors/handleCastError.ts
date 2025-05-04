import { Prisma } from '@prisma/client';
import httpStatus from 'http-status';
const handleCastError = (err: Prisma.PrismaClientKnownRequestError) => {
    const message = 'Invalid ID format or ID cast error';
    const statusCode = httpStatus.BAD_REQUEST;

    return { statusCode, message };
};

export default handleCastError;
