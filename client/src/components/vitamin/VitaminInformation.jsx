// src/components/VitaminInformation.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../../assets/l.png';

const VitaminInformation = () => {
    const [vitamins, setVitamins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVitamins = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/vitamins'); // Adjust this URL to your API endpoint
                setVitamins(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load vitamin information. Please try again later.');
                setLoading(false);
            }
        };

        fetchVitamins();
    }, []);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <>
            <nav className="bg-white shadow-md sticky top-0 z-10 p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="VitaGuide Logo" className="h-10 mr-3" />
                        <span className="text-2xl font-bold text-gray-800">VitaGuide</span>
                    </Link>
                    <div className="hidden md:flex space-x-6">
                        <Link to="/guest" className="text-gray-700 hover:text-blue-600 font-medium">Back</Link>
                    </div>
                </div>
            </nav>
            <div className="container mx-auto p-6">
                <h2 className="text-4xl font-bold text-center mb-8">Vitamin Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vitamins.map((vitamin, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
                            <h3 className="text-2xl font-semibold mb-2 text-blue-600">{vitamin.name}</h3>
                            <p className="text-gray-700"><strong>Benefits:</strong> {vitamin.benefits}</p>
                            <p className="text-gray-700"><strong>Sources:</strong> {vitamin.sources}</p>
                            <p className="text-gray-700"><strong>Recommended Daily Allowance (RDA):</strong> {vitamin.rda}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default VitaminInformation;
