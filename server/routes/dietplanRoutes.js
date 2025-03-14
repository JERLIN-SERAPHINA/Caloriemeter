// routes/dietPlanRoutes.js
const express = require('express');
const DietPlan = require('../models/DietPlan');
const router = express.Router();

// POST route to submit diet plan data
router.post('/', async (req, res) => {
    try {
        const dietData = new DietPlan(req.body);
        await dietData.save();
        res.status(201).json({ message: "Diet plan data saved successfully" });
    } catch (error) {
        console.error("Error saving diet plan data:", error);
        res.status(500).json({ error: "Failed to save diet plan data", details: error.message });
    }
});

module.exports = router;