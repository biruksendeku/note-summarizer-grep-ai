import { BadRequestError } from "../../middlewares/errorHandler/customErrors.js";

export const addSummarizerJob = async (prompt, client) => {
  if (!prompt) {
    throw new BadRequestError("Missing prompt");
  }

  const job = await summarizerQueue.add(process.env.SUMMARIZER_QUEUE_NAME, {
    prompt,
  });

  return job;
};
