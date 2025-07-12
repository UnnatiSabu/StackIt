import express from "express";
const router = express.Router();

import {
  getTags,
  createTag
} from "../controllers/tagController.js";

router.get("/", getTags);
router.post("/", createTag);

export default router;
