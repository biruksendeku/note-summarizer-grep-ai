import express from "express";
import summarizeRoutes from "./routes/summarize";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", summarizeRoutes);

export default app;
