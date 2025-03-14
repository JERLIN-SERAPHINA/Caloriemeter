// frontend/src/components/QuestionnaireAnswerList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './scss/QuestionnaireAnswerList.scss';

const QuestionnaireAnswerList = () => {
    const [answers, setAnswers] = useState([]);
    const [questionnaires, setQuestionnaires] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        questionnaireId: '',
        userId: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all questionnaire answers
                const answersResponse = await axios.get('http://localhost:3001/api/questionnaire-answers');
                setAnswers(answersResponse.data);
                
                // Fetch all questionnaires for the filter dropdown
                const questionnairesResponse = await axios.get('http://localhost:3001/api/questionnaires');
                setQuestionnaires(questionnairesResponse.data);
                
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const applyFilters = async () => {
        setLoading(true);
        try {
            // Build query params
            const params = {};
            if (filters.questionnaireId) {
                params.questionnaireId = filters.questionnaireId;
            }
            if (filters.userId) {
                params.userId = filters.userId;
            }
            if (filters.startDate) {
                params.startDate = filters.startDate;
            }
            if (filters.endDate) {
                params.endDate = filters.endDate;
            }
            
            // Fetch filtered answers
            const response = await axios.get('http://localhost:3001/api/questionnaire-answers', { params });
            setAnswers(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const clearFilters = () => {
        setFilters({
            questionnaireId: '',
            userId: '',
            startDate: '',
            endDate: ''
        });
        
        // Reload all answers
        setLoading(true);
        axios.get('http://localhost:3001/api/questionnaire-answers')
            .then(response => {
                setAnswers(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    };

    if (loading) {
        return <div className="loading-container"><p>Loading answers...</p></div>;
    }

    if (error) {
        return <div className="error-container"><p>Error: {error}</p></div>;
    }

    return (
        <div className="questionnaire-answer-list-container">
            <h2>Questionnaire Responses</h2>
            
            <div className="filters-section">
                <h3>Filter Responses</h3>
                <div className="filter-controls">
                    <div className="filter-group">
                        <label htmlFor="questionnaireId">Questionnaire:</label>
                        <select
                            id="questionnaireId"
                            name="questionnaireId"
                            value={filters.questionnaireId}
                            onChange={handleFilterChange}
                        >
                            <option value="">All Questionnaires</option>
                            {questionnaires.map(questionnaire => (
                                <option key={questionnaire._id} value={questionnaire._id}>
                                    {questionnaire.questionaireName} (ID: {questionnaire.questionaireId})
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="filter-group">
                        <label htmlFor="userId">User ID:</label>
                        <input
                            type="text"
                            id="userId"
                            name="userId"
                            value={filters.userId}
                            onChange={handleFilterChange}
                            placeholder="Filter by user ID"
                        />
                    </div>
                    
                    <div className="filter-group">
                        <label htmlFor="startDate">Start Date:</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={filters.startDate}
                            onChange={handleFilterChange}
                        />
                    </div>
                    
                    <div className="filter-group">
                        <label htmlFor="endDate">End Date:</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={filters.endDate}
                            onChange={handleFilterChange}
                        />
                    </div>
                    
                    <div className="filter-actions">
                        <button className="btn-apply" onClick={applyFilters}>Apply Filters</button>
                        <button className="btn-clear" onClick={clearFilters}>Clear Filters</button>
                    </div>
                </div>
            </div>
            
            <div className="answers-table-container">
                <h3>All Responses ({answers.length})</h3>
                {answers.length > 0 ? (
                    <table className="answers-table">
                        <thead>
                            <tr>
                                <th>Response ID</th>
                                <th>Questionnaire</th>
                                <th>User ID</th>
                                <th>Submission Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {answers.map(answer => (
                                <tr key={answer._id}>
                                    <td>{answer._id.substring(0, 8)}...</td>
                                    <td>
                                        {answer.questionnaireId && typeof answer.questionnaireId === 'object' 
                                            ? answer.questionnaireId.questionaireName 
                                            : 'Unknown Questionnaire'}
                                    </td>
                                    <td>{answer.userId}</td>
                                    <td>{new Date(answer.submissionDate).toLocaleString()}</td>
                                    <td className="actions-cell">
                                        <Link to={`/questionnaire-answers/${answer._id}`} className="btn-view">
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="no-answers">No responses found. Try adjusting your filters or create new questionnaires.</p>
                )}
            </div>
            
            <div className="actions">
                <Link to="/questionnaires" className="btn-questionnaires">View All Questionnaires</Link>
            </div>
        </div>
    );
};

export default QuestionnaireAnswerList;