import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import ApplyJob from './applyjob';

const StudentDashboard = () => {
    const [student, setStudent] = useState(null);
    const [jobs, setJobs] = useState(null);
    const [appliedjobs, setAppliedJobs] = useState(null);
    const [activeTab, setActiveTab] = useState('newJobs');
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const handleLogin = async () => {
        try {
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = "/";
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = (localStorage.getItem("token")) || sessionStorage.getItem("token");

            try {
                // Get dashboard data (student info and new jobs)
                const res = await API.get('/students/dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log('Dashboard response:', res);
                setStudent(res.data.student);
                setJobs(res.data.newJobs);

                // Get applied job IDs from student data
                const appliedJobIds = res.data.student.appliedJobs || [];
                console.log('Applied job IDs:', appliedJobIds);

                // Fetch all applied jobs in one API call using the bulk endpoint
                if (appliedJobIds.length > 0) {
                    try {
                        const appliedJobsResponse = await API.post('/jobs/bulk', {
                            jobIds: appliedJobIds
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            },
                        });

                        if (appliedJobsResponse.data.success) {
                            console.log('Applied jobs details:', appliedJobsResponse.data.jobs);
                            setAppliedJobs(appliedJobsResponse.data.jobs);
                        } else {
                            console.error('Failed to fetch applied jobs:', appliedJobsResponse.data.message);
                            setAppliedJobs([]);
                        }
                    } catch (appliedJobsError) {
                        console.error('Error fetching applied jobs:', appliedJobsError);
                        setAppliedJobs([]);

                        // Fallback: Try to fetch jobs individually if bulk request fails
                        console.log('Falling back to individual job fetches...');
                        const appliedJobsPromises = appliedJobIds.map(async (jobId) => {
                            try {
                                const jobResponse = await API.get(`/jobs/${jobId}`, {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                });
                                return jobResponse.data;
                            } catch (error) {
                                console.error(`Error fetching job ${jobId}:`, error);
                                return null;
                            }
                        });

                        const appliedJobsDetails = await Promise.all(appliedJobsPromises);
                        const validAppliedJobs = appliedJobsDetails.filter(job => job !== null);
                        setAppliedJobs(validAppliedJobs);
                    }
                } else {
                    setAppliedJobs([]);
                }

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                // Handle error appropriately - maybe show a message to user
                alert('Error loading dashboard data. Please try again.');
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
            {/* Header with Profile Dropdown */}
            <div className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-white/50 shadow-lg">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Welcome Message */}
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Welcome, {student?.name}</h2>
                                <p className="text-sm text-gray-600">Student Dashboard</p>
                            </div>
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="font-medium">Profile</span>
                                <svg className={`w-4 h-4 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 py-2 z-50">
                                    <button
                                        onClick={() => {
                                            // Navigate to profile - you'll add this function later
                                            setIsProfileDropdownOpen(false);
                                        }}
                                        className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-purple-50 transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Profile
                                    </button>
                                    <button
                                        onClick={() => {
                                            // Navigate to applied jobs - you'll add this function later
                                            setIsProfileDropdownOpen(false);
                                        }}
                                        className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-purple-50 transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2v-8a2 2 0 012-2V6" />
                                        </svg>
                                        Applied Jobs
                                    </button>
                                    <div className="border-t border-gray-200 my-2"></div>
                                    <button
                                        onClick={handleLogin}
                                        className="w-full flex items-center px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-6">
                {/* Tab Navigation */}
                <div className="mb-8">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/50 inline-flex">
                        <button
                            onClick={() => setActiveTab('newJobs')}
                            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${activeTab === 'newJobs'
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                                }`}
                        >
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2v-8a2 2 0 012-2V6" />
                                </svg>
                                <span>New Jobs</span>
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('appliedJobs')}
                            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${activeTab === 'appliedJobs'
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                                }`}
                        >
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 018 0z" />
                                </svg>
                                <span>Applied Jobs</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50 min-h-[500px]">
                    {activeTab === 'newJobs' && (
                        <div>
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2v-8a2 2 0 012-2V6" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">Available Jobs</h3>
                            </div>

                            <div className="space-y-4">
                                {jobs && jobs.length > 0 ? (
                                    jobs.map((item, index) => (
                                        <ApplyJob key={index} student={student} job={item} />
                                    ))
                                ) : (
                                    <div className="text-center py-16">
                                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2v-8a2 2 0 012-2V6" />
                                        </svg>
                                        <h3 className="text-lg font-medium text-gray-500 mb-2">No Jobs Available</h3>
                                        <p className="text-gray-400">Check back later for new job opportunities!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'appliedJobs' && (
                        <div>
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 018 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">Applied Jobs</h3>
                            </div>

                            <div className="space-y-4">
                                {appliedjobs && appliedjobs.length > 0 ? (
                                    appliedjobs.map((item, index) => (
                                        <div key={index} className="bg-white/70 border border-gray-200 rounded-2xl p-6 shadow-sm">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
                                                    <p className="text-gray-600 mt-1">Application submitted</p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                                                        Pending
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-16">
                                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 018 0z" />
                                        </svg>
                                        <h3 className="text-lg font-medium text-gray-500 mb-2">No Applications Yet</h3>
                                        <p className="text-gray-400">You haven't applied to any jobs yet. Start exploring opportunities!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
