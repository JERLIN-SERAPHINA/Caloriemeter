// frontend/src/components/QuestionnaireAnswerDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './scss/QuestionnaireAnswerDetail.scss';

const QuestionnaireAnswerDetail = () => {
    const { answerId } = useParams();
    const [answerData, setAnswerData] = useState(null);
    const [questionnaire, setQuestionnaire] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAnswerAndQuestionnaire = async () => {
            try {
                // Fetch the answer data
                const answerResponse = await axios.get(`http://localhost:3001/api/questionnaire-answers/${answerId}`);
                setAnswerData(answerResponse.data);
                
                // Get the questionnaire ID properly
                const questionnaireId = answerResponse.data.questionnaireId?._id || answerResponse.data.questionnaireId;
                
                if (!questionnaireId) {
                    throw new Error("Questionnaire ID not found in the answer data");
                }
                
                // Fetch the questionnaire data using the extracted ID
                const questionnaireResponse = await axios.get(
                    `http://localhost:3001/api/questionnaires/${questionnaireId}`
                );
                setQuestionnaire(questionnaireResponse.data);
                
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchAnswerAndQuestionnaire();
    }, [answerId]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this answer? This action cannot be undone.')) {
            try {
                await axios.delete(`http://localhost:3001/api/questionnaire-answers/${answerId}`);
                alert('Questionnaire answer deleted successfully.');
                navigate('/questionnaire-answers');
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            }
        }
    };

    // Helper function to format answer value based on type
    const formatAnswerValue = (answer, questionType) => {
        if (answer === undefined || answer === null) {
            return 'No answer provided';
        }

        switch (questionType) {
            case 'checkbox':
                return Array.isArray(answer) ? answer.join(', ') : answer;
            case 'radio|text':
                return answer.option + (answer.text ? ` - ${answer.text}` : '');
            default:
                return answer.toString();
        }
    };

    // Group answers by parent questions and follow-up questions
    const groupAnswersByQuestion = () => {
        if (!answerData || !answerData.answers) return [];
        
        const groupedAnswers = [];
        const mainAnswers = {};
        const followUpAnswers = {};
        
        // First pass: separate main answers and follow-up answers
        answerData.answers.forEach(answer => {
            if (answer.isFollowUp) {
                // Handle both old and new formats for follow-up question indices
                const key = answer.questionIndex.toString();
                const parentIndex = answer.parentQuestionIndex;
                const followUpIndex = answer.followUpIndex || 0; // Default to 0 for legacy format
                
                if (!followUpAnswers[parentIndex]) {
                    followUpAnswers[parentIndex] = [];
                }
                
                followUpAnswers[parentIndex].push({
                    ...answer,
                    followUpIndex: followUpIndex
                });
            } else {
                mainAnswers[answer.questionIndex] = answer;
            }
        });
        
        // Second pass: add each main answer with its follow-up answers
        Object.keys(mainAnswers).forEach(questionIndex => {
            const mainAnswer = mainAnswers[questionIndex];
            const relatedFollowUps = followUpAnswers[questionIndex] || [];
            
            groupedAnswers.push({
                ...mainAnswer,
                followUpAnswers: relatedFollowUps.sort((a, b) => a.followUpIndex - b.followUpIndex)
            });
        });
        
        return groupedAnswers;
    };

    if (loading) {
        return <div className="loading-container"><p>Loading answer details...</p></div>;
    }

    if (error) {
        return <div className="error-container"><p>Error: {error}</p></div>;
    }

    if (!answerData || !questionnaire) {
        return <div className="not-found"><p>Answer or questionnaire not found.</p></div>;
    }

    const groupedAnswers = groupAnswersByQuestion();

    return (
        <div className="questionnaire-answer-detail-container">
            <h2>Questionnaire Response</h2>
            <div className="answer-metadata">
                <p><strong>Questionnaire:</strong> {questionnaire.questionaireName}</p>
                <p><strong>User ID:</strong> {answerData.userId}</p>
                <p><strong>Submission Date:</strong> {new Date(answerData.submissionDate).toLocaleString()}</p>
            </div>
            
            <div className="answers-container">
                <h3>Responses</h3>
                {groupedAnswers.length > 0 ? (
                    <div className="answer-list">
                        {groupedAnswers.map((answer, index) => (
                            <div key={index} className="answer-item">
                                <div className="question">
                                    <h4>Q{index + 1}: {answer.questionText}</h4>
                                    <div className="answer-value">
                                        <strong>Answer:</strong> {formatAnswerValue(answer.answer, questionnaire.questions[answer.questionIndex]?.type)}
                                    </div>
                                </div>
                                
                                {answer.followUpAnswers && answer.followUpAnswers.length > 0 && (
                                    <div className="follow-up-answers">
                                        {answer.followUpAnswers.map((followUp, followUpIndex) => (
                                            <div key={followUpIndex} className="follow-up-item">
                                                <h5>Follow-up Question: {followUp.questionText}</h5>
                                                <div className="follow-up-value">
                                                    <strong>Answer:</strong> {formatAnswerValue(
                                                        followUp.answer, 
                                                        questionnaire.questions[followUp.parentQuestionIndex]
                                                            ?.followUpQuestions[followUp.followUpIndex]?.type
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-answers">No answers available for this submission.</p>
                )}
            </div>
            
            <div className="actions">
                <Link to="/questionnaire-answers" className="btn-back">Back to All Responses</Link>
                <Link to={`/questionnaire-answers/questionnaire/${questionnaire._id}`} className="btn-questionnaire-answers">
                    All Responses for this Questionnaire
                </Link>
                <button onClick={handleDelete} className="btn-delete">Delete Answer</button>
            </div>
        </div>
    );
};

export default QuestionnaireAnswerDetail;