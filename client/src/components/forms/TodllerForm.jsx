import React, { useState } from "react";
import Progress from "../../ui/progress";
import Button from "../../ui/button";
import axios from "axios";
import questionGroups from "../../data/questions";
import img from "../../assets/imageback.jpg";

const totalSteps = questionGroups.length;

const TodllerForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [vaccinationradio, setVaccinationRadio] = useState("No");
  const [formData, setFormData] = useState(
    questionGroups.flat().reduce((acc, q) => ({ ...acc, [q.name]: "" }), {})
  );
  const [error, setError] = useState("");
  const [vaccinationFile, setVaccinationFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    const currentQuestions = questionGroups[currentStep];
    for (let q of currentQuestions) {
      if (!formData[q.name].trim()) {
        setError("Please fill out all fields!");
        return;
      }
    }
    setError("");
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleVaccinationChange = (e) => {
    setVaccinationRadio(e.target.value);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => setVaccinationFile(e.target.files[0]);

  const handleSubmit = async () => {
    const currentQuestions = questionGroups[currentStep];
    for (let q of currentQuestions) {
      if (!formData[q.name].trim()) {
        setError("Please fill out all fields!");
        return;
      }
    }

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      submitData.append(key, value)
    );
    if (vaccinationFile) submitData.append("vaccinationFile", vaccinationFile);

    try {
      await axios.post("http://localhost:3001/api/form/submit", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="max-w-lg w-full p-8 bg-white bg-opacity-50 border border-gray-200 shadow-lg rounded-lg">
        <Progress value={(currentStep / totalSteps) * 100} className="mb-6" />
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        {questionGroups[currentStep].map((q) => (
          <div key={q.name} className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              {q.label}
            </h2>
            {q.type === "radio" ? (
              q.name !== "vaccinations" ? (
                q.options.map((option) => (
                  <label
                    key={option}
                    className="block flex items-center gap-3 bg-gray-50 p-3 rounded-lg mb-2 hover:bg-gray-100 transition"
                  >
                    <input
                      type="radio"
                      name={q.name}
                      value={option}
                      checked={formData[q.name] === option}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))
              ) : (
                <>
                  {q.options.map((option) => (
                    <label
                      key={option}
                      className="block flex items-center gap-3 bg-gray-50 p-3 rounded-lg mb-2 hover:bg-gray-100 transition"
                    >
                      <input
                        type="radio"
                        name={q.name}
                        value={option}
                        checked={vaccinationradio === option}
                        onChange={handleVaccinationChange}
                        className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                  {vaccinationradio === "Yes" && (
                    <div className="mt-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Upload Vaccination Proof:
                      </label>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
                      />
                    </div>
                  )}
                </>
              )
            ) : (
              <input
                type={q.type}
                name={q.name}
                value={formData[q.name]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:outline-none transition bg-white shadow-sm"
              />
            )}
          </div>
        ))}

        <div className="mt-8 flex justify-between">
          {currentStep > 0 && (
            <Button
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg transition shadow-sm"
              onClick={handleBack}
            >
              Back
            </Button>
          )}
          {currentStep < totalSteps - 1 ? (
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition shadow-sm"
              onClick={handleNext}
            >
              Next
            </Button>
          ) : (
            <Button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg transition shadow-sm"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodllerForm;
