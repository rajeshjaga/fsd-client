import axios from "axios";

const API = axios.create({
	baseURL: "http://localhost:5000/api",
});

// For adding auth header
API.interceptors.request.use((req) => {
	return req;
});

export default API;
