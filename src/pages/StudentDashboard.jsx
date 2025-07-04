import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
    const [student, setStudent] = useState(null);

    const handleLogin = async () => {
        try {
            localStorage.clear();
            window.location.href = "/";
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await API.get('/students/dashboard');
            setStudent(res.data);
        };
        fetchData();
    }, []);

    return (
        <div className="p-6">
            <div className="p-6 flex justify-between">
                <h2 className="text-2xl font-bold">Welcome, {student?.name}</h2>
                <button onClick={handleLogin}>Logout</button>
            </div>
            <div className="p-6">
                <h4 className="mt-4">Applied Jobs:</h4>
                <ul className="list-disc pl-4">
                    {student?.appliedJobs.map(job => (
                        <li key={job._id}>{job.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default StudentDashboard;
