import express from "express";
import { execFile } from "child_process";
import fs from "fs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
