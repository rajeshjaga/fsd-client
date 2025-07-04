import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const [job, setJob] = useState({
        title: "",
        description: "",
        skills: "",
        criteria: "",
    });

    const handleLogout = () => {
        localStorage.clear(); // or removeItem('token') if using tokens
        navigate("/");
    };

    const handleChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    const handlePostJob = async () => {
        try {
            await axios.post("http://localhost:5000/api/jobs", job);
            alert("Job posted successfully");
            setJob({ title: "", description: "", skills: "", criteria: "" });
        } catch (err) {
            console.error("Job post failed:", err);
        }
    };

    return (
        <div className="min-h-screen  p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Company Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500  px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>

            <div className=" p-6 rounded shadow-md shadow-gray-900 border-b-amber-50 br-1">
                <h2 className="text-xl font-semibold mb-4">Post a New Job</h2>
                <div className="grid gap-4">
                    <input
                        type="text"
                        name="title"
                        value={job.title}
                        onChange={handleChange}
                        placeholder="Job Title"
                        className="p-2 border rounded"
                    />
                    <textarea
                        name="description"
                        value={job.description}
                        onChange={handleChange}
                        placeholder="Job Description"
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="skills"
                        value={job.skills}
                        onChange={handleChange}
                        placeholder="Required Skills (comma-separated)"
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="criteria"
                        value={job.criteria}
                        onChange={handleChange}
                        placeholder="Eligibility Criteria"
                        className="p-2 border rounded"
                    />
                    <button
                        onClick={handlePostJob}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Post Job
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
