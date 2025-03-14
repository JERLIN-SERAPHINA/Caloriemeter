import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './scss/QuestionnaireEdit.scss';
import FormInput from './common/FormInput';
import { validateQuestionnaire } from '../utils/questionnaireUtils';

const QuestionnaireEdit = () => {
    const { questionnaireId } = useParams();
    const [questionaireName, setQuestionaireName] = useState('');
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestionnaire = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/questionnaires/${questionnaireId}`);
                setQuestionaireName(response.data.questionaireName);
                
                // Handle migration from old schema with single followUpQuestion to new schema with followUpQuestions array
                const questionsData = response.data.questions.map(q => {
                    // If the question has the old followUpQuestion format, migrate it
                    if (q.followUpQuestion && !q.followUpQuestions) {
                        return {
                            ...q,
                            followUpQuestions: q.followUpQuestion ? [q.followUpQuestion] : [],
                            followUpQuestion: undefined // Remove the old property
                        };
                    }
                    
                    // If the question already has followUpQuestions array or neither, return as is
                    if (!q.followUpQuestions) {
                        return {
                            ...q,
                            followUpQuestions: []
                        };
                    }
                    
                    return q;
                });
                
                setQuestions(questionsData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchQuestionnaire();
    }, [questionnaireId]);

    const handleQuestionnaireUpdate = async (event) => {
        event.preventDefault();
        const updatedQuestionnaireData = {
            questionaireName,
            questions
        };

        // Validate the questionnaire
        const validation = validateQuestionnaire({
            questionaireId: parseInt(questionnaireId),
            ...updatedQuestionnaireData
        });

        if (!validation.isValid) {
            setError(validation.errors.join('\n'));
            return;
        }

        try {
            await axios.put(`http://localhost:3001/api/questionnaires/${questionnaireId}`, updatedQuestionnaireData);
            alert('Questionnaire updated successfully!');
            navigate('/questionnaires');
        } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
        }
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { 
            question: '', 
            type: 'text', 
            options: [], 
            followUpQuestions: [],
            questions: [] 
        }]);
    };

    const handleRemoveQuestion = (index) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    const handleQuestionChange = (index, event) => {
        const { name, value } = event.target;
        const newQuestions = [...questions];
        newQuestions[index][name] = value;

        if (name === 'type') {
            if (['radio', 'checkbox', 'radio|text'].includes(value)) {
                if (!newQuestions[index].options || newQuestions[index].options.length === 0) {
                    newQuestions[index].options = [{ option: '', type: value === 'radio|text' ? 'radio|text' : 'radio' }];
                }
            } else {
                newQuestions[index].options = [];
            }
        }
        setQuestions(newQuestions);
    };

    // Option handlers
    const handleAddOption = (questionIndex) => {
        const newQuestions = [...questions];
        const questionType = newQuestions[questionIndex].type;
        const optionType = questionType === 'radio|text' ? 'radio|text' : questionType;
        newQuestions[questionIndex].options = [...newQuestions[questionIndex].options, { option: '', type: optionType }];
        setQuestions(newQuestions);
    };

    const handleRemoveOption = (questionIndex, optionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options.splice(optionIndex, 1);
        setQuestions(newQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, event) => {
        const { name, value } = event.target;
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex][name] = value;
        setQuestions(newQuestions);
    };

    // New handlers for multiple follow-up questions
    const handleAddFollowUp = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].followUpQuestions.push({ 
            question: '', 
            type: 'text', 
            triggerAnswer: '',
            options: []
        });
        setQuestions(newQuestions);
    };

    const handleRemoveFollowUp = (questionIndex, followUpIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].followUpQuestions.splice(followUpIndex, 1);
        setQuestions(newQuestions);
    };

    const handleFollowUpQuestionChange = (questionIndex, followUpIndex, event) => {
        const { name, value } = event.target;
        const newQuestions = [...questions];
        
        // Make sure followUpQuestions array exists
        if (!newQuestions[questionIndex].followUpQuestions) {
            newQuestions[questionIndex].followUpQuestions = [];
        }
        
        // Make sure the follow-up question exists at the specified index
        if (!newQuestions[questionIndex].followUpQuestions[followUpIndex]) {
            newQuestions[questionIndex].followUpQuestions[followUpIndex] = { 
                question: '', 
                type: 'text',
                triggerAnswer: '',
                options: []
            };
        }
        
        newQuestions[questionIndex].followUpQuestions[followUpIndex][name] = value;

        // Initialize options array when type is changed to radio or checkbox
        if (name === 'type' && ['radio', 'checkbox', 'radio|text'].includes(value)) {
            if (!newQuestions[questionIndex].followUpQuestions[followUpIndex].options || 
                newQuestions[questionIndex].followUpQuestions[followUpIndex].options.length === 0) {
                newQuestions[questionIndex].followUpQuestions[followUpIndex].options = [
                    { option: '', type: value === 'radio|text' ? 'radio|text' : value }
                ];
            }
        }

        setQuestions(newQuestions);
    };

    // Follow-up option handlers
    const handleAddFollowUpOption = (questionIndex, followUpIndex) => {
        const newQuestions = [...questions];
        const followUpType = newQuestions[questionIndex].followUpQuestions[followUpIndex].type;
        const optionType = followUpType === 'radio|text' ? 'radio|text' : followUpType;
        
        newQuestions[questionIndex].followUpQuestions[followUpIndex].options.push({ 
            option: '', 
            type: optionType
        });
        
        setQuestions(newQuestions);
    };

    const handleRemoveFollowUpOption = (questionIndex, followUpIndex, optionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].followUpQuestions[followUpIndex].options.splice(optionIndex, 1);
        setQuestions(newQuestions);
    };

    const handleFollowUpOptionChange = (questionIndex, followUpIndex, optionIndex, event) => {
        const { name, value } = event.target;
        const newQuestions = [...questions];
        newQuestions[questionIndex].followUpQuestions[followUpIndex].options[optionIndex][name] = value;
        setQuestions(newQuestions);
    };

    if (loading) {
        return <div className="loading-container"><p>Loading questionnaire for editing...</p></div>;
    }

    if (error) {
        return <div className="error-container"><p>Error: {error}</p></div>;
    }

    return (
        <div className="questionnaire-form-container">
            <h2>Edit Questionnaire</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleQuestionnaireUpdate}>
                <FormInput
                    label="Questionnaire Name:"
                    type="text"
                    name="questionaireName"
                    value={questionaireName}
                    onChange={(e) => setQuestionaireName(e.target.value)}
                    required
                />

                <h3>Questions</h3>
                {questions.map((question, index) => (
                    <div key={index} className="question-item">
                        <h4>Question {index + 1} <button type="button" onClick={() => handleRemoveQuestion(index)}>Remove</button></h4>
                        <FormInput
                            label="Question Text:"
                            type="text"
                            name="question"
                            value={question.question}
                            onChange={(e) => handleQuestionChange(index, e)}
                            required
                        />
                        <FormInput
                            label="Question Type:"
                            type="select"
                            name="type"
                            value={question.type}
                            onChange={(e) => handleQuestionChange(index, e)}
                        >
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="radio">Radio</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="radio|text">Radio with Text</option>
                            <option value="group">Group</option>
                        </FormInput>

                        {/* Options Section */}
                        {['radio', 'checkbox', 'radio|text'].includes(question.type) && (
                            <div className="options-section">
                                <h5>Options</h5>
                                {question.options && question.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="option-input-row">
                                        <label htmlFor={`option-${index}-${optionIndex}`}>Option {optionIndex + 1}:</label>
                                        <input
                                            type="text"
                                            name="option"
                                            id={`option-${index}-${optionIndex}`}
                                            value={option.option}
                                            onChange={(e) => handleOptionChange(index, optionIndex, e)}
                                            required
                                        />
                                        <button type="button" onClick={() => handleRemoveOption(index, optionIndex)}>Remove</button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => handleAddOption(index)}>Add Option</button>
                            </div>
                        )}

                        {/* Follow-up Questions Section - Updated for multiple follow-ups */}
                        <div className="follow-up-questions-section">
                            <h5>Follow-up Questions</h5>
                            
                            {question.followUpQuestions && question.followUpQuestions.map((followUp, followUpIndex) => (
                                <div key={followUpIndex} className="follow-up-question">
                                    <h6>Follow-up Question {followUpIndex + 1}</h6>
                                    <FormInput
                                        label="Follow-up Question Text:"
                                        type="text"
                                        name="question"
                                        value={followUp.question || ''}
                                        onChange={(e) => handleFollowUpQuestionChange(index, followUpIndex, e)}
                                        required
                                    />
                                    <FormInput
                                        label="Follow-up Question Type:"
                                        type="select"
                                        name="type"
                                        value={followUp.type || 'text'}
                                        onChange={(e) => handleFollowUpQuestionChange(index, followUpIndex, e)}
                                    >
                                        <option value="text">Text</option>
                                        <option value="number">Number</option>
                                        <option value="radio">Radio</option>
                                        <option value="checkbox">Checkbox</option>
                                        <option value="radio|text">Radio with Text</option>
                                    </FormInput>
                                    <FormInput
                                        label="Trigger Answer:"
                                        type="text"
                                        name="triggerAnswer"
                                        value={followUp.triggerAnswer || ''}
                                        onChange={(e) => handleFollowUpQuestionChange(index, followUpIndex, e)}
                                        required
                                    />
                                    
                                    {/* Follow-up Question Options */}
                                    {['radio', 'checkbox', 'radio|text'].includes(followUp.type) && (
                                        <div className="follow-up-options">
                                            <h6>Follow-up Question Options</h6>
                                            {followUp.options && followUp.options.map((option, optionIndex) => (
                                                <div key={optionIndex} className="option-input-row">
                                                    <label htmlFor={`follow-up-option-${index}-${followUpIndex}-${optionIndex}`}>
                                                        Option {optionIndex + 1}:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="option"
                                                        id={`follow-up-option-${index}-${followUpIndex}-${optionIndex}`}
                                                        value={option.option}
                                                        onChange={(e) => handleFollowUpOptionChange(index, followUpIndex, optionIndex, e)}
                                                        required
                                                    />
                                                    <button 
                                                        type="button" 
                                                        onClick={() => handleRemoveFollowUpOption(index, followUpIndex, optionIndex)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                            <button 
                                                type="button" 
                                                onClick={() => handleAddFollowUpOption(index, followUpIndex)}
                                            >
                                                Add Follow-up Option
                                            </button>
                                        </div>
                                    )}
                                    <button 
                                        type="button" 
                                        onClick={() => handleRemoveFollowUp(index, followUpIndex)}
                                        className="btn-remove-follow-up"
                                    >
                                        Remove This Follow-up Question
                                    </button>
                                </div>
                            ))}
                            <button 
                                type="button" 
                                onClick={() => handleAddFollowUp(index)}
                                className="btn-add-follow-up"
                            >
                                Add Follow-up Question
                            </button>
                        </div>
                    </div>
                ))}
                <button type="button" onClick={handleAddQuestion}>Add Question</button>

                <button type="submit">Update Questionnaire</button>
                <Link to="/questionnaires">Cancel</Link>
            </form>
        </div>
    );
};

export default QuestionnaireEdit;