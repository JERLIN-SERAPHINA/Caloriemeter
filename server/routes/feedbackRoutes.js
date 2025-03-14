// routes/feedbackRoutes.js
const express = require("express");
const Feedback = require("../models/Feedback");
const router = express.Router();

// Endpoint to submit feedback
router.post("/submitFeedback", async (req, res) => {
  const feedback = new Feedback(req.body);
  try {
    await feedback.save();
    console.log("Feedback saved successfully.");
    res.status(200).send("Feedback submitted successfully!");
  } catch (err) {
    console.error("Error saving feedback:", err);
    res.status(500).send("Error submitting feedback.");
  }
});

router.get("/getAllFeedback", async (req, res) => {
  try {
    const feedbackEntries = await Feedback.find();
    res.status(200).json(feedbackEntries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to delete feedback
router.delete("/deleteFeedback/:id", async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.status(200).send("Feedback deleted successfully!");
  } catch (err) {
    res.status(500).send("Error deleting feedback.");
  }
});

// Endpoint to update feedback
router.put("/updateFeedback/:id", async (req, res) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send("Feedback updated successfully!");
  } catch (err) {
    res.status(500).send("Error updating feedback.");
  }
});

module.exports = router;