const mongoose = require('mongoose');

const QuestionnaireAnswerSchema = new mongoose.Schema({
  questionnaireId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Questionnaire',
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  submissionDate: {
    type: Date,
    default: Date.now
  },
  answers: [{
    questionId: String,
    questionIndex: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    question: {  // This is the expected field name!
      type: String,
      required: true
    },
    questionType: String,
    answer: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    isFollowUp: Boolean,
    parentQuestionIndex: Number,
    parentQuestionId: String
  }]
});

module.exports = mongoose.model('QuestionnaireAnswer', QuestionnaireAnswerSchema);