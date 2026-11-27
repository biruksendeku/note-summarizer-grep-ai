import path from "path";
import { access } from "node:fs/promises";

export const folderExists = async (file) => {
  try {
    const extension = path.extname(file.originalname).slice(1);
    const targetDir = path.join(__dirname, "uploads", extension);
    await access(targetDir);
    return true;
  } catch (err) {
    return false;
  }
};
