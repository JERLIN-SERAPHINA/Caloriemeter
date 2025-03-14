// models/Symptom.js
const mongoose = require('mongoose');

const SymptomSchema = new mongoose.Schema({
    ageGroup: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    signsSymptoms: { type: Object, required: true },
    dentalIssues: { type: String, required: true },
    bloodTest: { type: String, required: true },
});

module.exports = mongoose.model('Symptom', SymptomSchema);