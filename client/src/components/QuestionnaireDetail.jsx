import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Badge, Spinner, Alert } from 'react-bootstrap';

const QuestionnaireDetail = () => {
    const { questionnaireId } = useParams();
    const [questionnaire, setQuestionnaire] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestionnaire = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/questionnaires/${questionnaireId}`);
                setQuestionnaire(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchQuestionnaire();
    }, [questionnaireId]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this questionnaire?')) {
            try {
                await axios.delete(`http://localhost:3001/api/questionnaires/${questionnaireId}`);
                alert('Questionnaire deleted successfully.');
                navigate('/questionnaires');
            } catch (err) {
                setError(err.response ? err.response.data.message : err.message);
            }
        }
    };

    if (loading) {
        return (
            <>
                {/* <NavBar /> */}
                <Container className="mt-5 text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <p>Loading questionnaire details...</p>
                </Container>
            </>
        );
    }

    if (error) {
        return (
            <>
                {/* <NavBar /> */}
                <Container className="mt-5">
                    <Alert variant="danger">
                        <Alert.Heading>Error</Alert.Heading>
                        <p>{error}</p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button variant="outline-danger" onClick={() => navigate('/questionnaires')}>
                                Return to Questionnaires
                            </Button>
                        </div>
                    </Alert>
                </Container>
            </>
        );
    }

    if (!questionnaire) {
        return (
            <>
                {/* <NavBar /> */}
                <Container className="mt-5">
                    <Alert variant="warning">
                        <Alert.Heading>Not Found</Alert.Heading>
                        <p>Questionnaire not found.</p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button variant="outline-primary" onClick={() => navigate('/questionnaires')}>
                                Return to Questionnaires
                            </Button>
                        </div>
                    </Alert>
                </Container>
            </>
        );
    }

    return (
        <>
            {/* <NavBar /> */}
            <Container className="py-5">
                <Card className="border-0 shadow-lg rounded-3 mb-5 overflow-hidden">
                    <Card.Header className="bg-gradient bg-primary text-white py-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="mb-0 fw-bold">
                                <i className="fas fa-clipboard-list me-2"></i> 
                                Questionnaire Details
                            </h3>
                            <Badge bg="light" text="dark" className="px-3 py-2 fs-6 rounded-pill">
                                ID: {questionnaire.questionaireId}
                            </Badge>
                        </div>
                    </Card.Header>
                    
                    <Card.Body className="p-4 bg-light">
                        <h2 className="text-center mb-4 fw-bold text-primary border-bottom pb-3">
                            {questionnaire.questionaireName}
                        </h2>
                        
                        <Card className="border-0 shadow mb-5 rounded-3">
                            <Card.Header as="h5" className="bg-white border-bottom border-2 py-3">
                                <div className="d-flex align-items-center">
                                    <i className="fas fa-question-circle text-primary me-2 fs-4"></i>
                                    <span>Questions ({questionnaire.questions?.length || 0})</span>
                                </div>
                            </Card.Header>
                            
                            <Card.Body className="p-0">
                                {questionnaire.questions && questionnaire.questions.length > 0 ? (
                                    <div className="questions-list p-3">
                                        {questionnaire.questions.map((question, index) => (
                                            <Card key={index} className="mb-4 border-0 shadow-sm">
                                                <Card.Header className="d-flex justify-content-between align-items-center py-3 bg-white border-start border-5 border-primary">
                                                    <h6 className="mb-0 fw-bold">{`Question ${index + 1}`}</h6>
                                                    <div>
                                                        <Badge 
                                                            bg={question.type === 'text' ? 'info' : 
                                                               question.type === 'radio' ? 'success' : 
                                                               question.type === 'checkbox' ? 'warning' : 'secondary'} 
                                                            className="px-3 py-2 rounded-pill">
                                                            {question.type === 'text' ? 'Text Input' :
                                                             question.type === 'radio' ? 'Single Choice' :
                                                             question.type === 'checkbox' ? 'Multiple Choice' : question.type}
                                                        </Badge>
                                                    </div>
                                                </Card.Header>
                                                
                                                <Card.Body className="px-4 py-3">
                                                    <p className="fs-5 fw-bold text-dark mb-4">{question.question}</p>
                                                    
                                                    {/* Question type indicator with visual cue */}
                                                    <div className="mb-3 text-muted small">
                                                        {question.type === 'text' && 
                                                            <div className="d-flex align-items-center mb-2">
                                                                <i className="fas fa-font me-2"></i>
                                                                <span>Text response expected</span>
                                                            </div>
                                                        }
                                                    </div>
                                                    
                                                    {/* Only show options if they exist AND question type is not 'text' */}
                                                    {question.options && question.options.length > 0 && question.type !== 'text' && (
                                                        <div className="ms-0 mb-4 options-container">
                                                            <h6 className="mb-3 fw-bold text-secondary">
                                                                <i className={`me-2 fas ${question.type === 'radio' ? 'fa-dot-circle' : 'fa-check-square'}`}></i>
                                                                Options:
                                                            </h6>
                                                            <div className="ps-3">
                                                                {question.options.map((option, optionIndex) => (
                                                                    <div key={optionIndex} className="card border-0 bg-white shadow-sm mb-2 p-3">
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                            <div className="d-flex align-items-center">
                                                                                <span className="option-number me-2 bg-light rounded-circle text-center" 
                                                                                      style={{width: '25px', height: '25px', lineHeight: '25px'}}>
                                                                                    {optionIndex + 1}
                                                                                </span>
                                                                                <span className="fw-bold">{option.option}</span>
                                                                            </div>
                                                                            <Badge bg="info" pill className="px-3">{option.type}</Badge>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                    
                                                    {/* Display legacy single follow-up question if it exists and has content */}
                                                    {question.followUpQuestion && question.followUpQuestion.question && (
                                                        <div className="follow-up-section mt-4">
                                                            <div className="d-flex align-items-center mb-3">
                                                                <div className="line me-3 bg-info" style={{width: '3px', height: '24px'}}></div>
                                                                <h6 className="mb-0 fw-bold text-info">Follow-up Question</h6>
                                                            </div>
                                                            
                                                            <Card className="border-0 shadow-sm ms-4 bg-light">
                                                                <Card.Header className="bg-info bg-opacity-10 text-dark border-0">
                                                                    <div className="d-flex justify-content-between align-items-center">
                                                                        <span className="fw-bold">When answered: "{question.followUpQuestion.triggerAnswer}"</span>
                                                                        <Badge bg="info" pill className="px-3">{question.followUpQuestion.type}</Badge>
                                                                    </div>
                                                                </Card.Header>
                                                                <Card.Body>
                                                                    <p className="fw-semibold">{question.followUpQuestion.question}</p>
                                                                    
                                                                    {/* Only show options if they exist AND question type is not 'text' */}
                                                                    {question.followUpQuestion.options && 
                                                                     question.followUpQuestion.options.length > 0 && 
                                                                     question.followUpQuestion.type !== 'text' && (
                                                                        <div className="mt-3">
                                                                            <h6 className="fw-bold text-secondary mb-2">Options:</h6>
                                                                            <div className="ps-3">
                                                                                {question.followUpQuestion.options.map((option, optionIndex) => (
                                                                                    <div key={optionIndex} className="card border-0 bg-white shadow-sm mb-2 p-2">
                                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                                            <span>{option.option}</span>
                                                                                            <Badge bg="info" pill className="px-2">{option.type}</Badge>
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </Card.Body>
                                                            </Card>
                                                        </div>
                                                    )}
                                                    
                                                    {/* Display multiple follow-up questions if they exist and have content */}
                                                    {question.followUpQuestions && question.followUpQuestions.length > 0 && 
                                                      question.followUpQuestions.some(followUp => followUp && followUp.question) && (
                                                        <div className="follow-up-section mt-4">
                                                            <div className="d-flex align-items-center mb-3">
                                                                <div className="line me-3 bg-info" style={{width: '3px', height: '24px'}}></div>
                                                                <h6 className="mb-0 fw-bold text-info">Follow-up Questions ({question.followUpQuestions.filter(q => q && q.question).length})</h6>
                                                            </div>
                                                            
                                                            <div className="accordion ms-4" id={`followup-accordion-${index}`}>
                                                                {question.followUpQuestions
                                                                  .filter(followUp => followUp && followUp.question)
                                                                  .map((followUp, followUpIndex) => (
                                                                    <div key={followUpIndex} className="card border-0 shadow-sm mb-3 bg-light">
                                                                        <div className="card-header bg-info bg-opacity-10 border-0">
                                                                            <div className="d-flex justify-content-between align-items-center">
                                                                                <div className="d-flex align-items-center">
                                                                                    <span className="me-2 badge rounded-circle bg-info">{followUpIndex + 1}</span>
                                                                                    <span className="fw-bold">When answered: "{followUp.triggerAnswer}"</span>
                                                                                </div>
                                                                                <Badge bg={followUp.type === 'text' ? 'info' : 'success'} pill className="px-3">
                                                                                    {followUp.type === 'text' ? 'Text' : followUp.type}
                                                                                </Badge>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                        <div className="card-body">
                                                                            <p className="fw-semibold">{followUp.question}</p>
                                                                            
                                                                            {/* Only show options if they exist AND question type is not 'text' */}
                                                                            {followUp.options && 
                                                                            followUp.options.length > 0 && 
                                                                            followUp.type !== 'text' && (
                                                                                <div className="mt-3">
                                                                                    <h6 className="fw-bold text-secondary mb-2">Options:</h6>
                                                                                    <div className="ps-3">
                                                                                        {followUp.options.map((option, optionIndex) => (
                                                                                            <div key={optionIndex} className="card border-0 bg-white shadow-sm mb-2 p-2">
                                                                                                <div className="d-flex justify-content-between align-items-center">
                                                                                                    <span>{option.option}</span>
                                                                                                    <Badge bg="info" pill className="px-2">{option.type}</Badge>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                    
                                                    {/* Sub-questions (Group) */}
                                                    {question.questions && 
                                                     question.questions.length > 0 && 
                                                     question.questions.some(q => q && q.question) && (
                                                        <div className="sub-questions-section mt-4">
                                                            <div className="d-flex align-items-center mb-3">
                                                                <div className="line me-3 bg-success" style={{width: '3px', height: '24px'}}></div>
                                                                <h6 className="mb-0 fw-bold text-success">Sub-questions Group ({question.questions.filter(q => q && q.question).length})</h6>
                                                            </div>
                                                            
                                                            <div className="ms-4">
                                                                {question.questions
                                                                  .filter(subQ => subQ && subQ.question)
                                                                  .map((subQuestion, subIndex) => (
                                                                    <div key={subIndex} className="card border-0 shadow-sm mb-2 bg-success bg-opacity-10">
                                                                        <div className="card-body p-3">
                                                                            <div className="d-flex justify-content-between align-items-center">
                                                                                <div className="d-flex align-items-center">
                                                                                    <span className="me-3 badge rounded-circle bg-success">{subIndex + 1}</span>
                                                                                    <span>{subQuestion.question}</span>
                                                                                </div>
                                                                                <Badge bg="success" pill className="px-3">{subQuestion.type}</Badge>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <Alert variant="warning" className="m-3">
                                        <i className="fas fa-exclamation-triangle me-2"></i>
                                        No questions in this questionnaire.
                                    </Alert>
                                )}
                            </Card.Body>
                        </Card>

                        <Row className="mt-5">
                            <Col>
                                <div className="d-flex flex-wrap gap-2 justify-content-center">
                                    <Button 
                                        variant="outline-primary" 
                                        as={Link} 
                                        to={`/questionnaires/edit/${questionnaire.questionaireId}`}
                                        className="px-4 py-2 d-flex align-items-center"
                                    >
                                        <i className="fas fa-edit me-2"></i> Edit
                                    </Button>
                                    
                                    <Button 
                                        variant="success" 
                                        as={Link} 
                                        to={`/questionnaires/fill/${questionnaire.questionaireId}`}
                                        className="px-4 py-2 d-flex align-items-center"
                                    >
                                        <i className="fas fa-clipboard-check me-2"></i> Fill Out
                                    </Button>
                                    
                                    <Button 
                                        variant="outline-danger" 
                                        onClick={handleDelete}
                                        className="px-4 py-2 d-flex align-items-center"
                                    >
                                        <i className="fas fa-trash-alt me-2"></i> Delete
                                    </Button>
                                    
                                    <Button 
                                        variant="secondary" 
                                        as={Link} 
                                        to="/questionnaires"
                                        className="px-4 py-2 d-flex align-items-center"
                                    >
                                        <i className="fas fa-arrow-left me-2"></i> Back
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default QuestionnaireDetail;