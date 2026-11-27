import express from "express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import path from "path";
import { fileURLToPath } from "node:url";
import { summarizerQueue } from "./queues/summarize-loader.js";
import { errorHandler } from "./middlewares/errorHandler/handler.js";
import summarizeRoutes from "./routes/summarize.js";
import uploaderRoutes from "./routes/uploader.js";

const app = express();

// creating server adapter to visualize workflow of bull-mq
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

const publicFolder = path.resolve(
  path.dirname(fileURLToPath(import.meta.url), "./public"),
);

// creating bull board ui
createBullBoard({
  queues: [new BullMQAdapter(summarizerQueue)],
  serverAdapter,
});

app.set("view cache", process.env.NODE_ENV === "development" ? true : false);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicFolder));

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
app.use("/", uploaderRoutes);
app.use("/admin/queues", serverAdapter.getRouter());

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Page Not Found",
  });
});

// overall error handler
app.use(errorHandler);

export default app;
