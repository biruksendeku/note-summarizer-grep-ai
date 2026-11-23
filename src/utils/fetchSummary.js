import { execFile } from "child_process";
import { fileURLToPath } from "node:url";
import { createTerms } from "../utils/createTerms.js";
import { createPattern } from "../utils/createPattern.js";

const CORPUS = fileURLToPath(
  new URL("../text_resources/corpus.txt", import.meta.url),
);

export const fetchSummary = (prompt) => {
  if (!prompt) {
    throw new Error("Enter a keyword or phrase to search.");
  }

  const terms = createTerms(prompt);
  if (!terms.length) {
    return Promise.resolve({
      prompt,
      terms,
      matches: [],
      error: null,
    });
  }
  const pattern = createPattern(terms);

  return new Promise((resolve, reject) => {
    execFile(
      "grep",
      ["-i", "-E", pattern, CORPUS],
      { maxBuffer: 10 * 1024 * 1024 },
      (err, stdout) => {
        if (err && err.code !== 1) {
          reject(new Error("Search failed. Please try again."));
          return;
        }
        const matches = stdout.split("\n").filter(Boolean);
        resolve({
          prompt,
          terms,
          matches,
          error: null,
        });
      },
    );
  });
};
