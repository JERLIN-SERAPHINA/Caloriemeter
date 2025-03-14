const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * This file contains schema definitions for questionnaire-related models
 * Separated for better organization and reuse
 */

// Schema for options (used in both regular and follow-up questions)
const OptionSchema = new Schema({
  option: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['radio', 'checkbox', 'radio|text'],
    default: 'radio'
  }
});

// Schema for follow-up questions
const FollowUpQuestionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['text', 'number', 'radio', 'checkbox', 'radio|text']
  },
  triggerAnswer: {
    type: String,
    required: true
  },
  options: [OptionSchema]
});

// Schema for sub-questions (used in group questions)
const SubQuestionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['text', 'number']
  }
});

// Schema for main questions
const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['text', 'number', 'radio', 'checkbox', 'radio|text', 'group']
  },
  options: [OptionSchema],
  // For backward compatibility, define the followUpQuestion as a nested schema without 'required: false'
  followUpQuestion: {
    question: String,
    type: {
      type: String,
      enum: ['text', 'number', 'radio', 'checkbox', 'radio|text']
    },
    triggerAnswer: String,
    options: [OptionSchema]
  },
  // New field for multiple follow-up questions
  followUpQuestions: [FollowUpQuestionSchema],
  questions: [SubQuestionSchema] // For group type questions
});

module.exports = {
  OptionSchema,
  FollowUpQuestionSchema,
  SubQuestionSchema,
  QuestionSchema
};
