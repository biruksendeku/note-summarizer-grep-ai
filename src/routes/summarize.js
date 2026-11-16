import express from "express";
const router = express.Router();
import { summarizeGet, summarizePost } from "../controllers/summarize.js";
import { summarizeValidator } from "../middlewares/validator/index.js";

router.get("/ask", summarizeGet);
router.post("/ask", summarizeValidator, summarizePost);

export default router;
