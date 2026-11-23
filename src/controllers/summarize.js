// import { execFile } from "child_process";
// import { fileURLToPath } from "node:url";

// import { createTerms } from "../utils/createTerms.js";
// import { createPattern } from "../utils/createPattern.js";
import { addSummarizerJob } from "../utils/jobs/addSummarizerJob.js";

// const CORPUS = fileURLToPath(
//   new URL("../text_resources/corpus.txt", import.meta.url),
// );

export const summarizePost = async (req, res) => {
  const { prompt } = req.body;
  await addSummarizerJob(prompt);
};
