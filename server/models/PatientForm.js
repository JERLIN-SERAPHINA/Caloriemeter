// models/PatientForm.js
const mongoose = require("mongoose");

const PatientFormSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  height: Number,
  weight: Number,
  birthWeight: Number,
  fullTerm: String,
  deliveryMode: String,
  babyCryAfterDelivery: String,
  postNatalComplications: String,
  vaccinations: String,
  milestones: Object,
  bowelMovement: String,
  sleepPattern: String,
  eatingHabit: String,
  skinCondition: String,
  visionHealth: String,
  foodPreferences: String,
  foodAllergy: Object,
  foodRefusal: String,
  frequentInfections: String,
  parentConcerns: String,
  familyHistory: String,
  contactDetails: Object,
});

module.exports = mongoose.model("PatientForm", PatientFormSchema);