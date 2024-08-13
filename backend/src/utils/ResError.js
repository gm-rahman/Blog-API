class ResError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = "ResError";
    Error.captureStackTrace(this, this.constructor);
  }
}

function handleResError(res, status, message) {
  const error = new ResError(status, message);
  return res
    .status(status)
    .send({ message: error.message, status: error.stack });
}

export { ResError, handleResError };
