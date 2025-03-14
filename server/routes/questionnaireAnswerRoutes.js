const express = require('express');
const router = express.Router();
const QuestionnaireAnswer = require('../models/QuestionnaireAnswer');
const Questionnaire = require('../models/Questionnaire');
const mongoose = require('mongoose');

// Get all questionnaire answers
router.get('/', async (req, res) => {
  try {
    const answers = await QuestionnaireAnswer.find()
      .populate('questionnaireId')
      .sort({ createdAt: -1 });
    res.json(answers);
  } catch (err) {
    console.error('Error fetching questionnaire answers:', err);
    res.status(500).json({ message: 'Error fetching questionnaire answers', error: err.message });
  }
});

// Get a specific questionnaire answer by ID
router.get('/:id', async (req, res) => {
  try {
    const answer = await QuestionnaireAnswer.findById(req.params.id).populate('questionnaireId');
    
    if (!answer) {
      return res.status(404).json({ message: 'Questionnaire answer not found' });
    }
    
    res.json(answer);
  } catch (err) {
    console.error('Error fetching questionnaire answer:', err);
    res.status(500).json({ message: 'Error fetching questionnaire answer', error: err.message });
  }
});

// Get all answers for a specific questionnaire
router.get('/questionnaire/:questionnaireId', async (req, res) => {
  try {
    const questionnaireId = req.params.questionnaireId;
    let query = {};
    
    // First, find the questionnaire by its ID or questionaireId field
    let questionnaire;
    
    if (mongoose.Types.ObjectId.isValid(questionnaireId)) {
      // Try to find by MongoDB _id or questionaireId if it's a valid ObjectId
      questionnaire = await Questionnaire.findOne({
        $or: [
          { _id: questionnaireId },
          { questionaireId: parseInt(questionnaireId) || questionnaireId }
        ]
      });
    } else {
      // If not a valid ObjectId, search by questionaireId as string or number
      const numId = parseInt(questionnaireId);
      questionnaire = await Questionnaire.findOne({ 
        questionaireId: isNaN(numId) ? questionnaireId : numId 
      });
    }
    
    if (!questionnaire) {
      return res.status(404).json({ message: 'Questionnaire not found' });
    }
    
    // Now find all answers for this questionnaire
    const answers = await QuestionnaireAnswer.find({ questionnaireId: questionnaire._id })
      .populate('questionnaireId')
      .sort({ createdAt: -1 });
    
    res.json(answers);
  } catch (err) {
    console.error('Error fetching answers for questionnaire:', err);
    res.status(500).json({ 
      message: 'Error fetching answers for questionnaire', 
      error: err.message 
    });
  }
});

// Create a new questionnaire answer
router.post('/', async (req, res) => {
  try {
    const { questionnaireId, answers, respondentInfo, userId } = req.body;
    
    // Check if the referenced questionnaire exists
    const questionnaire = await Questionnaire.findById(questionnaireId);
    if (!questionnaire) {
      return res.status(404).json({ message: 'Questionnaire not found' });
    }
    
    const newAnswer = await QuestionnaireAnswer.create({
      questionnaireId,
      answers,
      respondentInfo,
      userId // Include userId in the document creation
    });
    
    res.status(201).json(newAnswer);
  } catch (err) {
    console.error('Error creating questionnaire answer:', err);
    
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({ message: 'Validation error', details: errors });
    }
    
    res.status(500).json({ message: 'Error creating questionnaire answer', error: err.message });
  }
});

module.exports = router;