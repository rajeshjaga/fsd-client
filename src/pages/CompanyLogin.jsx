import axios from "axios";
import React, { useState } from "react";

const CompanyLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		try {
			const res = await axios.post(
				"http://localhost:5000/api/companies/login",
				{ email, password },
			);
			localStorage.setItem("token", res.data.token);
			window.location.href = "/companies/dashboard";
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div class="p-6 w-max mx-auto">
			<h2 className="text-3xl font-bold my-6">Company Login</h2>
			<input
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Email"
			/>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
			/>
			<button
				className="px-6 py-2 bg-green-500 fill-gray-50 cursor-pointer rounded-md"
				onClick={handleLogin}
			>
				Login
			</button>
		</div>
	);
};

export default CompanyLogin;
