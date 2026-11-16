export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Invalid request") {
    super(message, 400);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource") {
    super(message, 404);
  }
}
