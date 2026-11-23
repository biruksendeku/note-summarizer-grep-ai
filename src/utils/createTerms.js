import { STOPWORDS } from "./stopwords.js";

export const createTerms = (prompt) => {
  return prompt
    .toLocaleLowerCase()
    .split(/\s+/)
    .filter((w) => w && !STOPWORDS.has(w));
};
