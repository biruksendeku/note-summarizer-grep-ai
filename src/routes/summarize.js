import express from "express";
const router = express.Router();
import { summarizeGet, summarizePost } from "../controllers/summarize.js";
import { summarizeValidator } from "../middlewares/validator/index.js";
import { handleValidationErrors } from "../middlewares/errorHandler/validationErrors.js";

router.get("/ask", summarizeGet);
router.post("/ask",
    summarizeValidator, 
    handleValidationErrors, 
    summarizePost);

export default router;
