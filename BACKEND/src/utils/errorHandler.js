
export const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      sucess: false,
      message: err.message,
    });
  }

  console.log(err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Sever Error",
  });
};

export class AppError extends Error {
  statusCode;
  isOperational;

  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "RESOURCES NOT FOUND") {
    super(message, 404);
  }
}
export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized Access") {
    super(message, 401);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict Occurred") {
    super(message, 409);
  }
}
