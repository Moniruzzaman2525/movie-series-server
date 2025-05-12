import httpStatus from 'http-status';

const handleValidationError = (err: any) => {
    const message = err.errors.length > 0 ? err.errors[0].message : 'Validation error';

    const statusCode = httpStatus.BAD_REQUEST;

    return { statusCode, message };
};

export default handleValidationError;
