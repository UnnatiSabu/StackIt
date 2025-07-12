import Answer from "../models/Answer.js";
import Question from "../models/Question.js";
import Notification from "../models/Notification.js";
import { io } from "../server.js";

// @desc    Post a new answer
// @route   POST /api/answers/:questionId
export const createAnswer = async (req, res) => {
  const { content, author } = req.body;

  try {
    // Create and save the new answer
    const answer = new Answer({
      question: req.params.questionId,
      content,
      author
    });
    const savedAnswer = await answer.save();

    // Find the question and populate author name
    const question = await Question.findById(req.params.questionId).populate("author", "name");
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // If the answer author is NOT the same as the question author, create a notification
    if (question.author._id.toString() !== author) {
        const newNotification = await Notification.create({
          user: question.author._id,
          type: "answer",
          message: `User answered your question "${question.title}"`,
          relatedQuestion: question._id,
          relatedAnswer: savedAnswer._id,
        });
    
        // Emit notification in real-time to the user room
        io.to(question.author._id.toString()).emit('notification', newNotification);
      }

    res.status(201).json(savedAnswer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Get all answers for a question with rating
// @route   GET /api/answers/:questionId
export const getAnswersByQuestion = async (req, res) => {
    try {
      const answers = await Answer.find({ question: req.params.questionId }).populate("author", "name");
  
      const answersWithRating = answers.map(answer => {
        const totalVotes = answer.upvotes + answer.downvotes;
        const rating = totalVotes === 0 ? 0 : ((answer.upvotes / totalVotes) * 5);
        return {
          ...answer.toObject(),
          rating: parseFloat(rating.toFixed(2))
        };
      });
  
      // Sort answers by rating descending
      answersWithRating.sort((a, b) => b.rating - a.rating);
  
      // Calculate average rating across all answers
      const avgRating = answersWithRating.length === 0 ? 0 : parseFloat(
        (answersWithRating.reduce((acc, ans) => acc + ans.rating, 0) / answersWithRating.length).toFixed(2)
      );
  
      res.json({ averageRating: avgRating, answers: answersWithRating });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

// @desc    Update an answer
// @route   PUT /api/answers/:id
export const updateAnswer = async (req, res) => {
  try {
    const answer = await Answer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    res.json(answer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete an answer
// @route   DELETE /api/answers/:id
export const deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findByIdAndDelete(req.params.id);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    res.json({ message: "Answer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Upvote an answer
// @route   POST /api/answers/upvote/:id
export const upvoteAnswer = async (req, res) => {
    const userId = req.user._id;  // assume auth middleware sets req.user
    try {
      const answer = await Answer.findById(req.params.id);
      if (!answer) return res.status(404).json({ message: "Answer not found" });
  
      // If user already upvoted, reject
      if (answer.upvotedBy.includes(userId)) {
        return res.status(400).json({ message: "User already upvoted this answer" });
      }
  
      // If user previously downvoted, remove downvote first
      if (answer.downvotedBy.includes(userId)) {
        answer.downvotes -= 1;
        answer.downvotedBy.pull(userId);
      }
  
      // Add upvote
      answer.upvotes += 1;
      answer.upvotedBy.push(userId);
  
      await answer.save();
  
      res.json({ message: "Upvoted", upvotes: answer.upvotes, downvotes: answer.downvotes });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  

// @desc    Downvote an answer
// @route   POST /api/answers/downvote/:id
export const downvoteAnswer = async (req, res) => {
    const userId = req.user._id;
    try {
      const answer = await Answer.findById(req.params.id);
      if (!answer) return res.status(404).json({ message: "Answer not found" });
  
      if (answer.downvotedBy.includes(userId)) {
        return res.status(400).json({ message: "User already downvoted this answer" });
      }
  
      if (answer.upvotedBy.includes(userId)) {
        answer.upvotes -= 1;
        answer.upvotedBy.pull(userId);
      }
  
      answer.downvotes += 1;
      answer.downvotedBy.push(userId);
  
      await answer.save();
  
      res.json({ message: "Downvoted", upvotes: answer.upvotes, downvotes: answer.downvotes });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
