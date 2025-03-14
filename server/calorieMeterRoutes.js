require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const NUTRITIONIX_API_ENDPOINT = 'https://trackapi.nutritionix.com/v2/natural/nutrients';

const db = new sqlite3.Database('./nutrition.db', (err) => {
    if (err) {
        console.error("Database connection error:", err.message);
    } else {
        console.log('Connected to SQLite database.');
        db.run(`
            CREATE TABLE IF NOT EXISTS eaten_foods (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                food_name TEXT NOT NULL,
                nutrition_data TEXT NOT NULL,
                eaten_date TEXT NOT NULL,
                eaten_at TEXT NOT NULL,
                meal_type TEXT DEFAULT 'snack'
            )
        `, (createTableErr) => {
            if (createTableErr) {
                console.error("Error creating table:", createTableErr.message);
            } else {
                console.log('Eaten foods table created or already exists.');
            }
        });
    }
});

app.post('/api/nutrition', async (req, res) => {
    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: 'Search query is required.' });
    }
    try {
        const response = await axios.post(
            NUTRITIONIX_API_ENDPOINT,
            { query },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-app-id': process.env.NUTRITIONIX_APP_ID,
                    'x-app-key': process.env.NUTRITIONIX_APP_KEY,
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error during Nutritionix API request:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ error: 'Server error while fetching nutrition data.' });
    }
});

app.post('/api/eat-food', (req, res) => {
    const { food, demoDate, mealType } = req.body;
    if (!food || !food.food_name || !food.nf_calories) {
        return res.status(400).json({ error: 'Invalid food data provided.' });
    }

    const foodName = food.food_name;
    const nutritionData = JSON.stringify(food);
    const now = demoDate ? new Date(demoDate) : new Date();
    const eatenDate = now.toISOString().slice(0, 10);
    const eatenAt = now.toISOString();
    const meal = mealType || 'snack';

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDate = yesterday.toISOString().slice(0, 10);

    const MIN_TIME_BETWEEN_MEALS = 15;
    const MAX_CALORIES = 2000;

    db.get(
        `SELECT food_name FROM eaten_foods WHERE food_name = ? AND eaten_date = ?`,
        [foodName, yesterdayDate],
        (err, rowConsecutive) => {
            if (err) {
                console.error("Database query error:", err.message);
                return res.status(500).json({ error: 'Database error checking previous day.' });
            }
            let consecutiveDayWarning = !!rowConsecutive;

            db.all(
                `SELECT nutrition_data, eaten_at FROM eaten_foods WHERE eaten_date = ?`,
                [eatenDate],
                (err, rows) => {
                    if (err) {
                        console.error("Database query error:", err.message);
                        return res.status(500).json({ error: 'Database error fetching today\'s entries.' });
                    }

                    let totalCalories = 0;
                    let lastEatenTime = null;
                    rows.forEach((row) => {
                        try {
                            const data = JSON.parse(row.nutrition_data);
                            totalCalories += data.nf_calories;
                        } catch (e) {
                            console.error("Error parsing nutrition_data:", e);
                        }
                        const entryTime = new Date(row.eaten_at);
                        if (!lastEatenTime || entryTime > lastEatenTime) {
                            lastEatenTime = entryTime;
                        }
                    });

                    let tooQuickWarning = false;
                    if (lastEatenTime) {
                        const diffMinutes = (now - lastEatenTime) / (1000 * 60);
                        if (diffMinutes < MIN_TIME_BETWEEN_MEALS) {
                            tooQuickWarning = true;
                        }
                    }

                    let calorieLimitWarning = false;
                    if ((totalCalories + food.nf_calories) > MAX_CALORIES) {
                        calorieLimitWarning = true;
                    }
                    db.run(
                        `INSERT INTO eaten_foods (food_name, nutrition_data, eaten_date, eaten_at, meal_type) VALUES (?, ?, ?, ?, ?)`,
                        [foodName, nutritionData, eatenDate, eatenAt, meal],
                        function (err) {
                            if (err) {
                                console.error("Database insert error:", err.message);
                                return res.status(500).json({ error: 'Failed to save food to eaten foods.' });
                            }
                            res.json({
                                message: 'Food saved as eaten.',
                                warnings: {
                                    consecutiveDayWarning,
                                    tooQuickWarning,
                                    calorieLimitWarning
                                }
                            });
                        }
                    );
                }
            );
        }
    );
});

app.get('/api/eaten-foods', (req, res) => {
    const todayDate = new Date().toISOString().slice(0, 10);
    db.all(`SELECT nutrition_data, meal_type FROM eaten_foods WHERE eaten_date = ?`, [todayDate], (err, rows) => {
        if (err) {
            console.error("Database query error:", err.message);
            return res.status(500).json({ error: 'Error fetching eaten foods for today.' });
        }
        const eatenFoods = rows.map(row => {
            const foodData = JSON.parse(row.nutrition_data);
            return {
                ...foodData,
                meal_type: row.meal_type
            };
        });
        res.json(eatenFoods);
    });
});

app.get('/api/eaten-foods-by-date/:date', (req, res) => {
    const requestedDate = req.params.date;
    db.all(`SELECT nutrition_data, meal_type FROM eaten_foods WHERE eaten_date = ?`, [requestedDate], (err, rows) => {
        if (err) {
            console.error("Database query error:", err.message);
            return res.status(500).json({ error: `Error fetching eaten foods for ${requestedDate}.` });
        }
        const eatenFoods = rows.map(row => ({
            ...JSON.parse(row.nutrition_data),
            meal_type: row.meal_type
        }));
        res.json(eatenFoods);
    });
});

app.get('/api/history', (req, res) => {
    const daysLimit = req.query.days || 30;
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(daysLimit));

    const startDateStr = startDate.toISOString().slice(0, 10);
    const endDateStr = endDate.toISOString().slice(0, 10);

    db.all(
        `SELECT eaten_date, 
                COUNT(*) as count, 
                SUM(json_extract(nutrition_data, '$.nf_calories')) as totalCalories,
                SUM(json_extract(nutrition_data, '$.nf_total_fat')) as totalFat,
                SUM(json_extract(nutrition_data, '$.nf_total_carbohydrate')) as totalCarbs,
                SUM(json_extract(nutrition_data, '$.nf_protein')) as totalProtein,
                GROUP_CONCAT(meal_type) as mealTypes
         FROM eaten_foods 
         WHERE eaten_date BETWEEN ? AND ?
         GROUP BY eaten_date
         ORDER BY eaten_date`,
        [startDateStr, endDateStr],
        (err, rows) => {
            if (err) {
                console.error("Database query error:", err.message);
                return res.status(500).json({ error: 'Error fetching historical data.' });
            }

            const dateMap = {};
            let currentDate = new Date(startDate);
            while (currentDate <= endDate) {
                const dateStr = currentDate.toISOString().slice(0, 10);
                dateMap[dateStr] = {
                    date: dateStr,
                    count: 0,
                    totalCalories: 0,
                    totalFat: 0,
                    totalCarbs: 0,
                    totalProtein: 0,
                    mealBreakdown: { breakfast: 0, lunch: 0, dinner: 0, snack: 0 }
                };
                currentDate.setDate(currentDate.getDate() + 1);
            }

            rows.forEach(row => {
                const mealTypes = row.mealTypes ? row.mealTypes.split(',') : [];
                const mealBreakdown = { breakfast: 0, lunch: 0, dinner: 0, snack: 0 };

                mealTypes.forEach(type => {
                    mealBreakdown[type] = (mealBreakdown[type] || 0) + 1;
                });

                dateMap[row.eaten_date] = {
                    date: row.eaten_date,
                    count: row.count,
                    totalCalories: row.totalCalories || 0,
                    totalFat: row.totalFat || 0,
                    totalCarbs: row.totalCarbs || 0,
                    totalProtein: row.totalProtein || 0,
                    mealBreakdown
                };
            });

            const result = Object.values(dateMap).sort((a, b) => new Date(a.date) - new Date(b.date));
            res.json(result);
        }
    );
});

app.get('/api/meal-timing', (req, res) => {
    db.all(
        `SELECT strftime('%H', eaten_at) as hour, 
                AVG(json_extract(nutrition_data, '$.nf_calories')) as avgCalories,
                meal_type,
                COUNT(*) as count
         FROM eaten_foods 
         GROUP BY hour, meal_type
         ORDER BY hour`,
        [],
        (err, rows) => {
            if (err) {
                console.error("Database query error:", err.message);
                return res.status(500).json({ error: 'Error fetching meal timing data.' });
            }
            const mealTimingData = rows.map(row => ({
                hour: parseInt(row.hour),
                meal_type: row.meal_type,
                avgCalories: row.avgCalories || 0,
                count: row.count
            }));
            res.json(mealTimingData);
        }
    );
});

app.get('/api/nutrient-distribution', (req, res) => {
    const date = req.query.date || new Date().toISOString().slice(0, 10);

    db.all(
        `SELECT meal_type,
                SUM(json_extract(nutrition_data, '$.nf_calories')) as calories,
                SUM(json_extract(nutrition_data, '$.nf_total_fat')) as fat,
                SUM(json_extract(nutrition_data, '$.nf_total_carbohydrate')) as carbs,
                SUM(json_extract(nutrition_data, '$.nf_protein')) as protein
         FROM eaten_foods 
         WHERE eaten_date = ?
         GROUP BY meal_type`,
        [date],
        (err, rows) => {
            if (err) {
                console.error("Database query error:", err.message);
                return res.status(500).json({ error: 'Error fetching nutrient distribution data.' });
            }
            const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
            const distribution = {};

            mealTypes.forEach(type => {
                distribution[type] = {
                    calories: 0,
                    fat: 0,
                    carbs: 0,
                    protein: 0
                };
            });

            rows.forEach(row => {
                if (distribution[row.meal_type]) {
                    distribution[row.meal_type] = {
                        calories: row.calories || 0,
                        fat: row.fat || 0,
                        carbs: row.carbs || 0,
                        protein: row.protein || 0
                    };
                }
            });
            res.json(distribution);
        }
    );
});

app.listen(port, () => {
    console.log(`Backend server listening on port ${port}`);
});