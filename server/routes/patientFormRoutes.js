// routes/patientFormRoutes.js
const express = require("express");
const PatientForm = require("../models/PatientForm");
const multer = require("multer");
const path = require('path');
const sendEmail = require("../utils/emailService");
const questions = require("../models/questions.js"); // Assuming questions.js is in model folder

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = "uploads/";
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});
const upload = multer({ storage: storage });

// Route to get the questionnaire dynamically
router.get("/questions", (req, res) => {
    res.json(questions);
});

router.post(
    "/submitVaccinationFile",
    upload.single("file"),
    async (req, res) => {
        console.log("Submit Vaccination File", req.file);
        // Handle file upload logic here
        res.status(200).json({ message: "File uploaded successfully!" }); // Example response
    }
);

router.post("/submit", async (req, res) => {
    try {
        const newForm = new PatientForm(req.body.submitData);
        console.log(req.body);
        await newForm.save();

        // Email sending logic - commented out as per original code
        // const adminEmail = "admin@example.com";
        // await sendEmail(adminEmail, "New Form Submission", JSON.stringify(req.body, null, 2));
        // await sendEmail(req.body.contactDetails.email, "Thank You for Your Submission", "Thank you for filling out the form. We will contact you soon.");

        res.status(201).json({ message: "Form submitted successfully and emails sent" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/responses", async (req, res) => {
    try {
        const responses = await PatientForm.find();
        res.status(200).json(responses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;