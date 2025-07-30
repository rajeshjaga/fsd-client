import React, { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const StudentRegister = () => {
    const Navigate = useNavigate();
    const [formData, setFormData] = useState({
        // Basic Information
        name: "",
        contact: "",
        email: "",
        password: "",
        usn: "",
        dob: "",
        major: "",
        experience: "",

        // Education Object
        education: {
            tenth: {
                percent: "",
                passedYear: ""
            },
            twelfth: {
                percent: "",
                passedYear: ""
            },
            graduate: {
                bachelors: {
                    percent: "",
                    pursuing: false,
                    passedYear: "",
                    major: "",
                    degreeType: ""
                },
                masters: {
                    percent: "",
                    pursuing: false,
                    passedYear: "",
                    major: "",
                    degreeType: ""
                }
            }
        },

        // Projects as an object (Map will be converted)
        projects: {},

        // Arrays
        skills: [],
        certifications: []
    });

    const [currentSkill, setCurrentSkill] = useState("");
    const [currentCertification, setCurrentCertification] = useState("");
    const [currentProject, setCurrentProject] = useState({ key: "", value: "" });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleEducationChange = (level, field, value) => {
        setFormData(prev => ({
            ...prev,
            education: {
                ...prev.education,
                [level]: {
                    ...prev.education[level],
                    [field]: value
                }
            }
        }));
    };

    const handleGraduateEducationChange = (degree, field, value) => {
        setFormData(prev => ({
            ...prev,
            education: {
                ...prev.education,
                graduate: {
                    ...prev.education.graduate,
                    [degree]: {
                        ...prev.education.graduate[degree],
                        [field]: value
                    }
                }
            }
        }));
    };

    const addSkill = () => {
        if (currentSkill.trim()) {
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, currentSkill.trim()]
            }));
            setCurrentSkill("");
        }
    };

    const removeSkill = (index) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }));
    };

    const addCertification = () => {
        if (currentCertification.trim()) {
            setFormData(prev => ({
                ...prev,
                certifications: [...prev.certifications, currentCertification.trim()]
            }));
            setCurrentCertification("");
        }
    };

    const removeCertification = (index) => {
        setFormData(prev => ({
            ...prev,
            certifications: prev.certifications.filter((_, i) => i !== index)
        }));
    };

    const addProject = () => {
        if (currentProject.key.trim() && currentProject.value.trim()) {
            setFormData(prev => ({
                ...prev,
                projects: {
                    ...prev.projects,
                    [currentProject.key.trim()]: currentProject.value.trim()
                }
            }));
            setCurrentProject({ key: "", value: "" });
        }
    };

    const removeProject = (key) => {
        setFormData(prev => {
            const newProjects = { ...prev.projects };
            delete newProjects[key];
            return {
                ...prev,
                projects: newProjects
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Convert data types before sending to backend
            const processedData = {
                ...formData,
                dob: new Date(formData.dob).toISOString(),
                education: {
                    tenth: {
                        percent: parseFloat(formData.education.tenth.percent),
                        passedYear: parseInt(formData.education.tenth.passedYear)
                    },
                    twelfth: {
                        percent: parseFloat(formData.education.twelfth.percent),
                        passedYear: parseInt(formData.education.twelfth.passedYear)
                    },
                    graduate: {
                        bachelors: {
                            percent: parseFloat(formData.education.graduate.bachelors.percent),
                            pursuing: formData.education.graduate.bachelors.pursuing,
                            passedYear: formData.education.graduate.bachelors.passedYear ?
                                parseInt(formData.education.graduate.bachelors.passedYear) : undefined,
                            major: formData.education.graduate.bachelors.major,
                            degreeType: formData.education.graduate.bachelors.degreeType
                        },
                        masters: {
                            percent: parseFloat(formData.education.graduate.masters.percent) || 0,
                            pursuing: formData.education.graduate.masters.pursuing,
                            passedYear: formData.education.graduate.masters.passedYear ?
                                parseInt(formData.education.graduate.masters.passedYear) : undefined,
                            major: formData.education.graduate.masters.major,
                            degreeType: formData.education.graduate.masters.degreeType
                        }
                    }
                }
            };

            const res = await API.post("/students/register", processedData);
            localStorage.setItem("token", res.data.token);
            window.location.href = "/students/dashboard";
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-8">
            {/* Navigation Buttons */}
            <div className="absolute top-6 left-6 right-6 flex justify-between">
                <button
                    onClick={() => { Navigate("/") }}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="font-medium">Home</span>
                </button>

                <button
                    onClick={() => { Navigate("/students") }}
                    className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-lg"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-medium">Login</span>
                </button>
            </div>

            {/* Main Register Card */}
            <div className="w-full max-w-4xl">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg mb-6">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-3">Student Register</h1>
                    <p className="text-lg text-gray-600">Create your student profile and get started!</p>
                </div>

                {/* Register Form Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Basic Information */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-gray-800">Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <input
                                        name="name"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="block w-full pl-4 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="block w-full pl-4 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        name="contact"
                                        placeholder="Contact Number"
                                        value={formData.contact}
                                        onChange={handleInputChange}
                                        className="block w-full pl-4 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="block w-full pl-4 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        name="usn"
                                        placeholder="USN"
                                        value={formData.usn}
                                        onChange={handleInputChange}
                                        className="block w-full pl-4 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        name="dob"
                                        type="date"
                                        placeholder="Date of Birth"
                                        value={formData.dob}
                                        onChange={handleInputChange}
                                        className="block w-full pl-4 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        name="major"
                                        placeholder="Major"
                                        value={formData.major}
                                        onChange={handleInputChange}
                                        className="block w-full pl-4 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <textarea
                                        name="experience"
                                        placeholder="Experience (Optional)"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                        className="block w-full pl-4 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        rows="3"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Education Section */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-gray-800">Education</h3>

                            {/* 10th Grade */}
                            <div className="bg-white/70 border border-gray-200 rounded-2xl p-6 shadow-sm">
                                <h4 className="font-medium mb-4 text-gray-700">10th Grade</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        placeholder="Percentage"
                                        value={formData.education.tenth.percent}
                                        onChange={(e) => handleEducationChange('tenth', 'percent', e.target.value)}
                                        className="block w-full pl-4 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                    <input
                                        placeholder="Passed Year"
                                        value={formData.education.tenth.passedYear}
                                        onChange={(e) => handleEducationChange('tenth', 'passedYear', e.target.value)}
                                        className="block w-full pl-4 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                </div>
                            </div>

                            {/* 12th Grade */}
                            <div className="bg-white/70 border border-gray-200 rounded-2xl p-6 shadow-sm">
                                <h4 className="font-medium mb-4 text-gray-700">12th Grade</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        placeholder="Percentage"
                                        value={formData.education.twelfth.percent}
                                        onChange={(e) => handleEducationChange('twelfth', 'percent', e.target.value)}
                                        className="block w-full pl-4 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                    <input
                                        placeholder="Passed Year"
                                        value={formData.education.twelfth.passedYear}
                                        onChange={(e) => handleEducationChange('twelfth', 'passedYear', e.target.value)}
                                        className="block w-full pl-4 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Bachelor's Degree */}
                            <div className="bg-white/70 border border-gray-200 rounded-2xl p-6 shadow-sm">
                                <h4 className="font-medium mb-4 text-gray-700">Bachelor's Degree</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        placeholder="Percentage"
                                        value={formData.education.graduate.bachelors.percent}
                                        onChange={(e) => handleGraduateEducationChange('bachelors', 'percent', e.target.value)}
                                        className="block w-full pl-4 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                    <input
                                        placeholder="Major"
                                        value={formData.education.graduate.bachelors.major}
                                        onChange={(e) => handleGraduateEducationChange('bachelors', 'major', e.target.value)}
                                        className="block w-full pl-4 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                    <input
                                        placeholder="Degree Type"
                                        value={formData.education.graduate.bachelors.degreeType}
                                        onChange={(e) => handleGraduateEducationChange('bachelors', 'degreeType', e.target.value)}
                                        className="block w-full pl-4 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                    <input
                                        placeholder="Passed Year (if completed)"
                                        value={formData.education.graduate.bachelors.passedYear}
                                        onChange={(e) => handleGraduateEducationChange('bachelors', 'passedYear', e.target.value)}
                                        className="block w-full pl-4 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                    />
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="bachelors-pursuing"
                                            checked={formData.education.graduate.bachelors.pursuing}
                                            onChange={(e) => handleGraduateEducationChange('bachelors', 'pursuing', e.target.checked)}
                                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="bachelors-pursuing" className="text-sm text-gray-700">Currently Pursuing</label>
                                    </div>
                                </div>
                            </div>

                            {/* Master's Degree */}
                            <div className="bg-white/70 border border-gray-200 rounded-2xl p-6 shadow-sm">
                                <h4 className="font-medium mb-4 text-gray-700">Master's Degree (Optional)</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        placeholder="Percentage"
                                        value={formData.education.graduate.masters.percent}
                                        onChange={(e) => handleGraduateEducationChange('masters', 'percent', e.target.value)}
                                        className="block w-full pl-4 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                    />
                                    <input
                                        placeholder="Major"
                                        value={formData.education.graduate.masters.major}
                                        onChange={(e) => handleGraduateEducationChange('masters', 'major', e.target.value)}
                                        className="block w-full pl-4 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                    />
                                    <input
                                        placeholder="Degree Type"
                                        value={formData.education.graduate.masters.degreeType}
                                        onChange={(e) => handleGraduateEducationChange('masters', 'degreeType', e.target.value)}
                                        className="block w-full pl-4 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                    />
                                    <input
                                        placeholder="Passed Year (if completed)"
                                        value={formData.education.graduate.masters.passedYear}
                                        onChange={(e) => handleGraduateEducationChange('masters', 'passedYear', e.target.value)}
                                        className="block w-full pl-4 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                    />
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="masters-pursuing"
                                            checked={formData.education.graduate.masters.pursuing}
                                            onChange={(e) => handleGraduateEducationChange('masters', 'pursuing', e.target.checked)}
                                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="masters-pursuing" className="text-sm text-gray-700">Currently Pursuing</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-gray-800">Skills</h3>
                            <div className="flex space-x-2">
                                <input
                                    placeholder="Add a skill"
                                    value={currentSkill}
                                    onChange={(e) => setCurrentSkill(e.target.value)}
                                    className="flex-1 pl-4 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                                />
                                <button
                                    type="button"
                                    onClick={addSkill}
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-2xl shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.skills.map((skill, index) => (
                                    <span key={index} className="bg-gradient-to-r from-purple-200 to-blue-200 px-4 py-2 rounded-full text-sm text-purple-800 font-medium">
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() => removeSkill(index)}
                                            className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Certifications Section */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-gray-800">Certifications</h3>
                            <div className="flex space-x-2">
                                <input
                                    placeholder="Add a certification"
                                    value={currentCertification}
                                    onChange={(e) => setCurrentCertification(e.target.value)}
                                    className="flex-1 pl-4 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                    onKeyPress={(e) => e.key === 'Enter' && addCertification()}
                                />
                                <button
                                    type="button"
                                    onClick={addCertification}
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-2xl shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.certifications.map((cert, index) => (
                                    <span key={index} className="bg-gradient-to-r from-green-200 to-blue-200 px-4 py-2 rounded-full text-sm text-green-800 font-medium">
                                        {cert}
                                        <button
                                            type="button"
                                            onClick={() => removeCertification(index)}
                                            className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Projects Section */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-gray-800">Projects</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    placeholder="Project Name"
                                    value={currentProject.key}
                                    onChange={(e) => setCurrentProject(prev => ({ ...prev, key: e.target.value }))}
                                    className="pl-4 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                />
                                <input
                                    placeholder="Project Description"
                                    value={currentProject.value}
                                    onChange={(e) => setCurrentProject(prev => ({ ...prev, value: e.target.value }))}
                                    className="pl-4 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={addProject}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-2xl shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium"
                            >
                                Add Project
                            </button>
                            <div className="space-y-3">
                                {Object.entries(formData.projects).map(([key, value]) => (
                                    <div key={key} className="bg-white/70 border border-gray-200 rounded-2xl p-4 flex justify-between items-center shadow-sm">
                                        <div className="text-gray-700">
                                            <strong className="text-purple-700">{key}:</strong> {value}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeProject(key)}
                                            className="text-red-500 hover:text-red-700 transition-colors text-lg"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-2xl shadow-lg text-base font-medium text-white bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform hover:scale-[1.02] transition-all duration-200 mt-8"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            Register
                        </button>
                    </form>
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
                                onClick={() => { window.location.href = "mailto:student.council@mail.com?subject=Regarding Student Guide&body=I want to reach out..." }}
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
    );
};

export default StudentRegister;
