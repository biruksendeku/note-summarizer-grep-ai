import express from "express";
const router = express.Router();
import { uploaderGet, uploader } from "../controllers/uploader.js";
import { upload } from "../config/multer.js";

router.get("/upload", uploaderGet);
router.post("/upload", upload.single("file"), uploader);

export default router;
