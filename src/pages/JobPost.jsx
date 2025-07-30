import axios from "axios";
import React, { useState } from "react";

const JobPost = (jobData) => {
    const [job, setJob] = useState({
        companyName: "",
        title: "",
        jobDescription: "",
        skillsRequired: [], // This should be an array for multiselect or comma-separated input
        minMarks: {
            tenth: "",
            twelfth: "",
            ug: "",
            pg: "", // optional
        },
        status: "open",
        applicationDeadline: ""
    });



    const handlePost = async () => {
        try {
            await axios.post("http://localhost:5000/api/jobs", jobData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            alert("Job posted");
        } catch (err) {
            alert(err);
        }
    };
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
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(job);
    };
    return (
        <div className="w-max">
            <h2>Post a Job</h2>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-md space-y-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Post a New Job</h2>

                <div>
                    <label className="block mb-1 font-medium text-gray-600">Company Name</label>
                    <input
                        type="text"
                        name="companyName"
                        value={job.companyName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-600">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={job.title}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-600">Job Description</label>
                    <textarea
                        name="jobDescription"
                        value={job.jobDescription}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-600">Skills <span className="text-sm text-gray-400">(comma-separated)</span></label>
                    <input
                        type="text"
                        name="skillsRequired"
                        value={job.skillsRequired.join(", ")}
                        onChange={handleSkillsChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <fieldset className="border p-4 rounded-lg">
                    <legend className="text-gray-600 font-semibold">Minimum Marks (%)</legend>
                    <div className="grid grid-cols-4 gap-4 mt-2">
                        <div>
                            <label className="block mb-1 text-xs text-gray-500">10th</label>
                            <input
                                type="number"
                                name="tenth"
                                value={job.minMarks.tenth}
                                onChange={handleChange}
                                required
                                className="w-full px-2 py-1 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-xs text-gray-500">12th</label>
                            <input
                                type="number"
                                name="twelfth"
                                value={job.minMarks.twelfth}
                                onChange={handleChange}
                                required
                                className="w-full px-2 py-1 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-xs text-gray-500">UG</label>
                            <input
                                type="number"
                                name="ug"
                                value={job.minMarks.ug}
                                onChange={handleChange}
                                required
                                className="w-full px-2 py-1 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-xs text-gray-500">PG (optional)</label>
                            <input
                                type="number"
                                name="pg"
                                value={job.minMarks.pg}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border rounded"
                            />
                        </div>
                    </div>
                </fieldset>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block mb-1 font-medium text-gray-600">Status</label>
                        <select
                            name="status"
                            value={job.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 font-medium text-gray-600">Application Deadline</label>
                        <input
                            type="date"
                            name="applicationDeadline"
                            value={job.applicationDeadline}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 mt-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                >
                    Post Job
                </button>
            </form>
            <button className="px-4 py-2 bg-green-300 rounded hover:bg-green-500" onClick={handlePost}>Submit</button>
        </div>
    );
};

export default JobPost;
