// routes/questionnaireRoutes.js
const express = require('express');
const router = express.Router();
const Questionnaire = require('../models/Questionnaire');
const mongoose = require('mongoose');

// Get all questionnaires
router.get('/', async (req, res) => {
  try {
    const questionnaires = await Questionnaire.find().sort({ questionaireId: 1 });
    res.json(questionnaires);
  } catch (err) {
    console.error('Error fetching questionnaires:', err);
    res.status(500).json({ message: 'Error fetching questionnaires', error: err.message });
  }
});

// Get a specific questionnaire by ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    let query;

    // Check if the ID is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { 
        $or: [
          { _id: id },
          { questionaireId: parseInt(id) || id } // Try to parse as integer, fall back to original
        ]
      };
    } else {
      // If it's not a valid ObjectId, only search by questionaireId
      // Try to convert to number if possible
      const numericId = parseInt(id);
      query = { questionaireId: isNaN(numericId) ? id : numericId };
    }

    const questionnaire = await Questionnaire.findOne(query);
    
    if (!questionnaire) {
      return res.status(404).json({ message: 'Questionnaire not found' });
    }
    
    res.json(questionnaire);
  } catch (err) {
    console.error('Error fetching questionnaire:', err);
    res.status(500).json({ message: 'Error fetching questionnaire', error: err.message });
  }
});

// Create a new questionnaire
router.post('/', async (req, res) => {
  try {
    const { questionaireId, questionaireName, questions } = req.body;

    // Check if the ID already exists
    const existingQuestionnaire = await Questionnaire.findOne({ questionaireId });
    if (existingQuestionnaire) {
      return res.status(400).json({ error: 'A questionnaire with this ID already exists' });
    }

    const newQuestionnaire = await Questionnaire.create({
      questionaireId,
      questionaireName,
      questions
    });

    res.status(201).json(newQuestionnaire);
  } catch (err) {
    console.error('Error creating questionnaire:', err);
    
    // Process validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({ error: 'Validation error', details: errors });
    }
    
    res.status(500).json({ error: 'Error creating questionnaire', details: err.message });
  }
});

// Update a questionnaire
router.put('/:id', async (req, res) => {
  try {
    const { questionaireName, questions } = req.body;
    
    // Find by questionnaireId or MongoDB _id
    const updatedQuestionnaire = await Questionnaire.findOneAndUpdate(
      { $or: [{ _id: req.params.id }, { questionaireId: req.params.id }] },
      { questionaireName, questions },
      { new: true, runValidators: true }
    );
    
    if (!updatedQuestionnaire) {
      return res.status(404).json({ message: 'Questionnaire not found' });
    }
    
    res.json(updatedQuestionnaire);
  } catch (err) {
    console.error('Error updating questionnaire:', err);
    
    // Process validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({ message: 'Validation error', details: errors });
    }
    
    res.status(500).json({ message: 'Error updating questionnaire', error: err.message });
  }
});

// Delete a questionnaire
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    
    // Build query based on ID type
    let query;
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { $or: [{ _id: id }, { questionaireId: parseInt(id) || id }] };
    } else {
      // If not a valid ObjectId, only search by questionaireId
      const numericId = parseInt(id);
      query = { questionaireId: isNaN(numericId) ? id : numericId };
    }
    
    // Check if questionnaire exists
    const questionnaire = await Questionnaire.findOne(query);
    
    if (!questionnaire) {
      return res.status(404).json({ message: 'Questionnaire not found' });
    }
    
    // Check if there are any answers associated with this questionnaire
    const QuestionnaireAnswer = require('../models/QuestionnaireAnswer');
    const relatedAnswers = await QuestionnaireAnswer.find({ questionnaireId: questionnaire._id });
    
    // Implement cascade deletion - delete all related answers first
    if (relatedAnswers.length > 0) {
      console.log(`Deleting ${relatedAnswers.length} related answers for questionnaire ${questionnaire._id}`);
      await QuestionnaireAnswer.deleteMany({ questionnaireId: questionnaire._id });
    }
    
    // Delete the questionnaire using findOneAndDelete with our query
    const deletedQuestionnaire = await Questionnaire.findOneAndDelete(query);
    
    res.json({ 
      message: 'Questionnaire deleted successfully', 
      deletedAnswersCount: relatedAnswers.length 
    });
  } catch (err) {
    console.error('Error deleting questionnaire:', err);
    res.status(500).json({ message: 'Error deleting questionnaire', error: err.message });
  }
});

module.exports = router;