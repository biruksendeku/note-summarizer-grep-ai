import path from "path";

export const generateUniqueSuffix = (file) => {
  const uniqueSuffix = `${Math.round(Math.random() * 1e9)}`;
  const ext = path.extname(file.originalname);
  return `${file.fieldname}-${uniqueSuffix}${ext}`;
};
