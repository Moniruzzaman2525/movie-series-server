import httpStatus from 'http-status';

const handleDuplicateError = (err: any) => {

    const extractedField = err?.meta?.target?.[0];

    const errorMessage = extractedField
        ? `${extractedField} already exists`
        : 'Duplicate value exists in the database';

    const capitalizedMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);

    const statusCode = httpStatus.BAD_REQUEST;

    return { statusCode, message: capitalizedMessage };
};

export default handleDuplicateError;
