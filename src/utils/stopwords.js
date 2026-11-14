import fs from "fs";

export const STOPWORDS = new Set(
  fs
    .readFileSync("./src/text_resources/stopwords.txt", "utf8")
    .split("\n")
    .map((w) => w.trim().toLocaleLowerCase())
    .filter(Boolean),
);
