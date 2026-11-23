import express from "express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import { summarizerQueue } from "./queues/summarize-loader.js";
import { errorHandler } from "./middlewares/errorHandler/handler.js";
import summarizeRoutes from "./routes/summarize.js";

const app = express();

// setting visual bull tracker
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");
createBullBoard({
  queues: [new BullMQAdapter(summarizerQueue)],
  serverAdapter,
});

// app level settings
app.set("view cache", process.env.NODE_ENV === "development" ? true : false);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// overall health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

// routers
app.use("/", summarizeRoutes);
app.use("/admin/queues", serverAdapter.getRouter());

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Page Not Found",
  });
});

// overall error handler
app.use(errorHandler);

export default app;
