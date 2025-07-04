import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const registerAdmin = async () => {
        try {
            navigate("/admin/register");
        } catch (err) {
            alert("Login failed");
        }
    };
    const handleLogin = async () => {
        try {
            const res = await API.post("/admin/login", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/admin/dashboard");
        } catch (err) {
            alert("Login failed");
        }
    };

    useEffect(() => {
        try {
            console.log("CHECKING: if admin is already logged in")
            if (localStorage.getItem("token")) {
                navigate("/admin/dashboard")
                console.log("student already logged in")
            }
        } catch {
            console.log("login required")
        }
    }, [])
    return (
        <div className="p-6 w-max mx-auto">
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
            <div className="flex justify-between">
                <button
                    className="px-6 py-2 bg-green-500 fill-gray-50 cursor-pointer rounded-md"
                    onClick={handleLogin}
                >
                    Login
                </button>
                <button
                    onClick={registerAdmin}
                    className="underline text-white px-4 py-2 mt-3 cursor-pointer rounded-md"
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default AdminLogin;
