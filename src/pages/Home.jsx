import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">
                Welcome to CareerBoard
            </h1>
            <div className="space-x-4">
                <button
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
                    onClick={() => navigate("/admin")}
                >
                    Company Login
                </button>
                <button
                    className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
                    onClick={() => navigate("/students")}
                >
                    Student Login
                </button>
            </div>
        </div>
    );
};

export default Home;
