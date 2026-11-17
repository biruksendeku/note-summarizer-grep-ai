import { execFile } from "child_process";
import { fileURLToPath } from "node:url";

import { createTerms } from "../utils/createTerms.js";
import { createPattern } from "../utils/createPattern.js";

const CORPUS = fileURLToPath(
  new URL("../text_resources/corpus.txt", import.meta.url),
);

export const summarizePost = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({
      prompt: "",
      terms: null,
      matches: null,
      error: "Enter a keyword or phrase to search.",
    });
  }

  const terms = createTerms(prompt);
  if (!terms.length) {
    return res.status(200).json({
      prompt,
      terms,
      matches: [],
      error: null,
    });
  }
  const pattern = createPattern(terms);

  execFile(
    "grep",
    ["-i", "-E", pattern, CORPUS],
    { maxBuffer: 10 * 1024 * 1024 },
    (err, stdout) => {
      if (err && err.code !== 1) {
        console.error(err);
        return res.status(500).json({
          prompt,
          terms,
          matches: null,
          error: "Search failed. Please try again.",
        });
      }
      const matches = stdout.split("\n").filter(Boolean);
      res.status(200).json({
        prompt,
        terms,
        matches,
        error: null,
      });
    },
  );
};
