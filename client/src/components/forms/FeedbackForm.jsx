import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    userId: "",
    username: "",
    email: "",
    experienceRating: "",
    satisfactionRating: "",
    usefulFeedback: "",
    improvementSuggestions: "",
    recommendation: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const feedbackData = location.state?.feedbackData;

  useEffect(() => {
    if (feedbackData) {
      setFormData(feedbackData);
    }
  }, [feedbackData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.userId.match(/^[a-zA-Z0-9]+$/)) {
      errors.userId = "User ID can only contain letters and numbers.";
    }
    if (
      formData.username.length < 5 ||
      !formData.username.match(/^[a-zA-Z0-9,@,#,$,%]+$/)
    ) {
      errors.username =
        "Username must be at least 5 characters and can include letters, numbers, and symbols (@, #, $, %).";
    }
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
      errors.email = "Please enter a valid email address.";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      const apiEndpoint = feedbackData
        ? `http://localhost:3001/api/feedback/updateFeedback/${feedbackData._id}`
        : "http://localhost:3001/api/feedback/submitFeedback";
      const apiMethod = feedbackData ? axios.put : axios.post;

      apiMethod(apiEndpoint, formData)
        .then(() => {
          alert(
            feedbackData
              ? "Feedback Updated Successfully!"
              : "Feedback Submitted Successfully!"
          );
          navigate("/feedbackdisplay");
        })
        .catch((error) => {
          if (error.response && error.response.data.errors) {
            setFormErrors(error.response.data.errors);
          } else {
            console.error("There was an error submitting the feedback!", error);
          }
        });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-800 p-8 mt-10 mx-auto text-white rounded-lg shadow-lg max-w-lg">
        <h2 className="text-2xl font-bold text-center text-green-400 mb-4">
          {feedbackData ? "Edit Feedback" : "Submit Feedback"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="userId" className="block text-white">
              User ID:
            </label>
            <input
              type="text"
              id="userId"
              value={formData.userId}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            {formErrors.userId && (
              <p className="text-red-500 text-sm">{formErrors.userId}</p>
            )}
          </div>
          <div>
            <label htmlFor="username" className="block text-white">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            {formErrors.username && (
              <p className="text-red-500 text-sm">{formErrors.username}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-white">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="experienceRating" className="block text-white">
              Experience Rating:
            </label>
            <input
              type="number"
              id="experienceRating"
              value={formData.experienceRating}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div>
            <label htmlFor="satisfactionRating" className="block text-white">
              Satisfaction Rating:
            </label>
            <input
              type="number"
              id="satisfactionRating"
              value={formData.satisfactionRating}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div>
            <label htmlFor="usefulFeedback" className="block text-white">
              Most Useful Aspect:
            </label>
            <input
              type="text"
              id="usefulFeedback"
              value={formData.usefulFeedback}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div>
            <label htmlFor="improvementSuggestions" className="block text-white">
              Suggestions for Improvement:
            </label>
            <textarea
              id="improvementSuggestions"
              value={formData.improvementSuggestions}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div>
            <label htmlFor="recommendation" className="block text-white">
              Recommendation:
            </label>
            <input
              type="text"
              id="recommendation"
              value={formData.recommendation}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            {feedbackData ? "Update Feedback" : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
