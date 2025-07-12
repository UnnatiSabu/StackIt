import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,  // ensures no duplicate tags
    trim: true
  },
  description: {
    type: String  // optional: you could store what this tag means
  }
});

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
