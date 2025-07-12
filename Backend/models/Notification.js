import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  relatedQuestion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  relatedAnswer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer",
  }
}, { timestamps: true });

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
