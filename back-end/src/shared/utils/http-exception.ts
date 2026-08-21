export class HttpException extends Error {
  public readonly statusCode: number;
  public readonly errors: unknown;

  constructor(statusCode: number, message: string, errors: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }

  toJson() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      errors: this.errors
    };
  }
}

export class BadRequestException extends HttpException {
  constructor(errors: unknown) {
    super(400, 'BadRequestException', errors);
  }
}

export class NotFoundException extends HttpException {
  constructor(errors: unknown) {
    super(404, 'NotFoundException', errors);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(errors: unknown) {
    super(500, 'InternalServerErrorException', errors);
  }
}
