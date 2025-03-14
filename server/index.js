// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

// Import Models
const EmployeeModel = require("./models/Employee");
const Symptom = require("./models/Symptom");
const DietPlan = require("./models/DietPlan");
const PatientForm = require("./models/PatientForm"); // Renamed Form -> PatientForm
const Feedback = require("./models/Feedback");
const PersonalDetail = require("./models/PersonalDetail"); // Renamed PersonalDetailsModel -> PersonalDetail
const QuestionnaireModel = require("./models/Questionnaire");
const QuestionnaireAnswerModel = require("./models/QuestionnaireAnswer");

// Import Routes
const feedbackRoutes = require("./routes/feedbackRoutes");
const vitaminRoutes = require("./routes/vitaminsRoutes"); // Example routes
const vitaminInfoRoutes = require("./routes/vitaminInfoRoutes");
const vitaminSideEffectsRoutes = require("./routes/vitaminSideEffectsRoutes");
const symptomsRoutes = require("./routes/symptomsRoutes");
const personalDetailsRoutes = require("./routes/personalDetailsRoutes");
const patientFormRoutes = require("./routes/patientFormRoutes"); // Renamed formRoutes -> patientFormRoutes
const dietPlanRoutes = require("./routes/dietPlanRoutes");
const questionnaireRoutes = require("./routes/questionnaireRoutes");
const questionnaireAnswerRoutes = require("./routes/questionnaireAnswerRoutes");


const { generateToken, verifyToken } = require("./utils/jwthelper");
const { generateOTP, sendEmail } = require("./utils/emailService");
const nodemailer = require("nodemailer"); // Import nodemailer for email functionality


const app = express();

// Middleware to log requests
app.use((req, res, next) => {
  // Advanced middleware to log request details

  console.log(`${req.method} request for '${req.url}'`);

  next();
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser());

const otpStorage = {};
const OTP_EXPIRY_TIME_MS = 5 * 60 * 1000;

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/vitaguide") // Replace with your MongoDB connection string
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// --- Authentication Routes ---
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login request for email:", email);
    const user = await EmployeeModel.findOne({ email });
    console.log("Result of EmployeeModel.findOne:", user);

    if (!user) {
      console.log("User not found for email:", email);
      return res.status(404).json({ error: "No record existed for this email." });
    }
    if (user.password !== password) {
      console.log("Incorrect password for email:", email);
      return res.status(401).json({ error: "The password is incorrect." });
    }

    // **Directly generate JWT token upon successful email/password login:**
    const token = generateToken(user._id, user.email);
    const userData = { _id: user._id, email: user.email };

    console.log("Login successful for email:", email, "Token generated."); // Log successful login
    res.status(200).json({ message: "Login successful", token, user: userData }); // Send token directly

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { email } = req.body;
    const existingEmployee = await EmployeeModel.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const otp = generateOTP();
    otpStorage[email] = {
      otp,
      expiry: Date.now() + OTP_EXPIRY_TIME_MS
    };

    const emailSubject = "VitaGuide - Verify Your Email";
    const emailText = `Your OTP for email verification is: ${otp}. This OTP will expire in 5 minutes.`;

    await sendEmail(email, emailSubject, emailText);

    res.status(200).json({ message: "Registration initiated. OTP sent to email for verification.", email }); // Send email back to front-end for OTP verification step
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Failed to initiate registration. Please try again." });
  }
});


app.post("/api/verify-otp", async (req, res) => {
  const { email, otp, name, password } = req.body; // Expect name and password now

  if (!otpStorage[email]) {
    return res.status(400).json({ error: "OTP not generated or expired. Please try again." });
  }

  const storedOTPData = otpStorage[email];

  if (Date.now() > storedOTPData.expiry) {
    delete otpStorage[email];
    return res.status(400).json({ error: "OTP expired. Please request a new OTP." });
  }

  if (otp === storedOTPData.otp) {
    delete otpStorage[email];

    // **Create User Account here after OTP verification:**
    try {
      const newEmployee = await EmployeeModel.create({ name, email, password }); // Create user
      const token = generateToken(newEmployee._id, newEmployee.email);
      const userData = { _id: newEmployee._id, email: newEmployee.email };
      return res.status(201).json({ message: "Registration successful and email verified. Login successful!", token, user: userData }); // 201 for successful resource creation
    } catch (dbError) {
      console.error("Database error during user creation:", dbError);
      return res.status(500).json({ error: "Failed to create user account.", details: dbError.message });
    }

  } else {
    return res.status(401).json({ error: "Invalid OTP. Please try again." });
  }
});
// --- API Routes ---
app.use("/api/feedback", feedbackRoutes);
app.use("/api/vitamins-example", vitaminRoutes); // Example vitamin routes
app.use("/api/vitamin-info", vitaminInfoRoutes);
app.use("/api/vitamin-side-effects", vitaminSideEffectsRoutes);
app.use("/api/symptoms", symptomsRoutes);
app.use("/api/personal-details", personalDetailsRoutes);
app.use("/api/patient-form", patientFormRoutes); // Renamed formRoutes -> patientFormRoutes
app.use("/api/diet-plan", dietPlanRoutes);
app.use("/api/questionnaires", questionnaireRoutes);
app.use("/api/questionnaire-answers", questionnaireAnswerRoutes);


// --- Symptom Prediction and Diet Plan Generation (Example - move to appropriate route if needed) ---

// GET endpoint to fetch symptoms (example) - Keeping this route as it was, assuming it's used.
app.get("/api/symptoms", async (req, res) => {
  try {
    const symptoms = await Symptom.find({});
    res.json(symptoms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST endpoint to handle symptom submissions and predict deficiencies - Keeping this route as it was, assuming it's used.
app.post("/api/symptoms", async (req, res) => {
  try {
    const symptomData = new Symptom(req.body);
    await symptomData.save();

    const deficiencyPrediction = predictDeficiency(req.body.signsSymptoms);

    res.status(201).json({
      message: "Data saved successfully",
      deficiencies: deficiencyPrediction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save data", details: error.message });
  }
});

// Function to predict deficiency based on symptoms (from your code) - Keeping this function as it was, assuming it's used.
const predictDeficiency = (symptoms) => {
  const deficiencies = [];

  if (
    symptoms.fatigue ||
    symptoms.paleSkin ||
    symptoms.paleConjunctiva ||
    symptoms.frequentBruising ||
    symptoms.restlessLegsSyndrome
  ) {
    deficiencies.push("Iron Deficiency");
  }

  if (
    symptoms.drySkin ||
    symptoms.hairLoss ||
    symptoms.brittleNails ||
    symptoms.frequentHeadaches ||
    symptoms.jointPain
  ) {
    deficiencies.push("Vitamin D Deficiency");
  }

  if (
    symptoms.moodChanges ||
    symptoms.poorAppetite ||
    symptoms.frequentColds ||
    symptoms.swollenGums
  ) {
    deficiencies.push("Vitamin B12 Deficiency");
  }

  if (
    symptoms.slowGrowth ||
    symptoms.noWeightGain ||
    symptoms.delayedWalking ||
    symptoms.sensitivityToLight
  ) {
    deficiencies.push("Vitamin A Deficiency");
  }

  if (symptoms.diarrhea || symptoms.constipation || symptoms.skinRashes) {
    deficiencies.push("Fiber Deficiency");
  }

  if (symptoms.lowAttentionSpan || symptoms.squinting || symptoms.jointPain) {
    deficiencies.push("Omega-3 Fatty Acids Deficiency");
  }

  if (symptoms.muscleCramps || symptoms.insomnia) {
    deficiencies.push("Magnesium Deficiency");
  }

  return deficiencies.length
    ? deficiencies
    : ["No specific deficiency detected"];
};


// POST endpoint for diet plan - Keeping this route as it was, assuming it's used.
app.post("/api/diet-plan", async (req, res) => {
  try {
    const dietData = new DietPlan(req.body);
    await dietData.save();
    const generatedPlan = generateDietPlan(req.body.vitaminDeficiency); // You need to implement generateDietPlan

    res.status(201).json({
      message: "Diet data saved successfully",
      dietPlan: generatedPlan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save diet data", details: error.message });
  }
});

// Function to generate diet plan (Placeholder - you need to implement this logic) - Keeping this placeholder function as it was.
const generateDietPlan = (vitaminDeficiency) => {
  // Replace with your actual diet plan generation logic based on vitamin deficiency
  return {
    planDetails: `Diet plan for ${vitaminDeficiency} will be generated here.`,
    recommendations: ["Eat more foods rich in...", "Consider supplements if needed..."]
  };
};


// --- Email Sending Example (Move to appropriate route if needed) --- - Keeping this route as it was, assuming it's used for testing.
app.post("/send-email", (req, res) => {
  const { email } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jishnum2017123@gmail.com", // Your Gmail - consider environment variables
      pass: "bxfyujamjxlqnwbe",         // Your Gmail password/App Password - consider environment variables
    },
  });

  const mailOptions = {
    from: "jishnum2017123@gmail.com",
    to: email,
    subject: "Hello from VitaGuide",
    text: "Diet Plan", // Or use HTML for richer content
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email send error:", error);
      return res.status(500).json({ message: "Error sending email" });
    } else {
      console.log("Email sent:", info.response);
      return res.status(200).json({ message: "Email sent successfully!" });
    }
  });
});


// --- Global Error Handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// --- Start Server ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));