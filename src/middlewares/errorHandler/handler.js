import { AppError } from "./customErrors.js";

export const errorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate value error",
    });
  }
  if (err.name === "ValidationError") {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  console.error("Error Message: ", err.message);
  console.error("Error Stack: ", err.stack);

  return res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal Server Error",
  });
};
