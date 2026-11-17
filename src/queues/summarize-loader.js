import { Queue } from "bullmq";
import { connection } from "../config/redis.js";

export const summarizerQueue = new Queue(process.env.SUMMARIZER_QUEUE_NAME, {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 1000 },
    removeOnComplete: true, // I can save space using this
  },
});
