import { addSummarizerJob } from "../utils/jobs/addSummarizerJob.js";

export const summarizePost = async (req, res) => {
  const { prompt } = req.body;
  const job = await addSummarizerJob(prompt);
  res.status(202).json({
    success: true,
    jobId: job.id,
    status: "Summarizing in progress...",
  });
};
