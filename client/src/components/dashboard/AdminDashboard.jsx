import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import backgroundImage from '../../assets/reportt.jpg'; // Update with your actual image path

// Register Chart.js components
Chart.register(...registerables);

const AdminDashboard = () => {
    const [reportType, setReportType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [metrics, setMetrics] = useState('');
    const [error, setError] = useState('');
    const [chartData, setChartData] = useState(null);
    const chartRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        validateForm();
    };

    const validateForm = () => {
        setError('');
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (!reportType) {
            setError('Please select a report type.');
            return;
        }
        if (start > end) {
            setError('End date must be after start date.');
            return;
        }
        if (!metrics.trim()) {
            setError('Metrics are required.');
            return;
        }

        const metricsArray = metrics.split('\n').map(metric => metric.trim()).filter(Boolean);
        const randomData = metricsArray.map(() => Math.floor(Math.random() * 100));

        setChartData({
            labels: metricsArray,
            datasets: [{
                label: 'Metrics Distribution',
                data: randomData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1
            }]
        });
    };

    useEffect(() => {
        if (chartData) {
            const ctx = chartRef.current.getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: chartData,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Metrics Distribution',
                        },
                    },
                },
            });
        }
    }, [chartData]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 flex p-4">
            <div className="flex flex-col w-1/4 bg-black p-4 rounded-lg mr-4 relative"> {/* Adjusted width */}
                <div 
                    className="absolute inset-0 bg-cover bg-center rounded-lg opacity-50"
                    style={{ backgroundImage: `url(${backgroundImage})` }} 
                />
                <h1 className="text-5xl font-extrabold text-left text-white tracking-wide relative z-10">
                    Analytics Report Request
                </h1>
            </div>
            <div className="flex-grow w-3/4"> {/* Adjusted width */}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-4">
                    <label className="block mb-3">
                        <span className="block text-sm font-semibold mb-1">Report Type:</span>
                        <select 
                            value={reportType} 
                            onChange={(e) => setReportType(e.target.value)} 
                            required 
                            className="block w-full border rounded p-2 focus:outline-none focus:ring focus:ring-teal-300"
                        >
                            <option value="">Select...</option>
                            <option value="User Engagement">User Engagement</option>
                            <option value="Content Performance">Content Performance</option>
                        </select>
                    </label>

                    <label className="block mb-3">
                        <span className="block text-sm font-semibold mb-1">Start Date:</span>
                        <input 
                            type="date" 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)} 
                            required 
                            className="block w-full border rounded p-2 focus:outline-none focus:ring focus:ring-teal-300"
                        />
                    </label>

                    <label className="block mb-3">
                        <span className="block text-sm font-semibold mb-1">End Date:</span>
                        <input 
                            type="date" 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)} 
                            required 
                            className="block w-full border rounded p-2 focus:outline-none focus:ring focus:ring-teal-300"
                        />
                    </label>

                    <label className="block mb-3">
                        <span className="block text-sm font-semibold mb-1">Metrics to Track:</span>
                        <textarea 
                            rows="4" 
                            value={metrics} 
                            onChange={(e) => setMetrics(e.target.value)} 
                            placeholder="Enter metrics (one per line)" 
                            required 
                            className="block w-full border rounded p-2 focus:outline-none focus:ring focus:ring-teal-300"
                        />
                    </label>

                    {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}

                    <button type="submit" className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition duration-200">Submit</button>
                </form>

                {chartData && (
                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <h2 className="text-xl font-semibold text-teal-600 mb-4">Chart Result:</h2>
                        <canvas ref={chartRef} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
