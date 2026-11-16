import fs from "fs";

export const STOPWORDS = new Set(
  fs
    .readFileSync(
      new URL("../text_resources/stopwords.txt", import.meta.url),
      "utf8",
    )
    .split("\n")
    .map((w) => w.trim().toLocaleLowerCase())
    .filter(Boolean),
);
