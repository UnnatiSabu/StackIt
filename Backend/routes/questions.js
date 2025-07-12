import express from "express";
import {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion
} from "../controllers/questionController.js";

import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getQuestions);
router.get("/:id", getQuestionById);

// Protected routes (only logged-in users)
router.post("/", protect, createQuestion);
router.put("/:id", protect, updateQuestion);

// Admin-only
router.delete("/:id", protect, admin, deleteQuestion);

// ✅ Extra simple POST /ask route (no auth)
let questions = [];

router.post("/ask", (req, res) => {
  const { title, description, tags } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required." });
  }

  const newQuestion = {
    id: questions.length + 1,
    title,
    description,
    tags,
    createdAt: new Date().toISOString()
  };

  questions.push(newQuestion);

  console.log("New question posted:", newQuestion);

  res.json({ message: "Question posted successfully", question: newQuestion });
});

router.get("/my-questions", (req, res) => {
  res.json({ questions });
});

export default router;
