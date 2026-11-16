import { validationResult } from "express-validator";
import { BadRequestError } from "./customErrors";

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // get the first error message - I used .bile() but this is conventional
    const errMsg = errors.array().map((e) => e.msg);
    throw new BadRequestError(errMsg[0]);
  }
  next();
};
