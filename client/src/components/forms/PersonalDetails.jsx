import React, { useState } from 'react';
import axios from 'axios';

const PersonalDetails = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        dob: '',
        gender: '',
        pinCode: '',
        city: '',
        state: '',
        phoneNumber: '',
        anotherPhone: '',
        image: null
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'image') {
            const file = e.target.files[0];
            setFormData({ ...formData, image: file });
            setImagePreview(URL.createObjectURL(file));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        for (const key in formData) {
            form.append(key, formData[key]);
        }
        try {
            await axios.post('http://localhost:3001/api/personal-details', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Personal details saved successfully!');
        } catch (error) {
            console.error('Error submitting personal details:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-lg lg:max-w-2xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4">Child's Personal Details</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col items-center mb-4">
                        <label className="block mb-2 text-gray-600">Profile Picture</label>
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Profile Preview"
                                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-2 object-cover border-2 border-blue-400"
                            />
                        )}
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            required
                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            onChange={handleChange}
                            required
                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            onChange={handleChange}
                            required
                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="date"
                        name="dob"
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <select
                        name="gender"
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <input
                        type="text"
                        name="pinCode"
                        placeholder="Pin Code"
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            onChange={handleChange}
                            required
                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            onChange={handleChange}
                            required
                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        name="anotherPhone"
                        placeholder="Another Phone (if any)"
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PersonalDetails;
