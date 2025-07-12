import express from "express";
const router = express.Router();

// Example using a fake DB
let userProfile = {
  name: "Shruti Jain",
  email: "shruti@example.com",
  tagline: "Focused on clean code and growth"
};

// GET current profile
router.get("/my-profile", (req, res) => {
  res.json(userProfile);
});

// POST update profile
router.post("/update-profile", (req, res) => {
  const { name, email, tagline } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required." });
  }

  userProfile = { name, email, tagline };
  console.log("Updated user profile:", userProfile);

  res.json({ message: "Profile updated successfully", user: userProfile });
});

export default router;
