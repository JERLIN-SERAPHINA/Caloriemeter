// frontend/src/components/QuestionnaireList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './scss/QuestionnaireList.scss';

const QuestionnaireList = () => {
    const [questionnaires, setQuestionnaires] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestionnaires = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/questionnaires');
                setQuestionnaires(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchQuestionnaires();
    }, []);

    if (loading) {
        return <p>Loading questionnaires...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="questionnaire-list-container">
            <h2>Questionnaire List</h2>
            <Link to="/questionnaires/create">Create New Questionnaire</Link>
            {questionnaires.length > 0 ? (
                <ul>
                    {questionnaires.map(questionnaire => (
                        <li key={questionnaire._id}>
                            <div className="questionnaire-item">
                                <span className="questionnaire-name">
                                    {questionnaire.questionaireName} (ID: {questionnaire.questionaireId})
                                </span>
                                <div className="questionnaire-actions">
                                    <Link to={`/questionnaires/${questionnaire.questionaireId}`} className="btn view">
                                        View
                                    </Link>
                                    <Link to={`/questionnaires/fill/${questionnaire.questionaireId}`} className="btn fill">
                                        Fill Out
                                    </Link>
                                    <Link to={`/questionnaires/edit/${questionnaire.questionaireId}`} className="btn edit">
                                        Edit
                                    </Link>
                                    <Link to={`/questionnaire-answers/questionnaire/${questionnaire.questionaireId}`} className="btn answers">
                                        View Answers
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No questionnaires available.</p>
            )}
        </div>
    );
};

export default QuestionnaireList;