import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  tags: [{
    type: String
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  votes: {
    type: Number,
    default: 0
  },
  acceptedAnswer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer"
  }
}, { timestamps: true });

const Question = mongoose.model("Question", questionSchema);

export default Question;
