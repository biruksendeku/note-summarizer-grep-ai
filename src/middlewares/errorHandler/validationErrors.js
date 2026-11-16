import { validationResult } from "express-validator";
import { BadRequestError } from "./customErrors.js";

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errMsg = errors.array()[0].msg;
    if (req.accepts("html")) {
      return res.status(400).render("summarize", {
        prompt: req.body.prompt ?? "",
        terms: null,
        matches: null,
        error: errMsg,
      });
    }
    throw new BadRequestError(errMsg);
  }
  next();
};
