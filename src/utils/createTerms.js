import { STOPWORDS } from "./stopwords.js";

export const createTerms = (prompt) => {
  return prompt.split(/\+s/).filter((w) => w && !STOPWORDS.has(w));
};
