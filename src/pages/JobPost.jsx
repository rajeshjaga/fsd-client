import React, { useState } from "react";
import axios from "axios";

const JobPost = () => {
    const [job, setJob] = useState({
        companyName: "",
        title: "",
        jobDescription: "",
        skillsRequired: [],
        minMarks: {
            tenth: "",
            twelfth: "",
            ug: "",
            pg: "",
        },
        status: "open",
        applicationDeadline: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in job.minMarks) {
            setJob({
                ...job,
                minMarks: { ...job.minMarks, [name]: value },
            });
        } else {
            setJob({ ...job, [name]: value });
        }
    };

    const handleSkillsChange = (e) => {
        setJob({
            ...job,
            skillsRequired: e.target.value.split(",").map(s => s.trim()),
        });
    };

    const handlePost = async () => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        try {
            console.log(token)
            console.log(job)
            await axios.post("http://localhost:5000/api/jobs", job, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Job posted");
        } catch (err) {
            alert(err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handlePost()
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
                    <p className="text-gray-600">Fill in the details below to create a job posting</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
                    {/* Company and Title Section */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Company Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="companyName"
                                value={job.companyName}
                                onChange={handleChange}
                                placeholder="Enter company name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Job Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={job.title}
                                onChange={handleChange}
                                placeholder="e.g. Software Engineer"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                            />
                        </div>
                    </div>

                    {/* Job Description */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Job Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="jobDescription"
                            value={job.jobDescription}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Describe the role, responsibilities, and requirements..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                        />
                    </div>

                    {/* Skills Required */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Required Skills <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="skillsRequired"
                            value={job.skillsRequired.join(", ")}
                            onChange={handleSkillsChange}
                            placeholder="React, Node.js, MongoDB, etc."
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                        />
                        <p className="text-xs text-gray-500 mt-1">Separate multiple skills with commas</p>
                    </div>

                    {/* Minimum Marks Section */}
                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Requirements</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-600">
                                    10th Grade (%) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="tenth"
                                    value={job.minMarks.tenth}
                                    onChange={handleChange}
                                    min="0"
                                    max="100"
                                    placeholder="75"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-600">
                                    12th Grade (%) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="twelfth"
                                    value={job.minMarks.twelfth}
                                    onChange={handleChange}
                                    min="0"
                                    max="100"
                                    placeholder="75"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-600">
                                    UG (%) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="ug"
                                    value={job.minMarks.ug}
                                    onChange={handleChange}
                                    min="0"
                                    max="100"
                                    placeholder="70"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-600">
                                    PG (%)
                                </label>
                                <input
                                    type="number"
                                    name="pg"
                                    value={job.minMarks.pg}
                                    onChange={handleChange}
                                    min="0"
                                    max="100"
                                    placeholder="Optional"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Status and Deadline */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Job Status</label>
                            <select
                                name="status"
                                value={job.status}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 bg-white"
                            >
                                <option value="open">🟢 Open</option>
                                <option value="closed">🔴 Closed</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Application Deadline <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="applicationDeadline"
                                value={job.applicationDeadline}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                            🚀 Post Job Opening
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobPost;
