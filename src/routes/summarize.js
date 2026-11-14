import express from "express";
const router = express.Router();
import { summarizeGet, summarizePost } from "../controllers/summarize";
import { summarizeValidator } from "../middlewares/validator";

router.get("/ask", summarizeGet);
router.post("/ask", summarizeValidator, summarizePost);

export default router;
