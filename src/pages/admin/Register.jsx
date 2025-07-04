import axios from "axios";
import React, { useState } from "react";

const AdminRegister = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        password: "",
    });

    const handleSubmit = async () => {
        try {
            const res = await API.post("/students/register", formData);
            localStorage.setItem("token", res.data.token);
            window.location.href = "/admin/dashboard";
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="p-6 w-max mx-auto mt-[6rem]">
            <h2 className="text-3xl font-bold mb-4">Company Register</h2>
            {Object.keys(formData).map((key) => (
                <input
                    key={key}
                    placeholder={key}
                    value={formData[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                />
            ))}
            <button
                className="bg-green-600 text-white px-4 py-2 mt-3 cursor-pointer rounded-md"
                onClick={handleSubmit}
            >
                Register
            </button>
        </div>
    );
};

export default AdminRegister;
