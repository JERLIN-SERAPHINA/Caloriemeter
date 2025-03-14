/**
 * Validates a questionnaire object
 * @param {Object} questionnaire - The questionnaire to validate
 * @returns {Object} - Validation result with isValid boolean and errors array
 */
export const validateQuestionnaire = (questionnaire) => {
    const errors = [];
    
    // Check required fields
    if (!questionnaire.questionaireId) {
        errors.push("Questionnaire ID is required");
    } else if (isNaN(parseInt(questionnaire.questionaireId))) {
        errors.push("Questionnaire ID must be a number");
    }
    
    if (!questionnaire.questionaireName || questionnaire.questionaireName.trim() === '') {
        errors.push("Questionnaire name is required");
    }
    
    // Check questions
    if (!questionnaire.questions || questionnaire.questions.length === 0) {
        errors.push("At least one question is required");
    } else {
        // Validate each question
        questionnaire.questions.forEach((question, index) => {
            if (!question.question || question.question.trim() === '') {
                errors.push(`Question ${index + 1} text is required`);
            }
            
            if (!question.type) {
                errors.push(`Question ${index + 1} type is required`);
            }
            
            // Validate options for radio, checkbox, and radio|text types
            if (['radio', 'checkbox', 'radio|text'].includes(question.type)) {
                if (!question.options || question.options.length === 0) {
                    errors.push(`Question ${index + 1} requires at least one option`);
                } else {
                    // Validate each option
                    question.options.forEach((option, optionIndex) => {
                        if (!option.option || option.option.trim() === '') {
                            errors.push(`Question ${index + 1}, Option ${optionIndex + 1} text is required`);
                        }
                    });
                }
            }
            
            // Validate follow-up questions
            if (question.followUpQuestions && question.followUpQuestions.length > 0) {
                question.followUpQuestions.forEach((followUp, followUpIndex) => {
                    if (!followUp.question || followUp.question.trim() === '') {
                        errors.push(`Question ${index + 1}, Follow-up ${followUpIndex + 1} text is required`);
                    }
                    
                    if (!followUp.type) {
                        errors.push(`Question ${index + 1}, Follow-up ${followUpIndex + 1} type is required`);
                    }
                    
                    if (!followUp.triggerAnswer || followUp.triggerAnswer.trim() === '') {
                        errors.push(`Question ${index + 1}, Follow-up ${followUpIndex + 1} trigger answer is required`);
                    }
                    
                    // Validate follow-up options for radio, checkbox, and radio|text types
                    if (['radio', 'checkbox', 'radio|text'].includes(followUp.type)) {
                        if (!followUp.options || followUp.options.length === 0) {
                            errors.push(`Question ${index + 1}, Follow-up ${followUpIndex + 1} requires at least one option`);
                        } else {
                            // Validate each option
                            followUp.options.forEach((option, optionIndex) => {
                                if (!option.option || option.option.trim() === '') {
                                    errors.push(`Question ${index + 1}, Follow-up ${followUpIndex + 1}, Option ${optionIndex + 1} text is required`);
                                }
                            });
                        }
                    }
                });
            }
        });
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
};

/**
 * Format questionnaire data for display or export
 * @param {Object} questionnaire - The questionnaire object to format
 * @returns {Object} - Formatted questionnaire
 */
export const formatQuestionnaireForDisplay = (questionnaire) => {
  if (!questionnaire) return null;
  
  // Deep copy to avoid modifying original
  const formattedQuestionnaire = JSON.parse(JSON.stringify(questionnaire));
  
  // Add human-readable properties
  formattedQuestionnaire.questions.forEach(question => {
    question.typeDisplay = getQuestionTypeDisplay(question.type);
    
    if (question.followUpQuestion) {
      question.followUpQuestion.typeDisplay = getQuestionTypeDisplay(question.followUpQuestion.type);
    }
  });
  
  return formattedQuestionnaire;
};

/**
 * Get a human-readable display for question types
 */
const getQuestionTypeDisplay = (type) => {
  const displayMap = {
    'text': 'Text Input',
    'number': 'Number Input',
    'radio': 'Single Choice',
    'checkbox': 'Multiple Choice',
    'radio|text': 'Single Choice with Text Input',
    'group': 'Question Group'
  };
  
  return displayMap[type] || type;
};

/**
 * Process form answers into a format suitable for API submission
 * @param {Object} formAnswers - The form answers object
 * @param {Object} questionnaire - The questionnaire object
 * @returns {Array} - Processed answers array
 */
export const processFormAnswers = (formAnswers, questionnaire) => {
    const processedAnswers = [];
    
    questionnaire.questions.forEach((question, index) => {
        const answer = formAnswers[index];
        processedAnswers.push({
            questionIndex: index,
            questionText: question.question,
            answer: answer
        });
        
        // Process follow-up questions (legacy format)
        if (question.followUpQuestion && formAnswers[`followUp_${index}`]) {
            processedAnswers.push({
                questionIndex: `${index}_followUp`,
                questionText: question.followUpQuestion.question,
                answer: formAnswers[`followUp_${index}`],
                isFollowUp: true,
                parentQuestionIndex: index
            });
        }
        
        // Process multiple follow-up questions (new format)
        if (question.followUpQuestions && question.followUpQuestions.length > 0) {
            question.followUpQuestions.forEach((followUp, followUpIndex) => {
                const followUpKey = `followUp_${index}_${followUpIndex}`;
                if (formAnswers[followUpKey] !== undefined) {
                    processedAnswers.push({
                        questionIndex: `${index}_followUp_${followUpIndex}`,
                        questionText: followUp.question,
                        answer: formAnswers[followUpKey],
                        isFollowUp: true,
                        parentQuestionIndex: index,
                        followUpIndex: followUpIndex
                    });
                }
            });
        }
    });
    
    return processedAnswers;
};

/**
 * Get default empty answer based on the question type
 * @param {string} type - Question type
 * @returns {*} - Default empty value for the question type
 */
export const getDefaultEmptyAnswer = (type) => {
    switch (type) {
        case 'checkbox':
            return [];
        case 'radio|text':
            return { option: '', text: '' };
        case 'group':
            return {};
        default:
            return '';
    }
};
