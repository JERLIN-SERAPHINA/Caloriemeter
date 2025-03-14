import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../../assets/l.png';

const QuizResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, questions, answers } = location.state || {};

  if (!score && !questions && !answers) {
    navigate('/quiz');
    return null;
  }

  const percentage = (score / questions.length) * 100;

  return (
    <>
    <nav className="bg-white shadow-md sticky top-0 z-10 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="VitaGuide Logo" className="h-10 mr-3" />
            <span className="text-2xl font-bold text-gray-800">VitaGuide</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/home" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600 font-medium">Services</Link>
            <Link to="/profile" className="text-gray-700 hover:text-blue-600 font-medium">Profile</Link>
          </div>
          
        </div>
      </nav>
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Quiz Results</h2>
        
        <div className="mb-8 text-center">
          <div className="text-4xl font-bold mb-2">
            {score} / {questions.length}
          </div>
          <div className={`text-xl ${
            percentage >= 80 ? 'text-green-500' : 
            percentage >= 60 ? 'text-yellow-500' : 
            'text-red-500'
          }`}>
            {percentage}% Correct
          </div>
        </div>

        <div className="space-y-6 mb-8">
          {questions.map((question, index) => (
            <div key={index} className="p-4 bg-gray-700 rounded-lg">
              <p className="text-lg font-semibold mb-2">{question.question}</p>
              <div className="space-y-2">
                <p className={`${
                  answers[index] === question.correctAnswer 
                    ? 'text-green-500' 
                    : 'text-red-500'
                }`}>
                  Your Answer: {answers[index] || 'No Answer'}
                </p>
                {answers[index] !== question.correctAnswer && (
                  <p className="text-green-500">
                    Correct Answer: {question.correctAnswer}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate('/quiz')}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md font-bold transition duration-200 ease-in-out"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/home')}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md font-bold transition duration-200 ease-in-out"
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default QuizResultsPage;
