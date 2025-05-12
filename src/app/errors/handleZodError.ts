import { ZodError } from 'zod';
import httpStatus from 'http-status';

const handleZodError = (err: ZodError) => {
    const messages = err.errors.map(e => e.message);
    const message = messages.length > 1
        ? `${messages.slice(0, -1).join(', ')} and ${messages[messages.length - 1]}`
        : messages[0] || 'Zod validation error';

    const statusCode = httpStatus.BAD_REQUEST;

    return { statusCode, message };
};

export default handleZodError;
