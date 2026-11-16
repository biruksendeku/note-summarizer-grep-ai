import express from "express";
import { fileURLToPath } from "node:url";
import { errorHandler } from "./middlewares/errorHandler/handler.js";
import summarizeRoutes from "./routes/summarize.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", fileURLToPath(new URL("./views", import.meta.url)));
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

app.use("/", summarizeRoutes);

app.use((req, res) => {
  if (req.accepts("html")) {
    return res.status(404).render("404");
  } else {
    res.status(404).json({
      success: false,
      message: "Page Not Found",
    });
  }
});
app.use(errorHandler);

export default app;
