import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompanyDashboard from "./pages/CompanyDashboard";
import CompanyLogin from "./pages/CompanyLogin";
import CompanyRegister from "./pages/CompanyRegister";
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
				<Route path="/companies" element={<CompanyLogin />} />
				<Route path="/companies/register" element={<CompanyRegister />} />
				<Route path="/companies/dashboard" element={<CompanyDashboard />} />
				<Route path="/companies/post-job" element={<JobPost />} />
				<Route
					path="/companies/applicants/:jobId"
					element={<ViewApplicants />}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
