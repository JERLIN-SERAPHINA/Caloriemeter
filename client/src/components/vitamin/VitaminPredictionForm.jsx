import React, { useState } from 'react';
import axios from 'axios';

const VitaminPredictionForm = () => {
    const [symptoms, setSymptoms] = useState('');
    const [diet, setDiet] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/predict', { symptoms, diet });
            setResult(response.data);
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Symptoms" 
                value={symptoms} 
                onChange={(e) => setSymptoms(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Diet" 
                value={diet} 
                onChange={(e) => setDiet(e.target.value)} 
            />
            <button type="submit">Predict Vitamin Deficiency</button>
            {result && <p>Predicted Deficiency: {result}</p>}
        </form>
    );
};

export default VitaminPredictionForm;
