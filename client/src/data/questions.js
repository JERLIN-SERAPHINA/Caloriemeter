const questions = [
  [
    {
      id: 1,
      type: "text",
      label: "Name of the child",
      name: "name", // Matches schema
    },
    {
      id: 2,
      type: "number",
      label: "Age of the child (in months)",
      name: "age", // Matches schema
    },
    {
      id: 3,
      type: "radio",
      label: "Gender",
      name: "gender", // Matches schema
      options: ["Male", "Female", "Other"],
    },
  ],
  [
    {
      id: 4,
      type: "number",
      label: "Height (in cms)",
      name: "height", // Matches schema
    },
    {
      id: 5,
      type: "number",
      label: "Weight (in kgs)",
      name: "weight", // Matches schema
    },
    {
      id: 6,
      type: "number",
      label: "Birth weight of the child",
      name: "birthWeight", // Matches schema
    },
  ],
  [
    {
      id: 7,
      type: "radio",
      label: "Baby delivered after full term? Or pre-term?",
      name: "fullTerm", // Matches schema
      options: ["Full Term", "Pre-Term"],
    },
    {
      id: 8,
      type: "radio",
      label: "Mode of delivery",
      name: "deliveryMode", // Matches schema
      options: ["Vaginal delivery", "C-Section", "Others"],
    },
    {
      id: 9,
      type: "radio",
      label: "Did the baby cry soon after delivery?",
      name: "babyCryAfterDelivery", // Matches schema
      options: ["Yes", "No"],
    },
  ],
  [
    {
      id: 10,
      type: "text",
      label: "Any complications post-natal?",
      name: "postNatalComplications", // Matches schema
    },
    {
      id: 11,
      type: "radio",
      label: "What vaccinations done?",
      name: "vaccinations", // Matches schema
      options: ["Yes", "No"],
    },
    {
      id: 12,
      type: "text",
      label: "Developmental milestones (response time in months)",
      name: "milestones", // Matches schema
    },
  ],
  [
    {
      id: 13,
      type: "radio",
      label: "Bowel movement",
      name: "bowelMovement", // Matches schema
      options: [
        "Poops twice daily without difficulty",
        "Poops once a day without difficulty",
        "Poops once a day but has difficulty (hard stools, constipation)",
        "Poops after every solid feed",
        "Has constipation more than twice a week",
        "Has constipation while/after travel",
        "Has constipation after any medication",
      ],
    },
  ],
  [
    {
      id: 14,
      type: "radio",
      label: "Baby's sleep pattern",
      name: "sleepPattern", // Matches schema
      options: [
        "Sleeps undisturbed and at the same time mostly",
        "Difficult to fall asleep but sleeps at the same time",
        "Has disturbed sleep",
        "Cries in the middle of sleep but goes back to sleep",
        "Sleeping time is progressively reduced and playful",
        "Cranky before sleeping",
      ],
    },
  ],
  [
    {
      id: 15,
      type: "radio",
      label: "Eating habits",
      name: "eatingHabit", // Matches schema
      options: [
        "Shows excitement when seeing food",
        "Happy to be fed with talking/storytelling",
        "Self-feeds whenever hungry",
        "Refuses to eat unless distracted",
      ],
    },
    {
      id: 16,
      type: "radio",
      label: "Skin condition",
      name: "skinCondition", // Matches schema
      options: ["Soft and smooth", "Dry and rashes", "Sensitive skin"],
    },
  ],
  [
    {
      id: 17,
      type: "radio",
      label: "Vision health",
      name: "visionHealth", // Matches schema
      options: [
        "Looks normal and makes direct eye contact",
        "Squints sometimes at long distances",
        "Does not squint but looks only at long distances",
        "Looks far and near, makes eye contact, and follows bright/moving objects",
      ],
    },
  ],
  [
    {
      id: 18,
      type: "text",
      label: "Any food preferences?",
      name: "foodPreferences", // Matches schema
    },
    {
      id: 19,
      type: "text",
      label:
        "Any food allergies? If yes, what food causes allergy and what are the reactions?",
      name: "foodAllergy", // Matches schema
    },
  ],
  [
    {
      id: 20,
      type: "text",
      label: "Does the child refuse to eat any food? Mention the food items.",
      name: "foodRefusal", // Matches schema
    },
    {
      id: 21,
      type: "text",
      label:
        "Does the child have frequent infections? How often are antibiotics given?",
      name: "frequentInfections", // Matches schema
    },
  ],
  [
    {
      id: 22,
      type: "text",
      label: "Any specific concerns about the baby?",
      name: "parentConcerns", // Matches schema
    },
    {
      id: 23,
      type: "text",
      label: "Any family history of health challenges or additional abilities?",
      name: "familyHistory", // Matches schema
    },
  ],
  [
    {
      id: 24,
      type: "text",
      label: "Parent's Name",
      name: "contactDetails.parentName", // Nested in contactDetails
    },
    {
      id: 25,
      type: "email",
      label: "Parent's Email",
      name: "contactDetails.parentEmail", // Nested in contactDetails
    },
    {
      id: 26,
      type: "tel",
      label: "Parent's Phone Number",
      name: "contactDetails.parentPhone", // Nested in contactDetails
    },
    {
      id: 27,
      type: "text",
      label: "City",
      name: "contactDetails.city", // Nested in contactDetails
    },
  ],
];

export default questions;
