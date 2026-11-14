import STOPWORDS from "../utils/stopwords";
console.log("STOPWORDS: ", STOPWORDS);

export const createTerms = (prompt) => {
  return prompt.split(/\+s/).filter((w) => w && !STOPWORDS.has(w));
};
