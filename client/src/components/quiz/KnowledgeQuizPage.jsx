import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../../assets/l.png';

// Vitamin data structure with clear relationships
const vitaminData = [
  {
    name: "Vitamin A",
    sources: ["Carrots", "Sweet Potatoes", "Spinach"],
    functions: ["Vision health", "Immune system support", "Cell growth"],
    mainSource: "Carrots"
  },
  {
    name: "Vitamin C",
    sources: ["Oranges", "Strawberries", "Bell Peppers"],
    functions: ["Immune system support", "Collagen synthesis", "Antioxidant protection"],
    mainSource: "Oranges"
  },
  {
    name: "Vitamin D",
    sources: ["Sunlight exposure", "Fatty fish", "Egg yolks"],
    functions: ["Bone health", "Calcium absorption", "Immune system support"],
    mainSource: "Sunlight exposure"
  },
  {
    name: "Vitamin E",
    sources: ["Nuts", "Seeds", "Vegetable oils"],
    functions: ["Antioxidant protection", "Skin health", "Immune system support"],
    mainSource: "Nuts and seeds"
  },
  {
    name: "Vitamin K",
    sources: ["Broccoli", "Kale", "Spinach"],
    functions: ["Blood clotting", "Bone health", "Heart health"],
    mainSource: "Leafy greens"
  }
];

// Utility function to shuffle array
const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

// Function to generate questions with better context
const generateQuestions = (numberOfQuestions) => {
  const questionTypes = [
    {
      type: "source",
      template: (vitamin) => ({
        question: `Which vitamin is commonly found in ${vitamin.mainSource}?`,
        correctAnswer: vitamin.name,
        context: "food sources"
      })
    },
    {
      type: "function",
      template: (vitamin) => ({
        question: `Which vitamin is essential for ${vitamin.functions[0].toLowerCase()}?`,
        correctAnswer: vitamin.name,
        context: "vitamin functions"
      })
    },
    {
      type: "multiple-sources",
      template: (vitamin) => ({
        question: `Which vitamin can be found in ${vitamin.sources.slice(0, -1).join(", ")} and ${vitamin.sources.slice(-1)}?`,
        correctAnswer: vitamin.name,
        context: "food sources"
      })
    }
  ];

  const questions = [];
  const usedCombinations = new Set();

  while (questions.length < numberOfQuestions) {
    const vitamin = vitaminData[Math.floor(Math.random() * vitaminData.length)];
    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    const combinationKey = `${vitamin.name}-${questionType.type}`;
    if (usedCombinations.has(combinationKey)) continue;
    
    usedCombinations.add(combinationKey);
    
    const questionData = questionType.template(vitamin);
    questions.push({
      ...questionData,
      options: shuffleArray(vitaminData.map(v => v.name))
    });
  }

  return questions;
};

const KnowledgeQuizPage = () => {
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setQuestions(generateQuestions(10));
  }, []);

  const handleOptionChange = (e) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: e.target.value
    });
  };

  const handleNext = () => {
    if (answers[currentQuestionIndex] === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate('/quiz-results', {
        state: { 
          score: score + (answers[currentQuestionIndex] === questions[currentQuestionIndex].correctAnswer ? 1 : 0), 
          questions, 
          answers 
        }
      });
    }
  };

  if (questions.length === 0) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-xl">Loading quiz questions...</div>
    </div>
  );

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

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
        <h2 className="text-2xl font-bold mb-6 text-center">Vitamin Knowledge Quiz</h2>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
          <div 
            className="bg-blue-500 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="mb-6">
          <p className="text-lg mb-4">{questions[currentQuestionIndex].question}</p>
          <div className="space-y-3">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <label 
                key={index} 
                className={`block p-3 rounded-lg border border-gray-700 cursor-pointer transition-colors duration-200
                  ${answers[currentQuestionIndex] === option ? 'bg-blue-600 border-blue-500' : 'hover:bg-gray-700'}`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={option}
                  checked={answers[currentQuestionIndex] === option}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <button
            onClick={handleNext}
            disabled={!answers[currentQuestionIndex]}
            className={`px-6 py-2 rounded-md font-bold transition duration-200 ease-in-out
              ${answers[currentQuestionIndex]
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-600 cursor-not-allowed text-gray-400'}`}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish Quiz'}
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default KnowledgeQuizPage;