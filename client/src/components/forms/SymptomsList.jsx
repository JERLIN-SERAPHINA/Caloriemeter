import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/l.png';
import img from '../../assets/kids6.jpg'; // Background image

const SymptomsList = () => {
    const [formData, setFormData] = useState({
        ageGroup: '',
        height: '',
        weight: '',
        signsSymptoms: {
            fatigue: false,
            moodChanges: false,
            poorAppetite: false,
            frequentColds: false,
            drySkin: false,
            hairLoss: false,
            slowGrowth: false,
            noWeightGain: false,
            paleSkin: false,
            diarrhea: false,
            constipation: false,
            delayedWalking: false,
            lowAttentionSpan: false,
            squinting: false,
            brittlenails: false,
            frequentheadaches: false,
            musclecramps: false,
            jointpain: false,
            paleconjunctiva: false,
            skinrashes: false,
            sensitivitytolight: false,
            restlesslegssyndrome: false,
            swollengums: false,
            frequentbruising: false,
            insomnia: false,
        },
        dentalIssues: '',
        bloodTest: '',
    });

    const [currentStep, setCurrentStep] = useState(0);
    const [deficiencies, setDeficiencies] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name } = e.target;
        setFormData(prevData => ({
            ...prevData,
            signsSymptoms: {
                ...prevData.signsSymptoms,
                [name]: e.target.checked,
            },
        }));
    };

    const handleNext = (e) => {
        e.preventDefault();
        setCurrentStep(prevStep => prevStep + 1);
    };

    const handlePrev = (e) => {
        e.preventDefault();
        setCurrentStep(prevStep => prevStep - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/symptoms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit data');
            }

            const data = await response.json();
            alert(data.message);
            setDeficiencies(data.deficiencies);

            setTimeout(() => navigate('/dietplan'), 2000);
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting data: ' + error.message);
        }
    };

    return (
        <>
              <nav className="bg-white shadow-md sticky top-0 z-10 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="VitaGuide Logo" className="h-10 mr-3" />
            <span className="text-2xl font-bold text-gray-800">VitaGuide</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/home" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600 font-medium">Services</Link>
            <Link to="/profile" className="text-gray-700 hover:text-blue-600 font-medium">Profile</Link>
          </div>
          
        </div>
      </nav>
            <div
                className="flex justify-center items-center min-h-screen bg-fixed bg-cover bg-center"
                style={{ backgroundImage: `url(${img})` }}
            >
                <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white bg-opacity-90 rounded-lg shadow-xl p-8 m-4">
                    <h1 className="text-3xl font-extrabold mb-6 text-center text-teal-700">Health & Nutritional Assessment</h1>

                    {currentStep === 0 && (
                        <fieldset className="mb-6 space-y-4">
                            <h2 className="text-xl font-semibold text-teal-600 mb-4">General Information</h2>

                            <label className="block">
                                <span className="text-gray-700">Age group of Child</span>
                                <select
                                    name="ageGroup"
                                    value={formData.ageGroup}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 block w-full p-2 border rounded shadow-sm"
                                >
                                    <option value="">Select</option>
                                    <option value="3-5 years">3-5 years</option>
                                    <option value="6-8 years">6-8 years</option>
                                    <option value="9-13 years">9-13 years</option>
                                </select>
                            </label>

                            <label className="block">
                                <span className="text-gray-700">Height (cm)</span>
                                <input
                                    type="number"
                                    name="height"
                                    value={formData.height}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 block w-full p-2 border rounded shadow-sm"
                                />
                            </label>

                            <label className="block">
                                <span className="text-gray-700">Weight (kg)</span>
                                <input
                                    type="number"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 block w-full p-2 border rounded shadow-sm"
                                />
                            </label>
                        </fieldset>
                    )}

                    {currentStep === 1 && (
                        <fieldset className="mb-6 space-y-4">
                            <h2 className="text-xl font-semibold text-teal-600 mb-4">Signs and Symptoms</h2>
                            {Object.keys(formData.signsSymptoms).map(symptom => (
                                <label key={symptom} className="block">
                                    <input
                                        type="checkbox"
                                        name={symptom}
                                        checked={formData.signsSymptoms[symptom]}
                                        onChange={handleCheckboxChange}
                                        className="mr-2 rounded border-gray-300"
                                    />
                                    {symptom.charAt(0).toUpperCase() + symptom.slice(1).replace(/([A-Z])/g, ' $1')}
                                </label>
                            ))}
                        </fieldset>
                    )}

                    {currentStep === 2 && (
                        <fieldset className="mb-6 space-y-4">
                            <label className="block">
                                <span className="text-gray-700">Dental Issues (e.g., frequent cavities)</span>
                                <select
                                    name="dentalIssues"
                                    value={formData.dentalIssues}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 block w-full p-2 border rounded shadow-sm"
                                >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </label>

                            <label className="block">
                                <span className="text-gray-700">Blood Test Results (e.g., low iron)</span>
                                <select
                                    name="bloodTest"
                                    value={formData.bloodTest}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 block w-full p-2 border rounded shadow-sm"
                                >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </label>
                        </fieldset>
                    )}

                    <div className="flex justify-between">
                        {currentStep > 0 && (
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="py-2 px-4 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                            >
                                Previous
                            </button>
                        )}
                        {currentStep < 2 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="py-2 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="py-2 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                            >
                                Submit & Next
                            </button>
                        )}
                    </div>

                    {deficiencies.length > 0 && (
                        <div className="mt-8 p-4 bg-teal-100 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold text-teal-700">Predicted Deficiencies:</h2>
                            <ul className="list-disc pl-6 text-teal-800">
                                {deficiencies.map((deficiency, index) => (
                                    <li key={index}>{deficiency}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </form>
            </div>
        </>
    );
};

export default SymptomsList;
