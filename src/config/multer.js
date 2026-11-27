import multer from "multer";
import { fileFilter } from "../utils/uploads/fileFilter.js";
import { createFolder } from "../utils/uploads/createFolder.js";
import { generateUniqueSuffix } from "../utils/uploads/generateUniqueSuffix.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    createFolder(file).then(
      (targetDir) => cb(null, targetDir),
      (error) => cb(error),
    );
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = generateUniqueSuffix(file);
    cb(null, uniqueSuffix);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || 100) * 1024 * 1024, // 100 MB per file
  },
  fileFilter,
});
