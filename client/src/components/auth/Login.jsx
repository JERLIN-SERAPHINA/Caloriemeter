import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import kidsimg from '../../assets/kids6.jpg';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');
        try {
            const response = await axios.post("http://localhost:3001/login", { email, password });
            if (response.status === 200) {
                localStorage.setItem('userToken', response.data.token);
                localStorage.setItem('userData', JSON.stringify(response.data.user));
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                navigate("/home"); // Redirect to home on successful login
            } else {
                setLoginError("Login failed. Please try again.");
            }
        } catch (error) {
            console.error('Login error:', error.response?.data?.error || error.message);
            setLoginError(error.response?.data?.error || 'Login failed.');
        }
    };

    return (
        <div className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${kidsimg})` }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative bg-white/20 backdrop-blur-md p-8 rounded-lg w-full max-w-md mx-auto text-center text-white">
                <h2 className="text-3xl font-bold mb-6">Login</h2>
                {loginError && <p className="text-red-500 text-sm mb-4">{loginError}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        Login
                    </button>
                </form>
                <p className="mt-6">Don't Have an Account?</p>
                <Link
                    to="/signup"
                    className="block w-full py-2 mt-2 text-center rounded-lg bg-gray-100 text-black font-semibold hover:bg-gray-200"
                >
                    Register
                </Link>
            </div>
        </div>
    );
}

export default Login;