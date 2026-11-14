import express from "express";
const router = express.Router();
const { summarizeGet, summarizePost } = require("../controllers/summarize");

router.get("/ask");
router.post("/ask");
