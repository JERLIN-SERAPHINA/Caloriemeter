import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import vdo from '../../assets/introvdo3.mp4';
import backgroundImage from '../../assets/kids6.jpg'; // Replace with your image path

const DemoHomepage = () => {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Set a timer to hide the video and show the homepage content after the intro
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 2800); // Adjust this duration based on the video's length

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative h-screen w-screen">
            {!showContent ? (
                // Display Intro Video
                <video autoPlay muted className="absolute inset-0 w-full h-full object-cover">
                    <source src={vdo} type="video/mp4" />
                </video>
            ) : (
                // Display Main Homepage Content after video finishes
                <div 
                    className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImage})` }} // Set background image
                >
                    <h1 className="text-5xl font-bold mb-4 text-white">Welcome to Vitaguide</h1>
                    <p className="text-lg text-white mb-8">Learn about vitamins and their importance to health.</p>
                    <div className="flex flex-col space-y-4">
                        <Link to="/signup" className="bg-red-600 text-white py-3 px-6 rounded hover:bg-red-700 transition duration-300 ease-in-out">
                            Register
                        </Link>
                        <Link to="/login" className="bg-white text-black py-3 px-6 rounded hover:bg-gray-200 transition duration-300 ease-in-out">
                            Login as User
                        </Link>
                        <Link to="/admin/login" className="bg-gray-800 text-white py-3 px-6 rounded hover:bg-gray-700 transition duration-300 ease-in-out">
                            Login as Admin
                        </Link>
                        {/* New Button for Guest Homepage */}
                        <Link to="/guest" className="bg-yellow-200 text-black py-3 px-6 rounded hover:bg-yellow-500 transition duration-300 ease-in-out">
                            Visit Guest Homepage
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DemoHomepage;
