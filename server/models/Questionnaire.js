const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { QuestionSchema } = require('./schemas/QuestionnaireSchema');

// Main questionnaire schema
const QuestionnaireSchema = new Schema({
  questionaireId: {
    type: Number,
    required: [true, 'Questionnaire ID is required'],
    unique: true
  },
  questionaireName: {
    type: String,
    required: [true, 'Questionnaire name is required']
  },
  questions: [QuestionSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Questionnaire', QuestionnaireSchema);