import { Worker } from "bullmq";
import { connection } from "../config/redis.js";
import { AppError } from "../middlewares/errorHandler/customErrors.js";

export const worker = new Worker(
  process.env.SUMMARIZER_QUEUE_NAME,
  async (job) => {
    if (job.name === process.env.SUMMARIZER_QUEUE_NAME) {
      await doTheMainTaskHere();
      return;
    } else {
      throw new AppError(
        `Unexpected error during working on job: ${job.id}`,
        500,
      );
    }
  },
  { connection },
);
