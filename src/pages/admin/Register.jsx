import React, { useState } from "react";
import bgimg from '../../assests/pexels-tranmautritam-68761.jpg';
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        password: "",
    });

    const handleSubmit = async () => {
        try {
            const res = await API.post("/admin/register", formData);
            localStorage.setItem("token", res.data.token);
            window.location.href = "/admin/dashboard";
        } catch (err) {
            console.error(err);
        }
    };

    const getInputIcon = (key) => {
        switch (key) {
            case 'name':
                return (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                );
            case 'email':
                return (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                );
            case 'contact':
                return (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                );
            case 'password':
                return (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    const getInputType = (key) => {
        switch (key) {
            case 'email':
                return 'email';
            case 'password':
                return 'password';
            case 'contact':
                return 'tel';
            default:
                return 'text';
        }
    };

    const getPlaceholder = (key) => {
        switch (key) {
            case 'name':
                return 'Enter your full name';
            case 'email':
                return 'Enter your email address';
            case 'contact':
                return 'Enter your phone number';
            case 'password':
                return 'Create a strong password';
            default:
                return `Enter your ${key}`;
        }
    };

    const getLabel = (key) => {
        switch (key) {
            case 'name':
                return 'Full Name';
            case 'email':
                return 'Email Address';
            case 'contact':
                return 'Phone Number';
            case 'password':
                return 'Password';
            default:
                return key.charAt(0).toUpperCase() + key.slice(1);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Left Side - Registration Form */}
            <div className="w-3/5 flex justify-center align-center releative z-10 bg-gradient-to-br from-slate-50 to-green-50 ">
                <div className="bg-white rounded-2xl shadow-xl p-8  h-fit my-auto border border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Admin Registration</h2>
                    <form className="space-y-6">
                        {Object.keys(formData).map((key) => (
                            <div key={key}>
                                <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-2">
                                    {getLabel(key)}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        {getInputIcon(key)}
                                    </div>
                                    <input
                                        id={key}
                                        type={getInputType(key)}
                                        placeholder={getPlaceholder(key)}
                                        value={formData[key]}
                                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                        className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                                        required
                                    />
                                </div>
                            </div>
                        ))}

                        {/* Terms and Conditions */}
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="text-gray-700">
                                    I agree to the{' '}
                                    <a href="#" className="text-green-600 hover:text-green-500 font-medium">
                                        Terms and Conditions
                                    </a>{' '}
                                    and{' '}
                                    <a href="#" className="text-green-600 hover:text-green-500 font-medium">
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>
                        </div>

                        {/* Register Button */}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            Create Account
                        </button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
                            </div>
                        </div>

                        {/* Login Link */}
                        <button
                            type="button"
                            onClick={() => window.location.href = "/admin/login"}
                            className="w-full flex justify-center py-4 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            Sign In Instead
                        </button>
                    </form>

                    <button className="py-5 w-full text-gray-600" onClick={() => navigate("/")}>Home</button >
                </div>
            </div>

            <div
                className="absolute z-1 w-full h-full bg-cover bg-right "
                style={{ backgroundImage: `url(${bgimg})` }}
            ></div>
            {/* <img className="absolute z-1 w-full h-full flex items-center justify-center " src={bgimg} alt="background-image" /> */}
        </div>
    );
};

export default AdminRegister;
