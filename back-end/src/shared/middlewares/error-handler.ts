import { ErrorRequestHandler } from 'express';
import { HttpException, InternalServerErrorException } from '../utils/http-exception';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof HttpException) {
    res.locals.error = error.toJson();
    return res.status(error.statusCode).json(error.toJson());
  }

  const internalError = new InternalServerErrorException('An unexpected error occurred');
  console.error(error.stack || error);

  res.locals.error = internalError.toJson();
  return res.status(internalError.statusCode).json(internalError.toJson());
};
