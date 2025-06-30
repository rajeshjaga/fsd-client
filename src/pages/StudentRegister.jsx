import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const StudentRegister = () => {
	const [form, setForm] = useState({
		name: "",
		usn: "",
		age: "",
		department: "",
		experience: "",
		tenth: "",
		twelfth: "",
		degree: "",
		masters: "",
		projects: "",
		skills: "",
		certifications: "",
		contact: "",
		email: "",
		password: "",
	});
	const navigate = useNavigate();

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		try {
			const data = {
				...form,
				education: {
					tenth: Number(form.tenth),
					twelfth: Number(form.twelfth),
					degree: Number(form.degree),
					masters: Number(form.masters),
				},
				projects: form.projects.split(","),
				skills: form.skills.split(","),
				certifications: form.certifications.split(","),
			};
			const res = await API.post("/students/register", data);
			localStorage.setItem("token", res.data.token);
			navigate("/students/dashboard");
		} catch (err) {
			alert(err.response.data.message || "Registration failed");
		}
	};

	return (
		<div className="flex flex-col m-[160px]">
			<h2 className="text-2xl font-bold mb-4">Student Registration</h2>
			<input
				name="name"
				placeholder="Name"
				onChange={handleChange}
				className="input mt-[16px]"
				required
			/>
			<input
				name="usn"
				placeholder="USN"
				onChange={handleChange}
				className="input mt-[16px]"
				required
			/>
			<input
				name="age"
				placeholder="Age"
				onChange={handleChange}
				className="input mt-[16px]"
			/>
			<input
				name="department"
				placeholder="Department"
				onChange={handleChange}
				className="input mt-[16px]"
			/>
			<input
				name="experience"
				placeholder="Experience"
				onChange={handleChange}
				className="input mt-[16px]"
			/>
			<input
				name="tenth"
				placeholder="10th Marks"
				onChange={handleChange}
				className="input mt-[16px]"
			/>
			<input
				name="twelfth"
				placeholder="12th Marks"
				onChange={handleChange}
				className="input mt-[16px]"
			/>
			<input
				name="degree"
				placeholder="Degree Marks"
				onChange={handleChange}
				className="input mt-[16px]"
			/>
			<input
				name="masters"
				placeholder="Masters Marks"
				onChange={handleChange}
				className="input mt-[16px]"
			/>
			<input
				name="projects"
				placeholder="Projects (comma separated)"
				onChange={handleChange}
				className="input mt-[16px]"
			/>
			<input
				name="skills"
				placeholder="Skills (comma separated)"
				onChange={handleChange}
				className="input mt-[16px]"
			/>
			<input
				name="certifications"
				placeholder="Certifications (comma separated)"
				onChange={handleChange}
				className="input mt-[16px]"
			/>
			<input
				name="contact"
				placeholder="Contact No."
				onChange={handleChange}
				className="input mt-[16px]"
				required
			/>
			<input
				name="email"
				placeholder="Email"
				onChange={handleChange}
				className="input mt-[16px]"
				required
			/>
			<input
				name="password"
				required
				type="password"
				placeholder="Password"
				onChange={handleChange}
				className="input mt-[16px]"
			/>
			<button
				onClick={handleSubmit}
				className="bg-blue-600 text-white px-4 py-2 mt-3"
			>
				Register
			</button>
		</div>
	);
};

export default StudentRegister;
