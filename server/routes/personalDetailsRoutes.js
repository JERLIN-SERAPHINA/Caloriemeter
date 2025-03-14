// routes/personalDetailsRoutes.js
const express = require("express");
const router = express.Router();
const PersonalDetail = require("../models/PersonalDetail");
const EmployeeModel = require("../models/Employee"); // Import EmployeeModel to fetch user details
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

router.post("/", upload.single('image'), async (req, res) => {
    try {
        const existingUser = await PersonalDetail.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).json({ message: `Username '${req.body.username}' already exists.` });
        }
        const existingEmail = await PersonalDetail.findOne({ email: req.body.email });
        if (existingEmail) {
            return res.status(400).json({ message: `Email '${req.body.email}' is already registered.` });
        }

        const personalDetails = new PersonalDetail({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            dob: req.body.dob,
            gender: req.body.gender,
            pinCode: req.body.pinCode,
            city: req.body.city,
            state: req.body.state,
            phoneNumber: req.body.phoneNumber,
            anotherPhone: req.body.anotherPhone,
            image: req.file.path
        });

        await personalDetails.save();
        res.status(201).json({ message: "Personal details saved successfully!" });
    } catch (error) {
        console.error("Error saving personal details:", error);
        res.status(500).json({ error: error.message });
    }
});

// Route to fetch personal details by userId
router.get("/", async (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const userDetails = await EmployeeModel.findById(userId); // Fetching from EmployeeModel as per prompt. Consider if PersonalDetail should be linked to Employee and fetched instead.
        if (userDetails) {
            res.json(userDetails);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;