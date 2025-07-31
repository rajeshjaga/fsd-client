import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminRegister, JobDisplayPage, AdminLogin, AdminProfile, AdminDashboard } from "./pages/admin";
import Home from "./pages/Home";
import JobPost from "./pages/JobPost";
import { StudentRegister, StudentLogin, StudentDashboard } from "./pages/students";
import ViewApplicants from "./pages/ViewApplicants";
import NotFound from "./utilities/notfound";
import { AdminProvider } from "./context/adminContext";

const App = () => {
    return (
        <AdminProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/students" element={<StudentLogin />} />
                    <Route path="/students/register" element={<StudentRegister />} />
                    <Route path="/students/dashboard" element={<StudentDashboard />} />
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/register" element={<AdminRegister />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/posted" element={<JobDisplayPage />} />
                    {/* <Route path="/admin/post-job" element={<JobPost />} /> */}
                    <Route path="/admin/profile" element={<AdminProfile />} />
                    <Route path="/admin/applicants/:jobId" element={<ViewApplicants />} />
                    <Route path="/admin/*" element={<NotFound />} />
                    <Route path="/students/*" element={<NotFound />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </AdminProvider>
    );
};

export default App;
