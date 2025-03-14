import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './scss/QuestionnaireForm.scss';
import FormQuestion from './FormQuestion';
import { processFormAnswers, getDefaultEmptyAnswer } from '../utils/questionnaireUtils';

const QuestionnaireForm = () => {
    const { questionnaireId } = useParams();
    const [questionnaire, setQuestionnaire] = useState(null);
    const [formAnswers, setFormAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState('');
    const [activeFollowUps, setActiveFollowUps] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestionnaire = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/questionnaires/${questionnaireId}`);
                const fetchedQuestionnaire = response.data;
                
                // Process questionnaire data - migrate old format to new if needed
                const processedQuestions = fetchedQuestionnaire.questions.map(q => {
                    if (q.followUpQuestion && !q.followUpQuestions) {
                        return {
                            ...q,
                            followUpQuestions: [q.followUpQuestion],
                            followUpQuestion: undefined
                        };
                    }
                    if (!q.followUpQuestions) {
                        return {
                            ...q,
                            followUpQuestions: []
                        };
                    }
                    return q;
                });
                
                fetchedQuestionnaire.questions = processedQuestions;
                setQuestionnaire(fetchedQuestionnaire);

                // Initialize answers with default empty values
                const initialAnswers = {};
                fetchedQuestionnaire.questions.forEach((question, index) => {
                    initialAnswers[index] = getDefaultEmptyAnswer(question.type);
                });
                setFormAnswers(initialAnswers);

                // Initialize activeFollowUps state
                const initialActiveFollowUps = {};
                fetchedQuestionnaire.questions.forEach((question, index) => {
                    if (question.followUpQuestions && question.followUpQuestions.length > 0) {
                        initialActiveFollowUps[index] = {};
                    }
                });
                setActiveFollowUps(initialActiveFollowUps);

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchQuestionnaire();
    }, [questionnaireId]);

    const handleAnswerChange = (questionIndex, value, optionIndex = null) => {
        setFormAnswers(prev => {
            const updatedAnswers = { ...prev };

            // Handle different question types
            switch (questionnaire.questions[questionIndex].type) {
                case 'checkbox':
                    // For checkbox, we need to toggle the selected option
                    const optionValue = questionnaire.questions[questionIndex].options[optionIndex].option;
                    const currentSelections = [...(updatedAnswers[questionIndex] || [])];
                    
                    // If already selected, unselect it
                    if (currentSelections.includes(optionValue)) {
                        updatedAnswers[questionIndex] = currentSelections.filter(item => item !== optionValue);
                    } else {
                        // Otherwise, add it to selections
                        updatedAnswers[questionIndex] = [...currentSelections, optionValue];
                    }
                    break;
                    
                case 'radio|text':
                    // For radio with text, we need to handle special case
                    if (typeof value === 'string') {
                        // This is the text input change
                        updatedAnswers[questionIndex] = {
                            ...updatedAnswers[questionIndex],
                            text: value
                        };
                    } else {
                        // This is the radio option change
                        const option = questionnaire.questions[questionIndex].options[optionIndex].option;
                        updatedAnswers[questionIndex] = {
                            option: option,
                            text: ''
                        };
                    }
                    break;
                    
                case 'group':
                    // For group questions, we handle sub-questions
                    if (updatedAnswers[questionIndex] === '') {
                        updatedAnswers[questionIndex] = {};
                    }
                    updatedAnswers[questionIndex][optionIndex] = value;
                    break;
                    
                case 'radio':
                    // For radio buttons
                    updatedAnswers[questionIndex] = questionnaire.questions[questionIndex].options[optionIndex].option;
                    break;
                    
                default:
                    // For text and number inputs
                    updatedAnswers[questionIndex] = value;
            }
            
            // Check all follow-up questions for this question and activate/deactivate them
            // based on the selected answer
            const question = questionnaire.questions[questionIndex];
            if (question.followUpQuestions && question.followUpQuestions.length > 0) {
                const newActiveFollowUps = { ...activeFollowUps };
                
                question.followUpQuestions.forEach((followUp, followUpIndex) => {
                    let isActive = false;
                    
                    if (question.type === 'radio' || question.type === 'radio|text') {
                        // For radio buttons, check if the selected option matches the trigger
                        const selectedValue = question.type === 'radio' 
                            ? updatedAnswers[questionIndex] 
                            : updatedAnswers[questionIndex]?.option;
                            
                        isActive = selectedValue === followUp.triggerAnswer;
                    } 
                    else if (question.type === 'checkbox') {
                        // For checkboxes, check if the trigger option is among the selected options
                        isActive = updatedAnswers[questionIndex].includes(followUp.triggerAnswer);
                    }
                    else if (question.type === 'text' || question.type === 'textarea') {
                        // For text inputs, check if the text matches the trigger answer
                        isActive = String(updatedAnswers[questionIndex]) === String(followUp.triggerAnswer);
                    }
                    else if (question.type === 'number') {
                        // For number inputs, parse to number before comparing
                        const numValue = parseFloat(updatedAnswers[questionIndex]);
                        const triggerValue = parseFloat(followUp.triggerAnswer);
                        isActive = !isNaN(numValue) && !isNaN(triggerValue) && numValue === triggerValue;
                    }
                    
                    newActiveFollowUps[questionIndex] = {
                        ...newActiveFollowUps[questionIndex],
                        [followUpIndex]: isActive
                    };
                    
                    // If a follow-up is deactivated, clear its answer
                    if (!isActive) {
                        delete updatedAnswers[`followUp_${questionIndex}_${followUpIndex}`];
                    }
                });
                
                setActiveFollowUps(newActiveFollowUps);
            }

            return updatedAnswers;
        });
    };

    const handleFollowUpAnswerChange = (questionIndex, followUpIndex, value, optionIndex = null) => {
        setFormAnswers(prev => {
            const updatedAnswers = { ...prev };
            const followUpKey = `followUp_${questionIndex}_${followUpIndex}`;
            const followUpQuestion = questionnaire.questions[questionIndex].followUpQuestions[followUpIndex];
            
            // Handle different follow-up question types
            switch (followUpQuestion.type) {
                case 'checkbox':
                    // Similar logic as regular checkbox
                    const optionValue = followUpQuestion.options[optionIndex].option;
                    const currentSelections = [...(updatedAnswers[followUpKey] || [])];
                    
                    if (currentSelections.includes(optionValue)) {
                        updatedAnswers[followUpKey] = currentSelections.filter(item => item !== optionValue);
                    } else {
                        updatedAnswers[followUpKey] = [...currentSelections, optionValue];
                    }
                    break;
                    
                case 'radio|text':
                    // Similar logic as regular radio|text
                    if (typeof value === 'string') {
                        // This is the text input change
                        updatedAnswers[followUpKey] = {
                            ...updatedAnswers[followUpKey],
                            text: value
                        };
                    } else {
                        // This is the radio option change
                        const option = followUpQuestion.options[optionIndex].option;
                        updatedAnswers[followUpKey] = {
                            option: option,
                            text: ''
                        };
                    }
                    break;
                    
                case 'radio':
                    // For radio buttons in follow-up questions
                    if (optionIndex !== null && followUpQuestion.options) {
                        updatedAnswers[followUpKey] = followUpQuestion.options[optionIndex].option;
                    }
                    break;
                    
                default:
                    // For text and number follow-up inputs
                    updatedAnswers[followUpKey] = value;
            }

            return updatedAnswers;
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!userId.trim()) {
            setError("Please provide your ID before submitting.");
            return;
        }

        try {
            // Process answers into the format expected by the API
            const processedAnswers = [];
            
            // Process main questions
            questionnaire.questions.forEach((question, index) => {
                // Skip if answer is empty or undefined
                if (formAnswers[index] === undefined || 
                    (Array.isArray(formAnswers[index]) && formAnswers[index].length === 0) || 
                    formAnswers[index] === '') {
                    return;
                }

                // Create a properly formatted answer object - match backend schema field names
                const answerObj = {
                    questionId: question._id || `question_${index}`,
                    questionIndex: index,
                    question: question.question,  // Using 'question' instead of 'questionText'
                    questionType: question.type,
                    answer: formAnswers[index]
                };
                
                processedAnswers.push(answerObj);
                
                // Process follow-up questions
                if (question.followUpQuestions && question.followUpQuestions.length > 0) {
                    question.followUpQuestions.forEach((followUp, followUpIndex) => {
                        // Check if this follow-up was active and answered
                        const followUpKey = `followUp_${index}_${followUpIndex}`;
                        if (activeFollowUps[index]?.[followUpIndex] && formAnswers[followUpKey] !== undefined) {
                            const followUpAnswerObj = {
                                questionId: followUp._id || `followUp_${index}_${followUpIndex}`,
                                questionIndex: `${index}_followUp_${followUpIndex}`,
                                question: followUp.question,  // Using 'question' instead of 'questionText'
                                questionType: followUp.type,
                                answer: formAnswers[followUpKey],
                                isFollowUp: true,
                                parentQuestionIndex: index,
                                parentQuestionId: question._id || `question_${index}`
                            };
                            
                            processedAnswers.push(followUpAnswerObj);
                        }
                    });
                }
            });
            
            // Validate if we have any answers to submit
            if (processedAnswers.length === 0) {
                setError("Please answer at least one question before submitting.");
                return;
            }

            // Construct submission data to match backend expectations
            const submissionData = {
                questionnaireId: questionnaire._id,
                userId: userId,
                answers: processedAnswers
            };

            console.log("Submitting data:", JSON.stringify(submissionData, null, 2));
            
            try {
                const response = await axios.post('http://localhost:3001/api/questionnaire-answers', submissionData);
                console.log("Server response:", response.data);
                alert('Questionnaire submitted successfully!');
                navigate('/questionnaires');
            } catch (apiError) {
                console.error("API error details:", apiError);
                
                // If error indicates questionnaireId issues
                if (apiError.response?.data?.message === 'Questionnaire not found' || 
                    apiError.response?.data?.error?.includes('Questionnaire not found')) {
                    // Try with questionaireId instead of _id as a fallback
                    console.log("Retrying with questionaireId...");
                    const retryData = {
                        ...submissionData,
                        questionnaireId: questionnaire.questionaireId || questionnaire._id
                    };
                    
                    console.log("Retrying with:", retryData);
                    const retryResponse = await axios.post('http://localhost:3001/api/questionnaire-answers', retryData);
                    console.log("Retry response:", retryResponse.data);
                    alert('Questionnaire submitted successfully!');
                    navigate('/questionnaires');
                    return;
                }
                
                throw apiError; // Re-throw for the outer catch block to handle
            }
        } catch (err) {
            console.error("Submission error:", err);
            
            // Enhanced error handling with more details
            if (err.response) {
                console.error("Response error data:", err.response.data);
                setError(`Server error (${err.response.status}): ${err.response.data.message || err.response.data.error || JSON.stringify(err.response.data) || 'Unknown server error'}`);
            } else if (err.request) {
                setError("No response from server. Please check your connection and try again.");
            } else {
                setError(`Error: ${err.message}`);
            }
        }
    };

    if (loading) {
        return <div className="loading-container"><p>Loading questionnaire...</p></div>;
    }

    if (error) {
        return <div className="error-container"><p>Error: {error}</p></div>;
    }

    if (!questionnaire) {
        return <div className="not-found"><p>Questionnaire not found.</p></div>;
    }

    return (
        <div className="questionnaire-form-container">
            <h2>{questionnaire.questionaireName}</h2>
            <form onSubmit={handleSubmit}>
                <div className="user-info">
                    <label htmlFor="userId">Your ID:</label>
                    <input
                        type="text"
                        id="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Enter your ID"
                        required
                    />
                </div>

                <div className="questions">
                    {questionnaire.questions.map((question, index) => (
                        <div key={index} className="question-container">
                            <FormQuestion
                                question={question}
                                value={formAnswers[index]}
                                onChange={(value, optIndex) => handleAnswerChange(index, value, optIndex)}
                            />
                            
                            {/* Render multiple follow-up questions if they exist and are active */}
                            {question.followUpQuestions && question.followUpQuestions.length > 0 && 
                                question.followUpQuestions.map((followUp, followUpIndex) => (
                                    activeFollowUps[index]?.[followUpIndex] && (
                                        <div key={followUpIndex} className="follow-up-question">
                                            <h4>Follow-up Question:</h4>
                                            <FormQuestion
                                                question={followUp}
                                                value={formAnswers[`followUp_${index}_${followUpIndex}`]}
                                                onChange={(value, optIndex) => 
                                                    handleFollowUpAnswerChange(index, followUpIndex, value, optIndex)}
                                            />
                                        </div>
                                    )
                                ))
                            }
                        </div>
                    ))}
                </div>

                <div className="form-actions">
                    <button type="submit">Submit Answers</button>
                </div>
            </form>
        </div>
    );
};

export default QuestionnaireForm;
