import express from "express";
import { errorHandler } from "./middlewares/errorHandler/handler.js";
import summarizeRoutes from "./routes/summarize.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", summarizeRoutes);
app.use(errorHandler);

export default app;
