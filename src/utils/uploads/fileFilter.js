import path from "path";
import { BadRequestError } from "../middlewares/customErrors.js";

export const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext && ext.length > 1) {
    cb(null, true); // allow files with any extension
  } else {
    // cb(null, false); // no extension - reject
    cb(new BadRequestError("File must have an extension"));
  }
};
