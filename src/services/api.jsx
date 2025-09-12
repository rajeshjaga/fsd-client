// import axios from "axios";
// import { configDotenv } from "dotenv";
//
// configDotenv();
// const API = axios.create({
// 	baseURL: "http://localhost:5000/api",
// });
//
// // For adding auth header
// API.interceptors.request.use((req) => {
// 	return req;
// });
//
// export default API// api.js
import axios from "axios";

// In React with Vite, environment variables must start with VITE_
const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// For adding auth header
API.interceptors.request.use((req) => {
    // Get token from localStorage if it exists
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// Response interceptor for handling errors
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized - redirect to login or clear token
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            // window.location.href = '/login'; // Uncomment if needed
        }
        return Promise.reject(error);
    }
);

export default API;
