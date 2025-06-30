import axios from "axios";
import React, { useState } from "react";

const JobPost = () => {
	const [jobData, setJobData] = useState({
		title: "",
		description: "",
		skills: "",
		criteria: "",
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
			console.error(err);
		}
	};

	return (
		<div>
			<h2>Post a Job</h2>
			{Object.keys(jobData).map((key) => (
				<input
					key={key}
					placeholder={key}
					value={jobData[key]}
					onChange={(e) => setJobData({ ...jobData, [key]: e.target.value })}
				/>
			))}
			<button onClick={handlePost}>Submit</button>
		</div>
	);
};

export default JobPost;
