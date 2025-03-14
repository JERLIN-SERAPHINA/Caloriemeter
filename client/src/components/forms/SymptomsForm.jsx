import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SymptomsForm = () => {
  const [formData, setFormData] = useState({
    ageGroup: '',
    activityLevel: '',
    energyLevels: '',
    musclePain: '',
    bleedingGums: '',
    eyeHealth: '',
    weightLoss: '',
    bonePain: '',
    sleepQuality: '',
    skinIssues: '',
    moodSwings: '',
    frequentIllness: '',
    diet: ''
  });

  const [result, setResult] = useState(null);
  const [age, setAge] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/personal-details');
        const user = response.data;
        setAge(user.dob ? calculateAge(new Date(user.dob)) : '');
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, []);

  const calculateAge = (dob) => {
    const diff = Date.now() - dob.getTime();
    const age = new Date(diff).getUTCFullYear() - 1970;
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let deficiencyScores = {
      'Vitamin A': 0,
      'Vitamin B1 (Thiamine)': 0,
      'Vitamin B2 (Riboflavin)': 0,
      'Vitamin B6': 0,
      'Vitamin B12': 0,
      'Folic Acid (Vitamin B9)': 0,
      'Vitamin C': 0,
      'Vitamin D': 0,
      'Vitamin E': 0,
      'Vitamin K': 0,
    };

    const {
      activityLevel,
      energyLevels,
      musclePain,
      bleedingGums,
      eyeHealth,
      weightLoss,
      bonePain,
      sleepQuality,
      skinIssues,
      moodSwings,
      frequentIllness,
      diet
    } = formData;

    // Deficiency analysis based on symptoms
    if (musclePain === 'yes') {
      deficiencyScores['Vitamin D'] += 2; // Major impact
      deficiencyScores['Vitamin E'] += 1;
    }
    if (bleedingGums === 'yes') {
      deficiencyScores['Vitamin C'] += 3; // Major impact
    }
    if (eyeHealth === 'poor') {
      deficiencyScores['Vitamin A'] += 3; // Major impact
    }
    if (energyLevels === 'low') {
      deficiencyScores['Vitamin B12'] += 2; // Major impact
      deficiencyScores['Vitamin B6'] += 1;
    }
    if (weightLoss === 'yes') {
      deficiencyScores['Vitamin B1 (Thiamine)'] += 3; // Major impact
    }
    if (bonePain === 'yes') {
      deficiencyScores['Vitamin D'] += 3; // Major impact
    }
    if (sleepQuality === 'poor') {
      deficiencyScores['Vitamin B6'] += 1;
      deficiencyScores['Vitamin B12'] += 2; // Major impact
    }
    if (skinIssues === 'yes') {
      deficiencyScores['Vitamin A'] += 1;
      deficiencyScores['Vitamin E'] += 2; // Major impact
    }
    if (moodSwings === 'yes') {
      deficiencyScores['Folic Acid (Vitamin B9)'] += 3; // Major impact
    }
    if (frequentIllness === 'yes') {
      deficiencyScores['Vitamin C'] += 2; // Major impact
    }

    // Dietary impact
    const dietLower = diet.toLowerCase();
    if (dietLower.includes('no fruits')) {
      deficiencyScores['Vitamin C'] += 3; // Major impact
      deficiencyScores['Vitamin A'] += 1;
    }
    if (dietLower.includes('no dairy')) {
      deficiencyScores['Vitamin D'] += 3; // Major impact
      deficiencyScores['Vitamin B2 (Riboflavin)'] += 2;
    }

    // Age and activity level adjustments
    if (age < 5 && activityLevel === 'high') {
      deficiencyScores['Vitamin D'] += 1; // Young children need more Vitamin D
    }
    if (age >= 5 && age <= 12 && activityLevel === 'low') {
      deficiencyScores['Vitamin A'] += 1; // Children in this range with low activity may need more Vitamin A
    }

    // Aggregate deficiencies with refined thresholds
    let potentialDeficiencies = [];
    for (let [vitamin, score] of Object.entries(deficiencyScores)) {
      if (score >= 2) { // Adjust threshold for better precision
        potentialDeficiencies.push(vitamin);
      }
    }

    setResult(potentialDeficiencies.length > 0 ? potentialDeficiencies.join(', ') : 'No significant deficiencies found based on the given information.');
  };

  return (
    <>
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-8">Check Your Child's Vitamin Deficiency</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Age Group */}
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="ageGroup">Child's Age Group</label>
          <select id="ageGroup" name="ageGroup" value={formData.ageGroup} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:ring-2">
            <option value="">Select Age Group</option>
            <option value="3-5">3-5 years (Early childhood)</option>
            <option value="6-8">6-8 years (Early childhood)</option>
            <option value="9-12">9-12 years (Mid childhood)</option>
            <option value="13-19">13-19 years (Adolescent)</option>
          </select>
        </div>

        {/* Activity Level */}
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="activityLevel">Activity Level</label>
          <select id="activityLevel" name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:ring-2">
            <option value="">Select Activity Level</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Energy Levels */}
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="energyLevels">Energy Levels</label>
          <select id="energyLevels" name="energyLevels" value={formData.energyLevels} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:ring-2">
            <option value="">Select Energy Levels</option>
            <option value="high">High</option>
            <option value="moderate">Moderate</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Symptoms - Muscle Pain */}
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="musclePain">Muscle Pain or Weakness</label>
          <select id="musclePain" name="musclePain" value={formData.musclePain} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:ring-2">
            <option value="">Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Symptoms - Weight Loss */}
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="weightLoss">Unintended Weight Loss</label>
          <select id="weightLoss" name="weightLoss" value={formData.weightLoss} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:ring-2">
            <option value="">Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Symptoms - Bleeding Gums */}
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="bleedingGums">Bleeding Gums</label>
          <select id="bleedingGums" name="bleedingGums" value={formData.bleedingGums} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:ring-2">
            <option value="">Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Symptoms - Eye Health */}
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="eyeHealth">Eye Health</label>
          <select id="eyeHealth" name="eyeHealth" value={formData.eyeHealth} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:ring-2">
            <option value="">Select Option</option>
            <option value="good">Good</option>
            <option value="poor">Poor</option>
          </select>
        </div>

        {/* Symptoms - Bone Pain */}
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="bonePain">Bone Pain</label>
          <select id="bonePain" name="bonePain" value={formData.bonePain} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:ring-2">
            <option value="">Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Symptoms - Sleep Quality */}
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="sleepQuality">Sleep Quality</label>
          <select id="sleepQuality" name="sleepQuality" value={formData.sleepQuality} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:ring-2">
            <option value="">Select Option</option>
            <option value="good">Good</option>
            <option value="poor">Poor</option>
          </select>
        </div>

        {/* Symptoms - Skin Issues */}
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="skinIssues">Skin Issues</label>
          <select id="skinIssues" name="skinIssues" value={formData.skinIssues} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:ring-2">
            <option value="">Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Symptoms - Mood Swings */}
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="moodSwings">Mood Swings</label>
          <select id="moodSwings" name="moodSwings" value={formData.moodSwings} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:ring-2">
            <option value="">Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Symptoms - Frequent Illness */}
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="frequentIllness">Frequent Illness</label>
          <select id="frequentIllness" name="frequentIllness" value={formData.frequentIllness} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:ring-2">
            <option value="">Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Diet */}
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="diet">Dietary Habits</label>
          <textarea id="diet" name="diet" value={formData.diet} onChange={handleChange} rows="3" className="w-full px-4 py-3 border rounded-lg focus:ring-2" placeholder="Describe dietary habits..."></textarea>
        </div>

        <button type="submit" className="w-full py-3 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Check for Deficiencies</button>
      </form>

      {result && (
        <div className="mt-8 p-4 bg-gray-100 border rounded">
          <h3 className="text-xl font-bold">Potential Deficiencies:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
    </>
  );
};

export default SymptomsForm;
