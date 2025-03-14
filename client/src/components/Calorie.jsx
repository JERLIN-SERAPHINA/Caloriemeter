import React, { useState, useEffect, useRef } from 'react';
import { Line, Bar, Pie, Radar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const Calorie = () => {
  const [query, setQuery] = useState('');
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [eatenFoods, setEatenFoods] = useState([]);
  const [dayFoods, setDayFoods] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [historyFilter, setHistoryFilter] = useState('pastWeek');
  const [demoDate, setDemoDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState('');
  const [error, setError] = useState('');
  const [dailyCalorieGoal, setDailyCalorieGoal] = useState(2000);
  const [selectedFood, setSelectedFood] = useState(null);
  const [mealType, setMealType] = useState('snack');
  const [mealTimingData, setMealTimingData] = useState([]);
  const [nutrientDistribution, setNutrientDistribution] = useState({});
  const [activeView, setActiveView] = useState('dashboard');
  const [nutrientGoals, setNutrientGoals] = useState({ protein: 50, fat: 70, carbs: 310 });
  const [macroPercentages, setMacroPercentages] = useState({ protein: 20, fat: 30, carbs: 50 });

  const chartRef = useRef(null);
  const backendUrl = 'http://localhost:5000';

    const fetchEatenFoods = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/eaten-foods`);
            if (!response.ok) throw new Error('Failed to fetch eaten foods.');
            const data = await response.json();
            setEatenFoods(data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch today\'s foods: ' + err.message);
        }
    };

    const fetchHistory = async () => {
        try {
            let days = 7;
            if (historyFilter === 'pastDay') days = 1;
            if (historyFilter === 'pastWeek') days = 7;
            if (historyFilter === 'pastMonth') days = 30;
            if (historyFilter === 'allTime') days = 365;

            const response = await fetch(`${backendUrl}/api/history?days=${days}`);
            if (!response.ok) throw new Error('Failed to fetch history.');
            const data = await response.json();
            setHistoryData(data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch history: ' + err.message);
        }
    };

    const fetchMealTiming = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/meal-timing`);
            if (!response.ok) throw new Error('Failed to fetch meal timing data.');
            const data = await response.json();
            setMealTimingData(data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch meal timing data: ' + err.message);
        }
    };

    const fetchNutrientDistribution = async () => {
        try {
            const date = selectedDate || demoDate || new Date().toISOString().slice(0, 10);
            const response = await fetch(`${backendUrl}/api/nutrient-distribution?date=${date}`);
            if (!response.ok) throw new Error('Failed to fetch nutrient distribution.');
            const data = await response.json();
            setNutrientDistribution(data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch nutrient distribution: ' + err.message);
        }
    };

    const fetchFoodsByDate = async (date) => {
        try {
            const response = await fetch(`${backendUrl}/api/eaten-foods-by-date/${date}`);
            if (!response.ok) throw new Error('Failed to fetch foods for the selected date.');
            const data = await response.json();
            setDayFoods(data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch foods for date: ' + err.message);
        }
    };

    useEffect(() => {
        fetchEatenFoods();
        fetchHistory();
        fetchMealTiming();
        fetchNutrientDistribution();
    }, []);

    useEffect(() => {
        fetchHistory();
    }, [historyFilter]);

    useEffect(() => {
        if (demoDate) {
            setSelectedDate(demoDate);
            fetchFoodsByDate(demoDate);
            fetchNutrientDistribution();
        }
    }, [demoDate]);

    useEffect(() => {
        if (selectedDate) {
            fetchFoodsByDate(selectedDate);
            fetchNutrientDistribution();
        }
    }, [selectedDate]);
  useEffect(() => {
        const fetchAutocomplete = async () => {
            if (query.trim() === '') {
                setAutocompleteResults([]);
                setShowDropdown(false); // Close dropdown when query is empty
                return;
            }
            setLoading(true); // Start loading
            try {
                const response = await fetch(`${backendUrl}/api/nutrition`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query })
                });
                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.error || 'Error fetching autocomplete data.');
                }
                const data = await response.json();
                setAutocompleteResults(data.foods || []);
                setShowDropdown(true);
            } catch (err) {
                console.error(err);
                setError('Search error: ' + err.message);
            } finally {
                setLoading(false); // End loading
            }
        };

        const debounceTimeout = setTimeout(fetchAutocomplete, 300);
        return () => clearTimeout(debounceTimeout);
    }, [query]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${backendUrl}/api/nutrition`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Error fetching nutrition data.');
            }
            const data = await response.json();
            setSearchResults(data.foods || []);
            setShowDropdown(false); // Hide dropdown after search
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectSuggestion = (food) => {
      setQuery(food.food_name);
      setShowDropdown(false);
      setSearchResults([food]);
      setAutocompleteResults([]);  // Clear Autocomplete after a selection
    };


    const handleAddFood = async (food) => {
        setError('');
        setWarning('');
        try {
            const response = await fetch(`${backendUrl}/api/eat-food`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ food, demoDate: demoDate || null, mealType })
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Error adding food.');
            }
            const data = await response.json();
            let warnings = [];
            if (data.warnings.consecutiveDayWarning) warnings.push(`You ate ${food.food_name} yesterday!`);
            if (data.warnings.tooQuickWarning) warnings.push('You are adding foods too quickly!');
            if (data.warnings.calorieLimitWarning) warnings.push('Your total calorie intake is over the limit!');
            if (warnings.length > 0) setWarning(warnings.join(' '));

            fetchEatenFoods();
            fetchHistory();
            fetchMealTiming();
            fetchNutrientDistribution();
            if (demoDate || selectedDate) fetchFoodsByDate(demoDate || selectedDate);
            setSearchResults([]);
            setQuery('');
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    const handleChartClick = (event) => {
      if (chartRef.current) {
        const chart = chartRef.current;
        const elements = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);

        if (elements.length > 0) { // Check if elements array is not empty
            const { index } = elements[0];
            if(historyData[index] && historyData[index].date) {
                const date = historyData[index].date;
                setSelectedDate(date);
            }

        }
      }
    };

    const activeFoods = selectedDate ? dayFoods : eatenFoods;
    const cumulativeNutrients = activeFoods.reduce((acc, food) => {
        acc.nf_calories += food.nf_calories || 0;
        acc.nf_total_fat += food.nf_total_fat || 0;
        acc.nf_total_carbohydrate += food.nf_total_carbohydrate || 0;
        acc.nf_protein += food.nf_protein || 0;
        return acc;
    }, { nf_calories: 0, nf_total_fat: 0, nf_total_carbohydrate: 0, nf_protein: 0 });

    const totalCalories = cumulativeNutrients.nf_calories;
    const progressPercent = Math.min((totalCalories / dailyCalorieGoal) * 100, 100);

    const calorieChartData = {
        labels: historyData.map(day => day.date),
        datasets: [
            {
                label: 'Total Calories',
                data: historyData.map(day => day.totalCalories),
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)'
            },
            {
                label: 'Calorie Goal',
                data: historyData.map(() => dailyCalorieGoal),
                fill: false,
                borderColor: 'rgba(255,99,132,1)',
                borderDash: [5, 5]
            }
        ]
    };

  const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Calories'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Date'
                }
            }
        }
    };
    const nutrientChartData = {
        labels: historyData.map(day => day.date),
        datasets: [
            {
                label: 'Fat (g)',
                data: historyData.map(day => day.totalFat),
                fill: false,
                borderColor: 'rgba(255,99,132,1)'
            },
            {
                label: 'Carbs (g)',
                data: historyData.map(day => day.totalCarbs),
                fill: false,
                borderColor: 'rgba(54, 162, 235, 1)'
            },
            {
                label: 'Protein (g)',
                data: historyData.map(day => day.totalProtein),
                fill: false,
                borderColor: 'rgba(255, 206, 86, 1)'
            }
        ]
    };

    const prepareMealDistributionData = () => {
        const foods = selectedDate ? dayFoods : eatenFoods;
        const mealCounts = { breakfast: 0, lunch: 0, dinner: 0, snack: 0 };
        const mealCalories = { breakfast: 0, lunch: 0, dinner: 0, snack: 0 };

        foods.forEach(food => {
            const mealType = food.meal_type || 'snack';
            mealCounts[mealType]++;
            mealCalories[mealType] += (food.nf_calories || 0);
        });

        return {
            labels: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
            datasets: [{
                data: [mealCalories.breakfast, mealCalories.lunch, mealCalories.dinner, mealCalories.snack],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                ],
                borderWidth: 1
            }]
        };
    };

    const mealDistributionData = prepareMealDistributionData();

    const prepareMealTimingData = () => {
        const hourData = Array(24).fill(0).map((_, i) => ({ hour: i, count: 0, totalCalories: 0 }));

        mealTimingData.forEach(item => {
            const hour = parseInt(item.hour);
            if (hour >= 0 && hour < 24) {
                hourData[hour].count += item.count;
                hourData[hour].totalCalories += (item.avgCalories * item.count);
            }
        });

        return {
            labels: hourData.map(h => `${h.hour}:00`),
            datasets: [{
                label: 'Average Calories per Meal by Hour',
                data: hourData.map(h => h.count > 0 ? (h.totalCalories / h.count).toFixed(0) : 0),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        };
    };

    const mealTimingChartData = prepareMealTimingData();

    const prepareMacroRadarData = () => {
      const currentMacros = {
        protein: cumulativeNutrients.nf_protein,
        fat: cumulativeNutrients.nf_total_fat,
        carbs: cumulativeNutrients.nf_total_carbohydrate,
      };

      // Calculate percentages based on current intake
      const totalCalFromMacros = (currentMacros.protein * 4) + (currentMacros.fat * 9) + (currentMacros.carbs * 4);  // Calories per gram

      const proteinPercent = totalCalFromMacros > 0 ? ((currentMacros.protein * 4) / totalCalFromMacros) * 100 : 0;
      const fatPercent = totalCalFromMacros > 0 ? ((currentMacros.fat * 9) / totalCalFromMacros) * 100 : 0;
      const carbsPercent = totalCalFromMacros > 0 ? ((currentMacros.carbs * 4) / totalCalFromMacros) * 100 : 0;

      return {
        labels: ['Protein', 'Fat', 'Carbohydrates'],
        datasets: [
          {
            label: 'Current Intake (%)',
            data: [proteinPercent, fatPercent, carbsPercent],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
          {
            label: 'Goal (%)',
            data: [macroPercentages.protein, macroPercentages.fat, macroPercentages.carbs],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };
    };


    const macroRadarData = prepareMacroRadarData();

    const prepareNutrientByMealData = () => {
        const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
        const mealLabels = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

        const proteinData = mealTypes.map(type => nutrientDistribution[type] ? nutrientDistribution[type].protein : 0);
        const fatData = mealTypes.map(type => nutrientDistribution[type] ? nutrientDistribution[type].fat : 0);
        const carbData = mealTypes.map(type => nutrientDistribution[type] ? nutrientDistribution[type].carbs : 0);

        return {
            labels: mealLabels,
            datasets: [
                {
                    label: 'Protein (g)', data: proteinData,
                    backgroundColor: 'rgba(255, 206, 86, 0.6)', borderColor: 'rgba(255, 206, 86, 1)', borderWidth: 1, stack: 'Stack 0'
                },
                {
                    label: 'Fat (g)', data: fatData,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)', borderColor: 'rgba(255, 99, 132, 1)', borderWidth: 1, stack: 'Stack 0'
                },
                {
                    label: 'Carbs (g)', data: carbData,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)', borderColor: 'rgba(54, 162, 235, 1)', borderWidth: 1, stack: 'Stack 0'
                }
            ]
        };
    };

    const nutrientByMealData = prepareNutrientByMealData();

    const computeFilteredAverages = () => {
        if (!historyData.length) return { avgFat: 0, avgCarbs: 0, avgProtein: 0, avgCalories: 0 };

        let totalFat = 0, totalCarbs = 0, totalProtein = 0, totalCalories = 0, days = 0;

        historyData.forEach(day => {
            if (day.count > 0) {
                totalFat += day.totalFat;
                totalCarbs += day.totalCarbs;
                totalProtein += day.totalProtein;
                totalCalories += day.totalCalories;
                days++;
            }
        });

        if (days === 0) return { avgFat: 0, avgCarbs: 0, avgProtein: 0, avgCalories: 0 };

        return {
            avgFat: (totalFat / days).toFixed(2),
            avgCarbs: (totalCarbs / days).toFixed(2),
            avgProtein: (totalProtein / days).toFixed(2),
            avgCalories: (totalCalories / days).toFixed(2)
        };
    };

    const filteredAverages = computeFilteredAverages();

    const calculateStreak = () => {
        if (!historyData.length) return 0;
        let streak = 0;
        const sortedData = [...historyData].sort((a, b) => new Date(b.date) - new Date(a.date));
        const today = new Date().toISOString().slice(0, 10);
        let currentDate = new Date(today);

        for (const day of sortedData) {
            const dayDate = new Date(day.date);
            const expectedDate = new Date(currentDate);
            if (streak === 0 && day.date !== today) break;
            if (dayDate.toISOString().slice(0, 10) === expectedDate.toISOString().slice(0, 10) && day.count > 0) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else {
                break;
            }
        }
        return streak;
    };

    const currentStreak = calculateStreak();
    const renderNavigation = () => (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            {['dashboard', 'search', 'charts'].map((view) => (
                <button
                    key={view}
                    style={{
                        ...buttonStyle,
                        backgroundColor: activeView === view ? '#4CAF50' : '#f5f5f5',
                                                color: activeView === view ? 'white' : 'black',
                        margin: '0 5px'
                    }}
                    onClick={() => setActiveView(view)}
                >
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
            ))}
        </div>
    );
const renderMacroGoalsEditor = () => (<></>)
    // const renderMacroGoalsEditor = () => (
    //     <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
    //         <h3>Macronutrient Goals</h3>
    //         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
    //             <div>
    //                 <label>Protein (g): </label>
    //                 <input
    //                     type="number"
    //                     value={nutrientGoals.protein}
    //                     onChange={(e) => setNutrientGoals({ ...nutrientGoals, protein: Number(e.target.value) })}
    //                     style={{ width: '60px', padding: '5px' }}
    //                 />
    //             </div>
    //             <div>
    //                 <label>Fat (g): </label>
    //                 <input
    //                     type="number"
    //                     value={nutrientGoals.fat}
    //                     onChange={(e) => setNutrientGoals({ ...nutrientGoals, fat: Number(e.target.value) })}
    //                     style={{ width: '60px', padding: '5px' }}
    //                 />
    //             </div>
    //             <div>
    //                 <label>Carbs (g): </label>
    //                 <input
    //                     type="number"
    //                     value={nutrientGoals.carbs}
    //                     onChange={(e) => setNutrientGoals({ ...nutrientGoals, carbs: Number(e.target.value) })}
    //                     style={{ width: '60px', padding: '5px' }}
    //                 />
    //             </div>
    //         </div>

    //         <h4>Macro Percentages (Based on 2000 Calorie Goal)</h4>
    //          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
    //             <div>
    //                 <label>Protein (%): </label>
    //                 <input
    //                     type="number"
    //                     value={macroPercentages.protein}
    //                     onChange={(e) => setMacroPercentages({ ...macroPercentages, protein: Number(e.target.value) })}
    //                     style={{ width: '60px', padding: '5px' }}
    //                 />
    //             </div>
    //             <div>
    //                 <label>Fat (%): </label>
    //                 <input
    //                     type="number"
    //                     value={macroPercentages.fat}
    //                     onChange={(e) => setMacroPercentages({ ...macroPercentages, fat: Number(e.target.value) })}
    //                     style={{ width: '60px', padding: '5px' }}
    //                 />
    //             </div>
    //             <div>
    //                 <label>Carbs (%): </label>
    //                 <input
    //                     type="number"
    //                     value={macroPercentages.carbs}
    //                     onChange={(e) => setMacroPercentages({ ...macroPercentages, carbs: Number(e.target.value) })}
    //                     style={{ width: '60px', padding: '5px' }}
    //                 />
    //             </div>
    //         </div>
    //     </div>
    // );


    const containerStyle = { maxWidth: '1100px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' };
    const headerStyle = { textAlign: 'center', marginBottom: '20px' };
    const formStyle = { display: 'flex', justifyContent: 'center', marginBottom: '20px', position: 'relative' };
    const inputStyle = { padding: '10px', fontSize: '16px', width: '300px', marginRight: '10px' };
    const buttonStyle = { padding: '10px 20px', fontSize: '16px', cursor: 'pointer' };
    const dropdownStyle = { position: 'absolute', top: '45px', left: '0', width: '300px', background: '#fff', border: '1px solid #ddd', zIndex: 10 };
    const dropdownItemStyle = { padding: '10px', cursor: 'pointer', borderBottom: '1px solid #eee' };
    const cardContainerStyle = { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' };
    const cardStyle = { display: 'flex', border: '1px solid #ddd', borderRadius: '8px', width: '500px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', overflow: 'hidden' };
    const imageStyle = { width: '40%', objectFit: 'cover' };
    const cardContentStyle = { width: '60%', padding: '15px' };
    const nutritionInfoStyle = { fontSize: '14px', lineHeight: '1.5' };
    const warningStyle = { color: 'red', marginBottom: '10px', textAlign: 'center' };
    const errorStyle = { color: 'red', marginBottom: '10px', textAlign: 'center' };
    const dashboardSectionStyle = { marginTop: '40px' };
    const progressContainerStyle = { backgroundColor: '#e0e0e0', borderRadius: '25px', overflow: 'hidden', marginBottom: '20px' };
    const progressBarStyle = { height: '25px', backgroundColor: '#4CAF50', width: `${progressPercent}%`, transition: 'width 0.5s' };
    const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' };
    const modalContentStyle = { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', maxWidth: '500px', width: '90%' };
    const tabContentStyle = { padding: '20px', border: '1px solid #ddd', borderRadius: '8px', marginTop: '20px' };
    const statCardStyle = { padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', margin: '10px', flex: '1', minWidth: '200px', textAlign: 'center' };
    const chartContainerStyle = { height: '300px', marginBottom: '30px' };

    const renderDashboardView = () => (
        <div style={dashboardSectionStyle}>
            <h2>{selectedDate ? `Intake for ${selectedDate}` : "Today's Intake"}</h2>
            <div style={progressContainerStyle}>
                <div style={progressBarStyle}></div>
            </div>
            <p>
                <strong>Calorie Progress:</strong> {totalCalories.toFixed(0)} / {dailyCalorieGoal} ({progressPercent.toFixed(0)}%)
            </p>
            <p>
                <strong>Macronutrient Breakdown (Current Intake):</strong><br />
                Fat: {cumulativeNutrients.nf_total_fat.toFixed(1)}g,
                Carbs: {cumulativeNutrients.nf_total_carbohydrate.toFixed(1)}g,
                Protein: {cumulativeNutrients.nf_protein.toFixed(1)}g
            </p>

            <div style={cardContainerStyle}>
                <div style={statCardStyle}>
                    <h3>{currentStreak} Days</h3>
                    <p>Current Streak</p>
                </div>
                <div style={statCardStyle}>
                    <h3>{filteredAverages.avgCalories}</h3>
                    <p>Avg Daily Calories ({historyFilter})</p>
                </div>
                <div style={statCardStyle}>
                    <h3>{filteredAverages.avgProtein}g</h3>
                    <p>Avg Daily Protein ({historyFilter})</p>
                </div>
            </div>

            <h3>Foods Eaten {selectedDate ? `on ${selectedDate}` : "Today"}</h3>
            {activeFoods.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {activeFoods.map((food, index) => (
                        <li key={index} style={{ padding: '10px', borderBottom: '1px solid #ddd', cursor: 'pointer' }} onClick={() => setSelectedFood(food)}>
                            <strong>{food.food_name}</strong> — {food.nf_calories} Calories ({food.meal_type})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No foods recorded for this day.</p>
            )}
        </div>
    );

    const renderSearchView = () => (
        <div>
            <form style={formStyle} onSubmit={handleSearch}>
                <input
                    type="text"
                    style={inputStyle}
                    placeholder="Search for food..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowDropdown(true); // Show dropdown on input change
                    }}
                    onFocus={() => setShowDropdown(true)} // Show dropdown on focus
                />
               <button type="submit" style={buttonStyle} disabled={loading}>{loading ? 'Searching...' : 'Search'}</button>
                {showDropdown && autocompleteResults.length > 0 && (
                    <div style={dropdownStyle}>
                        {autocompleteResults.map((food, index) => (
                            <div key={index} style={dropdownItemStyle} onClick={() => handleSelectSuggestion(food)}>
                                {food.food_name} {food.brand_name ? `(${food.brand_name})` : ''}
                            </div>
                        ))}
                    </div>
                )}
            </form>

            {searchResults.length > 0 && (
                <div style={cardContainerStyle}>
                    {searchResults.map((food, index) => (
                        <div key={index} style={cardStyle}>
                            {food.photo && food.photo.thumb ? (
                                <img src={food.photo.thumb} alt={food.food_name} style={imageStyle} />
                            ) : (
                                <div style={{ ...imageStyle, backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    No Image
                                </div>
                            )}
                            <div style={cardContentStyle}>
                                <h3>{food.food_name}</h3>
                                <p style={nutritionInfoStyle}>
                                    <strong>Brand:</strong> {food.brand_name || 'N/A'}<br />
                                    <strong>Serving:</strong> {food.serving_qty} {food.serving_unit} ({food.serving_weight_grams}g)<br />
                                    <strong>Calories:</strong> {food.nf_calories}<br />
                                    <strong>Fat:</strong> {food.nf_total_fat}g<br />
                                    <strong>Carbs:</strong> {food.nf_total_carbohydrate}g<br />
                                    <strong>Protein:</strong> {food.nf_protein}g
                                </p>
                                <div style={{ marginBottom: '10px' }}>
                                    <label htmlFor={`meal-type-${index}`} style={{ marginRight: '10px' }}>Meal Type:</label>
                                    <select id={`meal-type-${index}`} value={mealType} onChange={(e) => setMealType(e.target.value)}>
                                        <option value="breakfast">Breakfast</option>
                                        <option value="lunch">Lunch</option>
                                        <option value="dinner">Dinner</option>
                                        <option value="snack">Snack</option>
                                    </select>
                                </div>
                                <button style={buttonStyle} onClick={() => handleAddFood({ ...food, meal_type: mealType })}>Add Food</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    const renderChartsView = () => (
        <div>
            <div style={{ marginTop: '20px' }}>
                <h2>Historical Calorie Intake</h2>
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <label>
                        Filter Historical Data:
                        <select value={historyFilter} onChange={(e) => setHistoryFilter(e.target.value)} style={{ marginLeft: '10px', padding: '5px' }}>
                            <option value="pastDay">Past Day</option>
                            <option value="pastWeek">Past Week</option>
                            <option value="pastMonth">Past Month</option>
                            <option value="allTime">All Time</option>
                        </select>
                    </label>
                </div>
                <div style={chartContainerStyle}>
                    <Line ref={chartRef} data={calorieChartData} options={chartOptions} onClick={handleChartClick} />
                </div>
            </div>

            <div style={{ marginTop: '20px' }}>
                <h2>Nutrient Trends (Averages per Day)</h2>
                <div style={chartContainerStyle}>
                    <Line data={nutrientChartData} options={chartOptions} />
                </div>
            </div>

            <div style={{ marginTop: '20px' }}>
                <h2>Meal Distribution</h2>
                <div style={chartContainerStyle}>
                    <Pie data={mealDistributionData} />
                </div>
            </div>

            {/* <div style={{ marginTop: '20px' }}>
                <h2>Meal Timing - Average Calories by Hour</h2>
                <div style={chartContainerStyle}>
                    <Bar data={mealTimingChartData} options={chartOptions} />
                </div>
            </div> */}

            <div style={{ marginTop: '20px' }}>
                <h2>Nutrient Breakdown by Meal Type</h2>
                <div style={chartContainerStyle}>
                    <Bar data={nutrientByMealData} options={chartOptions} />
                </div>
            </div>

            {/* <div style={{ marginTop: '20px' }}>
                <h2>Macronutrient Intake vs. Goals ({selectedDate || 'Today'})</h2>
                <div style={chartContainerStyle}>
                    <Radar data={macroRadarData} />
                </div>
            </div> */}
        </div>
    );

    const renderInsightsView = () => (
        <div>
            <h2>Insights & Analysis</h2>

            <div style={cardContainerStyle}>
                <div style={statCardStyle}>
                    <h3>{filteredAverages.avgCalories}</h3>
                    <p>Average Daily Calories ({historyFilter})</p>
                </div>
                <div style={statCardStyle}>
                    <h3>{filteredAverages.avgProtein}g</h3>
                    <p>Average Daily Protein ({historyFilter})</p>
                </div>
                <div style={statCardStyle}>
                    <h3>{filteredAverages.avgFat}g</h3>
                    <p>Average Daily Fat ({historyFilter})</p>
                </div>
                <div style={statCardStyle}>
                    <h3>{filteredAverages.avgCarbs}g</h3>
                    <p>Average Daily Carbs ({historyFilter})</p>
                </div>
                <div style={statCardStyle}>
                    <h3>{currentStreak} Days</h3>
                    <p>Current Calorie Tracking Streak</p>
                </div>
            </div>
{/* 
            <div style={{ marginTop: '30px' }}>
                <h3>Meal Timing Insights</h3>
                <p>
                    Based on your meal history, you tend to have your highest calorie meals around <strong>{mealTimingChartData.datasets[0].data.indexOf(Math.max(...mealTimingChartData.datasets[0].data))}:00</strong>.
                </p>
            </div>

            <div style={{ marginTop: '30px' }}>
                <h3>Nutrient Distribution by Meal</h3>
                <p>
                    Your nutrient intake distribution across meals for {selectedDate || 'today'} is visualized in the charts section. You can analyze if you are getting balanced nutrients across different meals.
                </p>
            </div>

            <div style={{ marginTop: '30px' }}>
                <h3>Macronutrient Balance</h3>
                <p>
                    Compare your current macronutrient intake against your goals in the radar chart in the charts section to see how well you are aligning with your targets.
                </p>
            </div> */}
        </div>
    );



    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Calorie Meter Dashboard</h1>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <label>
                    Daily Calorie Goal:
                    <input type="number" value={dailyCalorieGoal} onChange={(e) => setDailyCalorieGoal(Number(e.target.value))} style={{ marginLeft: '10px', padding: '5px', width: '100px' }} />
                </label>
            </div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <label>
                    Demo Date:
                    <input type="date" value={demoDate} onChange={(e) => setDemoDate(e.target.value)} style={{ marginLeft: '10px', padding: '5px', width: '150px' }} />
                </label>
                {demoDate && <p>Using demo date: {demoDate}</p>}
            </div>

            {warning && <div style={warningStyle}>{warning}</div>}
            {error && <div style={errorStyle}>{error}</div>}

            {renderNavigation()}

            <div style={tabContentStyle}>
                {activeView === 'dashboard' && renderDashboardView()}
                {activeView === 'search' && renderSearchView()}
                {activeView === 'charts' && renderChartsView()}
                {/* {activeView === 'insights' && renderInsightsView()} */}
            </div>

            {renderMacroGoalsEditor()}

            {selectedFood && (
                <div style={modalOverlayStyle} onClick={() => setSelectedFood(null)}>
                    <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                        <h3>{selectedFood.food_name} Details</h3>
                        <p style={nutritionInfoStyle}>
                            <strong>Brand:</strong> {selectedFood.brand_name || 'N/A'}<br />
                            <strong>Serving:</strong> {selectedFood.serving_qty} {selectedFood.serving_unit} ({selectedFood.serving_weight_grams}g)<br />
                            <strong>Calories:</strong> {selectedFood.nf_calories}<br />
                            <strong>Total Fat:</strong> {selectedFood.nf_total_fat} g<br />
                            <strong>Saturated Fat:</strong> {selectedFood.nf_saturated_fat} g<br />
                            <strong>Cholesterol:</strong> {selectedFood.nf_cholesterol} mg<br />
                            <strong>Sodium:</strong> {selectedFood.nf_sodium} mg<br />
                            <strong>Total Carbs:</strong> {selectedFood.nf_total_carbohydrate} g<br />
                            <strong>Dietary Fiber:</strong> {selectedFood.nf_dietary_fiber} g<br />
                            <strong>Sugars:</strong> {selectedFood.nf_sugars} g<br />
                            <strong>Protein:</strong> {selectedFood.nf_protein} g<br />
                            <strong>Meal Type:</strong> {selectedFood.meal_type}
                        </p>
                        <button style={buttonStyle} onClick={() => setSelectedFood(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calorie;