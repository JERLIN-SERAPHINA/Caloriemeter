// routes/vitaminSideEffectsRoutes.js
const express = require('express');
const router = express.Router();

// Sample data for vitamin side effects (Ideally, fetch from a database or external source)
const sideEffects = [
    {
        vitamin: "Vitamin A",
        symptoms: "Dry skin, hair loss, fatigue, and blurred vision.",
        role: "Essential for vision, immune function, and skin health."
    },
    {
        vitamin: "Vitamin B1 (Thiamine)",
        symptoms: "Fatigue, irritability, reduced reflexes, and memory problems.",
        role: "Helps convert carbohydrates into energy and is crucial for nerve function."
    },
    {
        vitamin: "Vitamin B2 (Riboflavin)",
        symptoms: "Sore throat, redness and swelling of the lining of the mouth and throat.",
        role: "Important for energy production and the metabolism of fats, drugs, and steroids."
    },
    {
        vitamin: "Vitamin B3 (Niacin)",
        symptoms: "Skin rash, itching, and digestive upset.",
        role: "Supports metabolism and is essential for DNA repair."
    },
    {
        vitamin: "Vitamin B5 (Pantothenic Acid)",
        symptoms: "Fatigue, irritability, and decreased immunity.",
        role: "Involved in the synthesis of coenzyme A, important for fatty acid metabolism."
    },
    {
        vitamin: "Vitamin B6 (Pyridoxine)",
        symptoms: "Depression, confusion, and changes in mood.",
        role: "Involved in amino acid metabolism and the production of neurotransmitters."
    },
    {
        vitamin: "Vitamin B7 (Biotin)",
        symptoms: "Hair thinning, skin rash, and brittle nails.",
        role: "Important for fat metabolism and maintaining healthy hair and skin."
    },
    {
        vitamin: "Vitamin B9 (Folate)",
        symptoms: "Fatigue, gray hair, mouth sores, and poor growth.",
        role: "Essential for DNA synthesis and repair, and red blood cell formation."
    },
    {
        vitamin: "Vitamin B12 (Cobalamin)",
        symptoms: "Weakness, tiredness, shortness of breath, and nerve problems.",
        role: "Essential for nerve function, red blood cell production, and DNA synthesis."
    },
    {
        vitamin: "Vitamin C",
        symptoms: "Bleeding gums, dry skin, fatigue, and slow wound healing.",
        role: "Aids in collagen production, immune support, and iron absorption."
    },
    {
        vitamin: "Vitamin D",
        symptoms: "Fatigue, muscle weakness, bone pain, and mood changes.",
        role: "Supports bone health, immune function, and mental health."
    },
    {
        vitamin: "Vitamin E",
        symptoms: "Vision problems, muscle weakness, and immune issues.",
        role: "Acts as an antioxidant and is important for immune function."
    },
    {
        vitamin: "Vitamin K",
        symptoms: "Easy bruising, excessive bleeding, and blood clotting issues.",
        role: "Essential for blood clotting and bone health."
    },
    {
        vitamin: "Vitamin H (Biotin)", // Vitamin H is Biotin, corrected to Vitamin B7 (Biotin) to avoid confusion as Vitamin H is an older nomenclature.
        symptoms: "Hair loss, skin rash, and neurological symptoms.",
        role: "Crucial for metabolism of fatty acids, amino acids, and glucose."
    },
];


// Route to get side effects
router.get('/', (req, res) => {
    res.json(sideEffects);
});

module.exports = router;