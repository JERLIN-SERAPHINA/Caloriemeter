// routes/symptomsRoutes.js
const express = require('express');
const Symptom = require('../models/Symptom');
const router = express.Router();

// Get all symptoms
router.get('/', async (req, res) => {
    try {
        const symptoms = await Symptom.find();
        res.json(symptoms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update symptom by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedSymptom = await Symptom.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSymptom) {
            return res.status(404).json({ message: 'Symptom not found' });
        }
        res.json(updatedSymptom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete symptom by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedSymptom = await Symptom.findByIdAndDelete(req.params.id);
        if (!deletedSymptom) {
            return res.status(404).json({ message: 'Symptom not found' });
        }
        res.json({ message: 'Symptom deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;