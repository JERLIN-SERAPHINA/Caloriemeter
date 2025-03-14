// models/DietPlan.js
const mongoose = require('mongoose');

const DietPlanSchema = new mongoose.Schema({
    vitaminDeficiency: { type: String, required: true },
    foodFrequency: {
        fruits: { type: String, required: true },
        vegetables: { type: String, required: true },
        dairy: { type: String, required: true },
        meat: { type: String, required: true },
        fish: { type: String, required: true },
        eggs: { type: String, required: true },
    },
    favoriteFood: String,
    packagedFood: String,
    sweetsPreference: String,
    mealsPerDay: String,
    variedDiet: String,
    waterIntake: String,
    foodIntolerances: String,
    foodRefusal: String,
    parentalConcerns: String,
    changesInHabits: String,
    vitamins: String,
}, { timestamps: true });

module.exports = mongoose.model('DietPlan', DietPlanSchema);