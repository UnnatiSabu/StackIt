import express from "express";
import {
  getAnswersByQuestion,
  createAnswer,
  updateAnswer,
  deleteAnswer,
  upvoteAnswer,
  downvoteAnswer
} from "../controllers/answerController.js";

import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/:questionId", getAnswersByQuestion);

// Protected routes
router.post("/:questionId", protect, createAnswer);
router.put("/:id", protect, updateAnswer);
router.put("/:id/upvote", protect, upvoteAnswer);
router.put("/:id/downvote", protect, downvoteAnswer);

// Admin-only delete
router.delete("/:id", protect, admin, deleteAnswer);

export default router;
