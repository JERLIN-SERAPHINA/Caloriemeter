// src/components/SideEffects.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/l.png';
import axios from 'axios';

const SideEffects = () => {
    const [sideEffects, setSideEffects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSideEffects = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/vitamin-side-effects');
                setSideEffects(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load side effects. Please try again later.');
                setLoading(false);
            }
        };

        fetchSideEffects();
    }, []);

    if (loading) return <div className="text-center py-10 text-lg">Loading...</div>;
    if (error) return <div className="text-center py-10 text-lg text-red-600">{error}</div>;

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
                <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Side Effects of Vitamin Deficiencies</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sideEffects.map((item, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl">
                            <h3 className="text-2xl font-semibold text-blue-600 mb-2">{item.vitamin}</h3>
                            <p className="text-gray-700 mb-2">
                                <strong>Symptoms:</strong> {item.symptoms}
                            </p>
                            <p className="text-gray-700">
                                <strong>Role:</strong> {item.role}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SideEffects;
