import path from "path";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const uploadsRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../uploads",
);

export const createFolder = async (file) => {
  const extension = path.extname(file.originalname).slice(1);
  const targetDir = path.join(uploadsRoot, extension);
  await mkdir(targetDir, { recursive: true });
  return targetDir;
};
