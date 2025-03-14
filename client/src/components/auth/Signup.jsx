import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import kidsimg from '../../assets/kids6.jpg';
import OTPVerification from './OTPVerification';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signupError, setSignupError] = useState("");
    const [showOTPVerification, setShowOTPVerification] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSignupError('');
        try {
            const response = await axios.post("http://localhost:3001/register", { email });
            if (response.status === 200) {
                setShowOTPVerification(true);
            } else {
                setSignupError("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error('Signup error:', error.response?.data?.error || error.message);
            setSignupError(error.response?.data?.message || 'Registration failed.');
        }
    };

    const handleOTPVerification = async (otp) => {
        try {
            // Send registration data AND OTP to verification endpoint
            const response = await axios.post("http://localhost:3001/api/verify-otp", { email, otp, name, password }); // Send name and password too!
            if (response.status === 200 || response.status === 201) { // Check for 201 in case registration creates user then logs in
                localStorage.setItem('userToken', response.data.token);
                localStorage.setItem('userData', JSON.stringify(response.data.user));
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                navigate("/home");
            } else {
                setSignupError("OTP verification successful, but login failed. Please try logging in."); // Indicate OTP success but login failure
            }

        } catch (error) {
            console.error("OTP Verification Error:", error.response?.data?.error);
            setSignupError(error.response?.data?.error || 'OTP verification failed.'); // Show OTP verification error
        }
    };

    const handleResendOTP = async () => {
        try {
            const response = await axios.post("http://localhost:3001/register", { email });
            if (response.status === 200) {
                alert("New OTP resent to your email.");
            } else {
                alert("Failed to resend OTP. Please try again.");
            }
        } catch (error) {
            console.error("Resend OTP Error:", error);
            alert("Failed to resend OTP. Please try again.");
        }
    };


    return (
        <div className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${kidsimg})` }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative">
                {!showOTPVerification ? (
                    <div className="bg-white/20 backdrop-blur-md p-8 rounded-lg w-full max-w-md mx-auto text-center text-white">
                        <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
                        {signupError && <p className="text-red-500 text-sm mb-4">{signupError}</p>}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold mb-1">Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Name"
                                    autoComplete="off"
                                    name="name"
                                    className="w-full px-4 py-2 rounded-lg bg-white/70 text-black"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    autoComplete="off"
                                    name="email"
                                    className="w-full px-4 py-2 rounded-lg bg-white/70 text-black"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold mb-1">Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    autoComplete="off"
                                    name="password"
                                    className="w-full px-4 py-2 rounded-lg bg-white/70 text-black"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full py-2 mt-4 rounded-lg bg-red-600 hover:bg-red-700 font-bold">
                                Register
                            </button>
                        </form>
                        <p className="mt-6">Already Have an Account?</p>
                        <Link
                            to="/login"
                            className="block w-full py-2 mt-2 text-center rounded-lg bg-gray-100 text-black font-semibold hover:bg-gray-200"
                        >
                            Login
                        </Link>
                    </div>
                ) : (
                    <OTPVerification
                        email={email}
                        onVerify={handleOTPVerification}
                        onResend={handleResendOTP}
                    />
                )}
            </div>
        </div>
    );
}

export default Signup;