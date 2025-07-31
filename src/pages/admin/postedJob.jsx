import React, { useState, useEffect } from 'react';

const JobsDisplayPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Simulate checking for stored token on component mount
    useEffect(() => {
        // In real app: const storedToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        setLoading(true);
        setError('');

        try {
            const token = (localStorage.getItem("token")) || sessionStorage.getItem("token");
            const response = await fetch('http://localhost:3000/api/admin/jobs', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Authentication failed. Please check your token.');
                }
                throw new Error(`Failed to fetch jobs: ${response.status}`);
            }

            const data = await response.json();
            setJobs(Array.isArray(data) ? data : data.jobs || []);
        } catch (err) {
            setError(err.message || 'Failed to fetch jobs');
            console.error('Error fetching jobs:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Date not available';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
            case 'open':
                return 'bg-green-100 text-green-800';
            case 'closed':
            case 'filled':
                return 'bg-red-100 text-red-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-blue-100 text-blue-800';
        }
    };

    return (
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 mb-8">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 6V8a2 2 0 00-2-2H10a2 2 0 00-2 2v4.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Job Listings</h1>
                                <p className="text-gray-600">Browse all available positions</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="text-sm text-gray-500">
                                {!loading && jobs.length > 0 && `${jobs.length} job${jobs.length !== 1 ? 's' : ''} found`}
                            </div>
                            <button
                                onClick={fetchJobs}
                                disabled={loading}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                {loading ? 'Loading...' : 'Refresh'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 13.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <div>
                                <p className="text-red-800 font-medium">Error loading jobs</p>
                                <p className="text-red-600 text-sm mt-1">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100 text-center">
                        <svg className="animate-spin w-8 h-8 text-blue-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <p className="text-gray-600 text-lg">Loading job listings...</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && jobs.length === 0 && !error && (
                    <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 6V8a2 2 0 00-2-2H10a2 2 0 00-2 2v4.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs available</h3>
                        <p className="text-gray-600 mb-6">There are currently no job listings to display.</p>
                        <button
                            onClick={fetchJobs}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Try Again
                        </button>
                    </div>
                )}

                {/* Jobs List */}
                {!loading && jobs.length > 0 && (
                    <div className="space-y-6">
                        {jobs.map((job, index) => (
                            <div key={job.id || index} className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]">
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                    {/* Main Job Info */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <h2 className="text-xl font-bold text-gray-900 mb-2">
                                                    {job.title || job.position || job.jobTitle || 'Job Title'}
                                                </h2>
                                                <div className="flex items-center text-gray-600 mb-2">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                    <span className="font-medium">{job.company || job.employer || 'Company Name'}</span>
                                                </div>
                                                <div className="flex items-center text-gray-500 text-sm">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    {job.location || 'Location not specified'}
                                                </div>
                                            </div>
                                            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(job.status)}`}>
                                                {job.status || 'Active'}
                                            </div>
                                        </div>

                                        {/* Job Description */}
                                        {job.description && (
                                            <div className="mb-4">
                                                <p className="text-gray-700 leading-relaxed">
                                                    {job.description.length > 200
                                                        ? job.description.substring(0, 200) + '...'
                                                        : job.description
                                                    }
                                                </p>
                                            </div>
                                        )}

                                        {/* Job Details Row */}
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                            {job.jobType && (
                                                <span className="inline-flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {job.jobType}
                                                </span>
                                            )}
                                            {job.experience && (
                                                <span className="inline-flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                    </svg>
                                                    {job.experience}
                                                </span>
                                            )}
                                            {(job.salary || job.salaryRange) && (
                                                <span className="inline-flex items-center font-semibold text-green-600">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                    </svg>
                                                    {job.salary || job.salaryRange}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right Side - Actions & Date */}
                                    <div className="flex flex-col items-end space-y-3 lg:min-w-0 lg:w-48">
                                        <div className="text-sm text-gray-500 text-right">
                                            <div className="font-medium">Posted</div>
                                            <div>{formatDate(job.postedDate || job.createdAt || job.datePosted)}</div>
                                        </div>

                                        {job.deadline && (
                                            <div className="text-sm text-red-600 text-right">
                                                <div className="font-medium">Deadline</div>
                                                <div>{formatDate(job.deadline)}</div>
                                            </div>
                                        )}

                                        <div className="flex flex-col w-full space-y-2">
                                            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 text-sm font-medium">
                                                View Details
                                            </button>
                                            {job.applicationUrl && (
                                                <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 text-sm font-medium">
                                                    Apply Now
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Skills/Tags (if available) */}
                                {job.skills && Array.isArray(job.skills) && job.skills.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <div className="flex flex-wrap gap-2">
                                            {job.skills.slice(0, 6).map((skill, skillIndex) => (
                                                <span key={skillIndex} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                                                    {skill}
                                                </span>
                                            ))}
                                            {job.skills.length > 6 && (
                                                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                                    +{job.skills.length - 6} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer with last update time */}
                {!loading && jobs.length > 0 && (
                    <div className="text-center text-sm text-gray-500 mt-8 py-4">
                        Last updated: {new Date().toLocaleString()}
                    </div>
                )}
            </div>
        </div>
    );
}
export default JobsDisplayPage
