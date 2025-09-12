import React from "react";
import Home from "./pages/Home";
import NotFound from "./utilities/notfound";
//import JobPost from "./pages/JobPost";
import ViewApplicants from "./pages/ViewApplicants";
import { AdminProvider } from "./context/adminContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StudentRegister, StudentLogin, StudentDashboard } from "./pages/students";
import { AdminRegister, JobDisplayPage, AdminLogin, AdminProfile, AdminDashboard } from "./pages/admin";

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
