import { ErrorRequestHandler } from 'express';
import { HttpException, InternalServerErrorException } from '../utils/http-exception';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {

  if (error instanceof HttpException) {
    return res.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message,
      errors: error.errors || null,
    });
  }

  const internalError = new InternalServerErrorException('An unexpected error occurred');
  console.error('[Unhandled Error]:', error.stack || error);

  return res.status(internalError.statusCode).json({
    statusCode: internalError.statusCode,
    message: internalError.message,
  });
};