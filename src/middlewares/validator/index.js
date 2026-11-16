import { body } from "express-validator";

export const summarizeValidator = [
  body("prompt")
    .trim()
    .notEmpty()
    .withMessage("Prompt cannot be empty")
    .bail()
    .toLowerCase()
    .matches(/^[A-Za-z0-9-_]+$/)
    .withMessage("Prompt contains invalid characters")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Use at least 2 character prompt"),
];
