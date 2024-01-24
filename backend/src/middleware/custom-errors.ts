class NotFoundError extends Error {
  constructor(message: string = "Not Found") {
    super(message);
    this.name = 'NotFoundError';
  }
}

class ValidationError extends Error {
  constructor(message: string = "Validation Error") {
    super(message);
    this.name = 'ValidationError';
  }
}

class InternalServerError extends Error {
  constructor(message: string = "Internal Server Error") {
    super(message);
    this.name = 'InternalServerError';
  }
}

class AuthenticationError extends Error {
  constructor(message: string = "Authentication Error") {
    super(message);
    this.name = 'AuthenticationError';
  }
}

class UnauthorizedError extends Error {
  constructor(message: string = "Unauthorized Error") {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export {
  NotFoundError,
  ValidationError,
  InternalServerError,
  AuthenticationError,
  UnauthorizedError,
};
