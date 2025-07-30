import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Briefcase, Plus, TrendingUp, Users, Eye, Calendar } from "lucide-react";
import JobPost from "../JobPost";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isJobFormOpen, setIsJobFormOpen] = useState(false);
    const [dashboardStats, setDashboardStats] = useState([]);
    const [recentJobs, setRecentJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
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
        console.log("Navigate to Posted Jobs");
        setIsDropdownOpen(false);
    };

    const handleAccount = () => {
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

    // Fetch dashboard data
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Replace these URLs with your actual API endpoints
                const [statsResponse, jobsResponse] = await Promise.all([
                    fetch('/api/dashboard/stats'), // Replace with your stats API endpoint
                    fetch('/api/jobs/recent')      // Replace with your jobs API endpoint
                ]);

                if (!statsResponse.ok || !jobsResponse.ok) {
                    throw new Error('Failed to fetch dashboard data');
                }

                const statsData = await statsResponse.json();
                const jobsData = await jobsResponse.json();

                // Map your API response to the expected format
                const formattedStats = [
                    {
                        title: "Total Jobs Posted",
                        value: statsData.totalJobs || "0",
                        icon: Briefcase,
                        color: "bg-gradient-to-r from-blue-500 to-blue-600",
                        change: statsData.jobsChange || "0%"
                    },
                    {
                        title: "Active Applications",
                        value: statsData.totalApplications || "0",
                        icon: Users,
                        color: "bg-gradient-to-r from-green-500 to-green-600",
                        change: statsData.applicationsChange || "0%"
                    },
                    {
                        title: "Profile Views",
                        value: statsData.profileViews || "0",
                        icon: Eye,
                        color: "bg-gradient-to-r from-purple-500 to-purple-600",
                        change: statsData.viewsChange || "0%"
                    },
                    {
                        title: "This Month",
                        value: statsData.monthlyJobs || "0",
                        icon: Calendar,
                        color: "bg-gradient-to-r from-orange-500 to-orange-600",
                        change: statsData.monthlyChange || "0%"
                    }
                ];

                setDashboardStats(formattedStats);
                setRecentJobs(jobsData.jobs || []); // Assuming jobsData has a 'jobs' array

            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError(err.message);

                // Fallback to mock data on error
                const fallbackStats = [
                    { title: "Total Jobs Posted", value: "24", icon: Briefcase, color: "bg-gradient-to-r from-blue-500 to-blue-600", change: "+12%" },
                    { title: "Active Applications", value: "156", icon: Users, color: "bg-gradient-to-r from-green-500 to-green-600", change: "+8%" },
                    { title: "Profile Views", value: "1,234", icon: Eye, color: "bg-gradient-to-r from-purple-500 to-purple-600", change: "+23%" },
                    { title: "This Month", value: "8", icon: Calendar, color: "bg-gradient-to-r from-orange-500 to-orange-600", change: "+15%" }
                ];

                const fallbackJobs = [
                    { id: 1, title: "Senior React Developer", applicants: 45, status: "Active", posted: "2 days ago" },
                    { id: 2, title: "UX/UI Designer", applicants: 32, status: "Active", posted: "5 days ago" },
                    { id: 3, title: "Product Manager", applicants: 28, status: "Closed", posted: "1 week ago" },
                    { id: 4, title: "DevOps Engineer", applicants: 19, status: "Active", posted: "3 days ago" }
                ];

                setDashboardStats(fallbackStats);
                setRecentJobs(fallbackJobs);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []); // Empty dependency array - runs once on mount

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                                <Briefcase className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                    JobPortal Admin
                                </h1>
                                <p className="text-sm text-gray-500">Welcome back, Administrator</p>
                            </div>
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={handleProfileClick}
                                className="flex items-center space-x-3 bg-white hover:bg-gray-50 px-4 py-2 rounded-xl border border-gray-200/60 shadow-sm transition-all duration-200 hover:shadow-md group"
                            >
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                                    A
                                </div>
                                <span className="text-sm font-medium text-gray-700">Admin</span>
                                <svg
                                    className={`w-4 h-4 transition-transform duration-200 text-gray-400 group-hover:text-gray-600 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Enhanced Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200/60 py-2 z-50 backdrop-blur-md">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900">Administrator</p>
                                        <p className="text-xs text-gray-500">admin@jobportal.com</p>
                                    </div>
                                    <button
                                        onClick={handlePostedJobs}
                                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150"
                                    >
                                        <Briefcase className="w-4 h-4" />
                                        <span className="text-sm">Posted Jobs</span>
                                    </button>
                                    <button
                                        onClick={handleAccount}
                                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150"
                                    >
                                        <User className="w-4 h-4" />
                                        <span className="text-sm">Account Settings</span>
                                    </button>
                                    <hr className="my-2 border-gray-100" />
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-150"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span className="text-sm">Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-2">Good morning, Administrator! 👋</h2>
                            <p className="text-blue-100 mb-6">Ready to manage your job postings and grow your team?</p>
                            <button
                                onClick={handleAddNewJob}
                                className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <Plus className="w-5 h-5" />
                                <span>Post New Job</span>
                            </button>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 translate-x-16"></div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {dashboardStats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/60 hover:shadow-md transition-all duration-200 group">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                                        <TrendingUp className="w-4 h-4" />
                                        <span>{stat.change}</span>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                                <p className="text-gray-600 text-sm">{stat.title}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Recent Job Postings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200/60 bg-gray-50/50">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">Recent Job Postings</h2>
                            <button
                                onClick={handlePostedJobs}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
                            >
                                View all →
                            </button>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200/60">
                        {recentJobs.map((job) => (
                            <div key={job.id} className="px-6 py-4 hover:bg-gray-50/50 transition-colors duration-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <span className="flex items-center space-x-1">
                                                <Users className="w-4 h-4" />
                                                <span>{job.applicants} applicants</span>
                                            </span>
                                            <span>{job.posted}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${job.status === 'Active'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {job.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Enhanced Sliding Job Form */}
            {isJobFormOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
                        onClick={handleCloseJobForm}
                    ></div>

                    {/* Sliding Form */}
                    <div className={`fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-2xl z-50 transform transition-transform duration-300 ease-out ${isJobFormOpen ? 'translate-y-0' : 'translate-y-full'
                        }`}>
                        <div className="p-6 max-h-[85vh] overflow-y-auto">
                            {/* Drag Handle */}
                            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-12 h-1.5 bg-gray-300 rounded-full"></div>

                            <div className="flex justify-between items-center mb-6 mt-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Post New Job</h2>
                                    <p className="text-gray-600 text-sm mt-1">Fill in the details to create a new job posting</p>
                                </div>
                                <button
                                    onClick={handleCloseJobForm}
                                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                >
                                    ×
                                </button>
                            </div>

                            <JobPost onClose={handleCloseJobForm} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminDashboard;
