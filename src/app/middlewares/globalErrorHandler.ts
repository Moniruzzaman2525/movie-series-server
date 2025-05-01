const globalErrorHandler = (err: any, req: any, res: any, next: any) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const stack = err.stack;
  console.log(err)
  res.status(statusCode).json({
    statusCode,
    message,
    stack,
  });
};

export default globalErrorHandler;
