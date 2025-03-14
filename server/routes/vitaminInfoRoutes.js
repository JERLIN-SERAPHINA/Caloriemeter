// routes/vitaminInfoRoutes.js
const express = require('express');
const router = express.Router();

// Sample vitamin data (Ideally, fetch from a database or external source)
const vitaminsInfo = [
    {
        name: "Vitamin A",
        benefits: "Supports vision, immune function, and skin health.",
        sources: "Carrots, sweet potatoes, spinach, and dairy products.",
        rda: "900 mcg for men, 700 mcg for women."
    },
    {
        name: "Vitamin C",
        benefits: "Important for immune function and skin health.",
        sources: "Citrus fruits, strawberries, bell peppers, and broccoli.",
        rda: "90 mg for men, 75 mg for women."
    },
    {
        name: "Vitamin D",
        benefits: "Essential for bone health and immune function.",
        sources: "Fatty fish, fortified dairy products, and sunlight.",
        rda: "600 IU for adults."
    },
    {
        name: "Vitamin E",
        benefits: "Acts as an antioxidant and supports immune function.",
        sources: "Nuts, seeds, and green leafy vegetables.",
        rda: "15 mg for adults."
    },
    {
        name: "Vitamin K",
        benefits: "Important for blood clotting and bone health.",
        sources: "Green leafy vegetables, fish, meat, and dairy.",
        rda: "120 mcg for men, 90 mcg for women."
    },
    {
        name: "Vitamin B1 (Thiamine)",
        benefits: "Helps convert carbohydrates into energy.",
        sources: "Whole grains, meat, and fish.",
        rda: "1.2 mg for men, 1.1 mg for women."
    },
    {
        name: "Vitamin B2 (Riboflavin)",
        benefits: "Important for energy production and cellular function.",
        sources: "Eggs, green leafy vegetables, and milk.",
        rda: "1.3 mg for men, 1.1 mg for women."
    },
    {
        name: "Vitamin B3 (Niacin)",
        benefits: "Supports metabolism and helps improve cholesterol levels.",
        sources: "Meat, fish, and whole grains.",
        rda: "16 mg for men, 14 mg for women."
    },
    {
        name: "Vitamin B5 (Pantothenic Acid)",
        benefits: "Essential for the synthesis of coenzyme A.",
        sources: "Chicken, beef, potatoes, and oats.",
        rda: "5 mg for adults."
    },
    {
        name: "Vitamin B6 (Pyridoxine)",
        benefits: "Important for protein metabolism and cognitive development.",
        sources: "Fish, beef liver, potatoes, and non-citrus fruits.",
        rda: "1.3 mg for adults."
    },
    {
        name: "Vitamin B7 (Biotin)",
        benefits: "Supports healthy metabolism of fats, carbohydrates, and proteins.",
        sources: "Egg yolk, nuts, and legumes.",
        rda: "30 mcg for adults."
    },
    {
        name: "Vitamin B9 (Folate)",
        benefits: "Essential for DNA synthesis and repair, and cell division.",
        sources: "Leafy greens, legumes, and seeds.",
        rda: "400 mcg for adults."
    },
    {
        name: "Vitamin B12 (Cobalamin)",
        benefits: "Important for nerve function and red blood cell production.",
        sources: "Meat, fish, dairy products, and fortified cereals.",
        rda: "2.4 mcg for adults."
    },
];

router.get('/', (req, res) => {
    res.json(vitaminsInfo);
});

module.exports = router;