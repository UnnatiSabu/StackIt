import Question from "../models/Question.js";
import Tag from "../models/Tag.js";



// @desc    Get all questions
// @route   GET /api/questions
export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate("author", "name").populate("acceptedAnswer");
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single question by ID
// @route   GET /api/questions/:id
export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate("author", "name")
      .populate("acceptedAnswer");
    if (!question) return res.status(404).json({ message: "Question not found" });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create new question
// @route   POST /api/questions
export const createQuestion = async (req, res) => {
  const { title, description, tags, author } = req.body;
  try {
    const question = new Question({
      title,
      description,
      tags,
      author
    });
    const savedQuestion = await question.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Update question (optional)
// @route   PUT /api/questions/:id
export const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!question) return res.status(404).json({ message: "Question not found" });
    res.json(question);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete question
// @route   DELETE /api/questions/:id
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });
    res.json({ message: "Question removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
