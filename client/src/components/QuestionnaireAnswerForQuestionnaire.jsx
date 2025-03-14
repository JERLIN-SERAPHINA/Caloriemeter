// frontend/src/components/QuestionnaireAnswerForQuestionnaire.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './scss/QuestionnaireAnswerForQuestionnaire.scss';

const QuestionnaireAnswerForQuestionnaire = () => {
    const { questionnaireId } = useParams();
    const [questionnaire, setQuestionnaire] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the questionnaire data
                const questionnaireResponse = await axios.get(`http://localhost:3001/api/questionnaires/${questionnaireId}`);
                setQuestionnaire(questionnaireResponse.data);
                
                // Fetch answers for this questionnaire
                const answersResponse = await axios.get(`http://localhost:3001/api/questionnaire-answers/questionnaire/${questionnaireId}`);
                setAnswers(answersResponse.data);
                
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        
        fetchData();
    }, [questionnaireId]);
    
    if (loading) {
        return <div className="loading-container"><p>Loading responses...</p></div>;
    }
    
    if (error) {
        return <div className="error-container"><p>Error: {error}</p></div>;
    }
    
    if (!questionnaire) {
        return <div className="not-found"><p>Questionnaire not found.</p></div>;
    }
    
    return (
        <div className="questionnaire-answers-container">
            <h2>Responses for "{questionnaire.questionaireName}"</h2>
            
            <div className="questionnaire-info">
                <p><strong>Questionnaire ID:</strong> {questionnaire.questionaireId}</p>
                <p><strong>Total Responses:</strong> {answers.length}</p>
            </div>
            
            {answers.length > 0 ? (
                <div className="answers-table-container">
                    <table className="answers-table">
                        <thead>
                            <tr>
                                <th>Response ID</th>
                                <th>User ID</th>
                                <th>Submission Date</th>
                                <th># of Answers</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {answers.map(answer => (
                                <tr key={answer._id}>
                                    <td>{answer._id.substring(0, 8)}...</td>
                                    <td>{answer.userId}</td>
                                    <td>{new Date(answer.submissionDate).toLocaleString()}</td>
                                    <td>{answer.answers ? answer.answers.length : 0}</td>
                                    <td className="actions-cell">
                                        <Link to={`/questionnaire-answers/${answer._id}`} className="btn-view">
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="no-answers">No responses have been submitted for this questionnaire yet.</p>
            )}
            
            <div className="actions">
                <Link to={`/questionnaires/${questionnaire._id}`} className="btn-view-questionnaire">
                    View Questionnaire Details
                </Link>
                <Link to="/questionnaire-answers" className="btn-back">
                    Back to All Responses
                </Link>
                <Link to={`/questionnaires/fill/${questionnaire._id}`} className="btn-fill">
                    Submit New Response
                </Link>
            </div>
        </div>
    );
};

export default QuestionnaireAnswerForQuestionnaire;