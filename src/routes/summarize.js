import express from "express";
const router = express.Router();
const { summarizeGet, summarizePost } = require("../controllers/summarize");

router.get("/ask", summarizeGet);
router.post("/ask", summarizePost);

export default router;
