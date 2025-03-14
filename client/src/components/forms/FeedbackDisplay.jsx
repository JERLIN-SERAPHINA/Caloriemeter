import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FeedbackDisplay = () => {
  const [feedbackEntries, setFeedbackEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeedbackEntries();
  }, []);

  const fetchFeedbackEntries = () => {
    axios
      .get("http://localhost:3001/api/feedback/getAllFeedback")
      .then((response) => {
        setFeedbackEntries(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching feedback entries:", error);
        setLoading(false);
      });
  };

  const handleEdit = (entry) => {
    navigate("/feedback", { state: { feedbackData: entry } });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/api/feedback/deleteFeedback/${id}`)
      .then(() => {
        setFeedbackEntries(feedbackEntries.filter((entry) => entry._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting feedback entry:", error);
      });
  };

  if (loading) return <p>Loading feedback...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center text-green-400 mb-4">
        Feedback Entries
      </h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto text-white">
        {feedbackEntries.map((entry) => (
          <div key={entry._id} className="border-b border-gray-600 mb-4 pb-4">
            <p><strong>User ID:</strong> {entry.userId}</p>
            <p><strong>Username:</strong> {entry.username}</p>
            <p><strong>Email:</strong> {entry.email}</p>
            <p><strong>Experience Rating:</strong> {entry.experienceRating}</p>
            <p><strong>Satisfaction Rating:</strong> {entry.satisfactionRating}</p>
            <p><strong>Most Useful Aspect:</strong> {entry.usefulFeedback}</p>
            <p><strong>Suggestions for Improvement:</strong> {entry.improvementSuggestions}</p>
            <p><strong>Recommendation:</strong> {entry.recommendation}</p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => handleEdit(entry)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(entry._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackDisplay;
