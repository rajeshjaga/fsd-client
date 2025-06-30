import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const StudentLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			const res = await API.post("/students/login", { email, password });
			localStorage.setItem("token", res.data.token);
			navigate("/students/dashboard");
		} catch (err) {
			alert("Login failed");
		}
	};

	const register = async () => {
		try {
			navigate("/students/register");
		} catch (err) {
			alert("Login failed");
		}
	};
	return (
		<div className="p-6 w-max mx-auto mt-[6rem]">
			<h2 className="text-2xl font-bold mb-4">Student Login</h2>
			<input
				type="email"
				placeholder="Email"
				onChange={(e) => setEmail(e.target.value)}
				className="input"
			/>
			<input
				type="password"
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
				className="input"
			/>
			<div className="flex justify-between">
				<button
					onClick={handleLogin}
					className="bg-green-600 text-white px-4 py-2 mt-3 cursor-pointer rounded-md"
				>
					Login
				</button>
				<button
					onClick={register}
					className="underline text-white px-4 py-2 mt-3 cursor-pointer rounded-md"
				>
					Register
				</button>
			</div>
		</div>
	);
};

export default StudentLogin;
