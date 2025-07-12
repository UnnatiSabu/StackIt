import Tag from "../models/Tag.js";

// @desc    Get all tags
// @route   GET /api/tags
export const getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a new tag
// @route   POST /api/tags
export const createTag = async (req, res) => {
  const { name, description } = req.body;
  try {
    const tag = new Tag({ name, description });
    const savedTag = await tag.save();
    res.status(201).json(savedTag);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
