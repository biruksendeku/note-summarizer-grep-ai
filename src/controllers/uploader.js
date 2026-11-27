import path from "path";
import { fileURLToPath } from "node:url";
import { BadRequestError } from "../middlewares/errorHandler/customErrors.js";

export const uploaderGet = (req, res) => {
  res.sendFile(
    path.resolve(
      path.dirname(fileURLToPath(import.meta.url), "../public/upload.html"),
    ),
  );
};

export const uploader = async (re, res) => {
  if (!req.file) {
    throw new BadRequestError("No file uploaded!");
  }
};
