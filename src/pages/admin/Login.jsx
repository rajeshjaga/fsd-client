import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();

    const registerAdmin = async () => {
        try {
            navigate("/admin/register");
        } catch (err) {
            alert("Login failed");
        }
    };

    const handleLogin = async () => {
        try {
            const res = await API.post("/admin/login", { email, password });
            console.log(res.data);
            if (remember) {
                localStorage.setItem("token", res.data.token);
            } else {
                sessionStorage.setItem("token", res.data.token);
            }
            navigate("/admin/dashboard");
        } catch (err) {
            alert("Login failed");
        }
    };

    useEffect(() => {
        try {
            console.log("CHECKING: if admin is already logged in")
            if (localStorage.getItem("token")) {
                navigate("/admin/dashboard")
                console.log("student already logged in")
            }
        } catch {
            console.log("login required")
        }
    }, [])
    return (
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8">
            <div className="min-h-screen flex">
                {/* Left Side - Login Form */}
                <div className="w-full flex items-center justify-center ">
                    <div className="w-full max-w-md">
                        {/* Logo/Brand Area */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                            <p className="text-gray-600">Sign in to your admin account</p>
                        </div>

                        {/* Login Form */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Admin Login</h2>

                            <form className="space-y-6">
                                {/* Email Input */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            className="block w-full pl-5 pr-3 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            className="block w-full pl-5 pr-3 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                                        />
                                    </div>
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            type="checkbox"
                                            checked={remember}
                                            onChange={() => setRemember(!remember)}
                                            className="text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                                            Remember me
                                        </label>
                                    </div>
                                    <button type="button" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                                        Forgot password?
                                    </button>
                                </div>

                                {/* Login Button */}
                                <button
                                    type="button"
                                    onClick={handleLogin}
                                    className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    Sign In
                                </button>

                                {/* Divider */}
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">New to our platform?</span>
                                    </div>
                                </div>

                                {/* Register Button */}
                                <button
                                    type="button"
                                    onClick={registerAdmin}
                                    className="w-full flex justify-center py-4 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                    Create New Account
                                </button>
                                <button className="w-full text-gray-600" onClick={() => navigate("/")} >Home</button >
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
