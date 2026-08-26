export class HttpException extends Error {
  public readonly statusCode: number;
  public readonly errors?: unknown;

  constructor(statusCode: number, message: string, errors?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string = 'Bad Request', errors?: unknown) {
    super(400, message, errors); 
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string = 'Not Found', errors?: unknown) {
    super(404, message, errors);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string = 'Internal Server Error', errors?: unknown) {
    super(500, message, errors);
  }
}