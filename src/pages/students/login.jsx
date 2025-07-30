import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const StudentLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [stuRemember, setstuRemember] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            if (email && password) {
                const res = await API.post("/students/login", { email, password });
                if (stuRemember) {
                    localStorage.setItem("token", res.data.token);
                }
                else {
                    sessionStorage.setItem("token", res.data.token);
                }
                navigate("/students/dashboard");
            }
        } catch (err) {
            alert("Login failed");
        }
    };

    const register = async () => {
        try {
            navigate("/students/register");
        } catch (err) {
            alert("Login failed");
        }
    };

    const goHome = () => {
        navigate("/");
    }
    useEffect(() => {
        try {
            console.log("CHECKING: if student is already logged in")
            if (localStorage.getItem("token")) {
                navigate("/students/dashboard")
                console.log("student already logged in")
            }
        } catch {
            console.log("login required")
        }
    }, [])
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-8">
            {/* Navigation Buttons */}
            <div className="absolute top-6 left-6 right-6 flex justify-between">
                <button
                    onClick={goHome}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="font-medium">Home</span>
                </button>

                <button
                    onClick={register}
                    className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-200 shadow-lg"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span className="font-medium">Register</span>
                </button>
            </div>

            {/* Main Login Card */}
            <div className="w-full max-w-lg">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg mb-6">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-3">Student Portal</h1>
                    <p className="text-lg text-gray-600">Access your academic dashboard</p>
                </div>

                {/* Login Form Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
                    <div className="space-y-6">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your student email"
                                    className="block w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="block w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={stuRemember}
                                    onChange={() => setstuRemember(!stuRemember)}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                    Keep me signed in
                                </label>
                            </div>
                            <button className="text-sm text-purple-600 hover:text-purple-500 font-medium transition-colors duration-200">
                                Forgot password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={handleLogin}
                            className="w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-2xl shadow-lg text-base font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform hover:scale-[1.02] transition-all duration-200"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            Sign In to Portal
                        </button>
                    </div>
                </div>

                {/* Help Section */}
                <div className="mt-8 text-center">
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
                        <h3 className="text-sm font-semibold text-gray-800 mb-2">Need Help?</h3>
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            <button
                                onClick={() => { window.location.href = "mailto:someone@mail.com?subject=Hello&body=I want to reach out..." }}
                                className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200">
                                Contact Support
                            </button>
                            <span className="text-gray-400">•</span>
                            <button
                                onClick={() => { window.location.href = "mailto:student.council@mail.com?subject=Regardin Student Guide&body=I want to reach out..." }}
                                className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200">
                                Student Guide
                            </button>
                            <span className="text-gray-400">•</span>
                            <button

                                className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200">
                                Technical Issues
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-500">
                        © 2024 Student Portal. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    )
};

export default StudentLogin;
