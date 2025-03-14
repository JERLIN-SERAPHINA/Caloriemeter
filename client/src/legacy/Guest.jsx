// src/components/GuestHomepage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/kids6.jpg'; // Replace with your image path

const GuestHomepage = () => {
          return (
                    <div className="relative h-screen w-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
                              <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 text-center">
                                        <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Vitaguide</h1>
                                        <p className="text-lg text-gray-600 mb-6">Explore important information about vitamins and their role in health.</p>
                                        <div className="flex flex-col space-y-4">
                                                  <Link to="/vitamin-information" className="bg-red-600 text-white py-3 px-6 rounded hover:bg-red-700 transition duration-300 ease-in-out">
                                                            Vitamin Information
                                                  </Link>
                                                  <Link to="/sideffects" className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition duration-300 ease-in-out">
                                                            Vitamin Side Effects
                                                  </Link>
                                                  <Link to="/" className="bg-gray-600 text-white py-3 px-6 rounded hover:bg-gray-700 transition duration-300 ease-in-out">
                                                            Back
                                                  </Link>
                                                 
                                        </div>
                              </div>
                    </div>
          );
};

export default GuestHomepage;
