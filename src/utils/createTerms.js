import { STOPWORDS } from "./stopwords.js";
console.log("STOPWORDS: ", STOPWORDS);

export const createTerms = (prompt) => {
  return prompt.split(/\+s/).filter((w) => w && !STOPWORDS.has(w));
};
