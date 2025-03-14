import React from 'react';
import './scss/FormQuestion.scss';

const FormQuestion = ({ question, value, onChange }) => {
  const renderQuestionInput = () => {
    switch (question.type) {
      case 'text':
        return (
          <input 
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            required
            className="form-control"
          />
        );
        
      case 'number':
        return (
          <input 
            type="number"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            required
            className="form-control"
          />
        );
        
      case 'radio':
        return (
          <div className="options-container radio-options">
            {question.options && question.options.map((option, index) => (
              <div key={index} className="option-item">
                <input
                  type="radio"
                  id={`option-${question.question?.replace(/\s+/g, '-')}-${index}`}
                  name={`question-${question.question?.replace(/\s+/g, '-')}`}
                  value={option.option}
                  checked={value === option.option}
                  onChange={() => onChange(option.option, index)}
                  required={!value}
                />
                <label htmlFor={`option-${question.question?.replace(/\s+/g, '-')}-${index}`}>{option.option}</label>
              </div>
            ))}
          </div>
        );
        
      case 'checkbox':
        return (
          <div className="options-container checkbox-options">
            {question.options && question.options.map((option, index) => (
              <div key={index} className="option-item">
                <input
                  type="checkbox"
                  id={`option-${question.question?.replace(/\s+/g, '-')}-${index}`}
                  name={`question-${question.question?.replace(/\s+/g, '-')}`}
                  value={option.option}
                  checked={Array.isArray(value) && value.includes(option.option)}
                  onChange={() => onChange(option.option, index)}
                />
                <label htmlFor={`option-${question.question?.replace(/\s+/g, '-')}-${index}`}>{option.option}</label>
              </div>
            ))}
          </div>
        );
        
      case 'radio|text':
        return (
          <div className="options-container radio-text-options">
            {question.options && question.options.map((option, index) => (
              <div key={index} className="option-item">
                <div className="radio-part">
                  <input
                    type="radio"
                    id={`option-${question.question?.replace(/\s+/g, '-')}-${index}`}
                    name={`question-${question.question?.replace(/\s+/g, '-')}`}
                    value={option.option}
                    checked={value?.option === option.option}
                    onChange={() => onChange(option.option, index)}
                    required={!value?.option}
                  />
                  <label htmlFor={`option-${question.question?.replace(/\s+/g, '-')}-${index}`}>{option.option}</label>
                </div>
                
                {/* Show text input if this option is selected and type is radio|text */}
                {value?.option === option.option && option.type === 'radio|text' && (
                  <div className="text-part">
                    <input 
                      type="text"
                      value={value?.text || ''}
                      onChange={(e) => onChange(e.target.value)}
                      placeholder="Please specify..."
                      className="form-control"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        );
        
      case 'group':
        return (
          <div className="group-questions">
            {question.questions && question.questions.map((subQuestion, index) => (
              <div key={index} className="sub-question">
                <label>{subQuestion.question}</label>
                <input 
                  type={subQuestion.type === 'number' ? 'number' : 'text'}
                  value={(value && value[index]) || ''}
                  onChange={(e) => onChange(e.target.value, index)}
                  className="form-control"
                />
              </div>
            ))}
          </div>
        );
        
      default:
        return <p>Unsupported question type: {question.type}</p>;
    }
  };

  return (
    <div className={`question-item question-type-${question.type}`}>
      <h3 className="question-text">{question.question}</h3>
      {renderQuestionInput()}
    </div>
  );
};

export default FormQuestion;
