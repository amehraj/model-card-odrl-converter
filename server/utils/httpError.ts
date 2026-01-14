class HttpError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = new.target.name;
  }
}

export class BadRequest extends HttpError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class Unauthorized extends HttpError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class Forbidden extends HttpError {
  constructor(message: string) {
    super(message, 403);
  }
}

export class NotFound extends HttpError {
  constructor(message: string) {
    super(message, 404);
  }
}
