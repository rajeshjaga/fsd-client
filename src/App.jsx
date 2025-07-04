import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import Home from "./pages/Home";
import JobPost from "./pages/JobPost";
import StudentDashboard from "./pages/StudentDashboard";
import StudentLogin from "./pages/StudentLogin";
import StudentRegister from "./pages/StudentRegister";
import ViewApplicants from "./pages/ViewApplicants";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/students" element={<StudentLogin />} />
                <Route path="/students/register" element={<StudentRegister />} />
                <Route path="/students/dashboard" element={<StudentDashboard />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/register" element={<AdminRegister />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/post-job" element={<JobPost />} />
                <Route
                    path="/admin/applicants/:jobId"
                    element={<ViewApplicants />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
