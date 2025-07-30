// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import JobPost from "../JobPost";
//
// const AdminDashboard = () => {
//     const navigate = useNavigate();
//
//     const handleLogout = () => {
//         localStorage.clear();
//         navigate("/");
//     };
//
//     return (
//         <div className="min-h-screen  p-8">
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-bold">Admin's Dashboard</h1>
//                 <button onClick={handleLogout} className="bg-red-500  px-4 py-2 rounded hover:bg-red-600" >
//                     Logout
//                 </button>
//             </div>
//             <div>
//                 <JobPost />
//             </div>
//         </div>
//     );
// };
//
// export default AdminDashboard;
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobPost from "../JobPost";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isJobFormOpen, setIsJobFormOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    const handleProfileClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleAddNewJob = () => {
        setIsJobFormOpen(true);
        setIsDropdownOpen(false);
    };

    const handleCloseJobForm = () => {
        setIsJobFormOpen(false);
    };

    const handlePostedJobs = () => {
        // Navigate to posted jobs page or handle as needed
        console.log("Navigate to Posted Jobs");
        setIsDropdownOpen(false);
    };

    const handleAccount = () => {
        // Navigate to account settings or handle as needed
        console.log("Navigate to Account");
        setIsDropdownOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="min-h-screen p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Admin's Dashboard</h1>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={handleProfileClick}
                        className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full transition-colors duration-200"
                    >
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                            A
                        </div>
                        <svg
                            className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                            <button
                                onClick={handlePostedJobs}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                            >
                                Posted Jobs
                            </button>
                            <button
                                onClick={handleAccount}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                            >
                                Account
                            </button>
                            <hr className="my-1 border-gray-200" />
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-150"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="mb-6">
                <button
                    onClick={handleAddNewJob}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-semibold"
                >
                    + Add New Job
                </button>
            </div>

            {/* Existing Jobs Display */}
            <div>
                {/* You can display existing jobs here */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Recent Job Postings</h2>
                    {/* Add your existing jobs list here */}
                </div>
            </div>

            {/* Sliding Job Form */}
            {isJobFormOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
                        onClick={handleCloseJobForm}
                    ></div>

                    {/* Sliding Form */}
                    <div className={`fixed inset-x-0 bottom-0 bg-white rounded-t-xl shadow-2xl z-50 transform transition-transform duration-300 ease-out ${isJobFormOpen ? 'translate-y-0' : 'translate-y-full'
                        }`}>
                        <div className="p-6 max-h-[80vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Post New Job</h2>
                                <button
                                    onClick={handleCloseJobForm}
                                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                                >
                                    ×
                                </button>
                            </div>

                            {/* Drag Handle */}
                            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full"></div>

                            <JobPost onClose={handleCloseJobForm} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminDashboard;
