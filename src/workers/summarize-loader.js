import "dotenv/config";

import { Worker } from "bullmq";
import { connection } from "../config/redis.js";
import { AppError } from "../middlewares/errorHandler/customErrors.js";
import { fetchSummary } from "../utils/fetchSummary.js";

export const worker = new Worker(
  process.env.SUMMARIZER_QUEUE_NAME,
  async (job) => {
    if (job.name === process.env.SUMMARIZER_QUEUE_NAME) {
      return fetchSummary(job.data.prompt);
    } else {
      throw new AppError(
        `Unexpected error during working on job: ${job.id}`,
        500,
      );
    }
  },
  { connection },
);

console.log("Worker started, waiting for jobs...");
