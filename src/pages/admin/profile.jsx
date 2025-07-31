import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, MapPin, Shield, Settings, Camera, Save, Edit3, Key } from 'lucide-react';
import { useAdmin } from "../../context/adminContext";
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({});
    const { admin, setAdmin } = useAdmin();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const Navigate = useNavigate()

    const handleInputChange = (field, value) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const Admin = admin.Admin
    const handleSave = () => {
        setIsEditing(false);
        // Add save logic here
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl capitalize font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                    {Admin && Admin.adminName} Profile
                                </h3>
                                <p className="text-sm text-gray-500">Manage your account settings</p>
                            </div>
                        </div>

                        <div className="relative inline-block text-left">
                            {/* Dropdown toggle button */}
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="inline-flex items-center space-x-2 bg-white hover:bg-gray-50 px-4 py-2 rounded-xl border border-gray-200/60 shadow-sm transition-all duration-200 hover:shadow-md text-gray-700"
                                aria-haspopup="true"
                                aria-expanded={isDropdownOpen}
                            >
                                <Edit3 className="w-4 h-4" />
                                <span>{isEditing ? "Editing Profile" : "Edit Profile"}</span>
                                <svg
                                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown menu */}
                            {isDropdownOpen && (
                                <div
                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="menu-button"
                                    tabIndex={-1}
                                >
                                    <div className="py-1" role="none">
                                        {!isEditing ? (
                                            <>
                                                <button
                                                    onClick={() => {
                                                        setIsEditing(true);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className="text-gray-700 block w-full text-left px-4 py-2 hover:bg-gray-100"
                                                    role="menuitem"
                                                    tabIndex={-1}
                                                >
                                                    <Edit3 className="inline w-4 h-4 mr-2" />
                                                    Edit Profile
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        Navigate("/admin/dashboard");
                                                    }}
                                                    className="text-gray-700 block w-full text-left px-4 py-2 hover:bg-gray-100"
                                                    role="menuitem"
                                                    tabIndex={-1}
                                                >
                                                    Home
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => {
                                                        setIsEditing(false);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className="text-gray-700 block w-full text-left px-4 py-2 hover:bg-gray-100"
                                                    role="menuitem"
                                                    tabIndex={-1}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        handleSave();
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className="flex items-center w-full text-left px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                                                    role="menuitem"
                                                    tabIndex={-1}
                                                >
                                                    <Save className="w-4 h-4 mr-2" />
                                                    Save Changes
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* <div className="flex items-center space-x-3"> */}
                        {/*     {isEditing ? ( */}
                        {/*         <> */}
                        {/*             <button */}
                        {/*                 onClick={() => setIsEditing(false)} */}
                        {/*                 className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200" */}
                        {/*             > */}
                        {/*                 Cancel */}
                        {/*             </button> */}
                        {/*             <button */}
                        {/*                 onClick={handleSave} */}
                        {/*                 className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl" */}
                        {/*             > */}
                        {/*                 <Save className="w-4 h-4" /> */}
                        {/*                 <span>Save Changes</span> */}
                        {/*             </button> */}
                        {/*         </> */}
                        {/*     ) : ( */}
                        {/*         <button */}
                        {/*             onClick={() => setIsEditing(true)} */}
                        {/*             className="inline-flex items-center space-x-2 bg-white hover:bg-gray-50 px-4 py-2 rounded-xl border border-gray-200/60 shadow-sm transition-all duration-200 hover:shadow-md text-gray-700" */}
                        {/*         > */}
                        {/*             <Edit3 className="w-4 h-4" /> */}
                        {/*             <span>Edit Profile</span> */}
                        {/*         </button> */}
                        {/*     )} */}
                        {/* </div> */}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/60 p-8">
                            <div className="text-center">
                                <div className="relative inline-block">
                                    <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white font-bold text-4xl mx-auto mb-4">
                                        A
                                    </div>
                                    {isEditing && (
                                        <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white border border-gray-300 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 shadow-lg">
                                            <Camera className="w-4 h-4 text-gray-600" />
                                        </button>
                                    )}
                                </div>

                                <h2 className="text-2xl capitalize font-bold text-gray-900 mb-2">{Admin.adminName}</h2>
                            </div>
                        </div>

                        {/*     {/* Quick Actions */}
                        {/*     <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/60 p-6 mt-6"> */}
                        {/*         <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3> */}
                        {/*         <div className="space-y-3"> */}
                        {/*             <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors duration-200 text-blue-700"> */}
                        {/*                 <Key className="w-5 h-5" /> */}
                        {/*                 <span>Change Password</span> */}
                        {/*             </button> */}
                        {/*             <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200 text-gray-700"> */}
                        {/*                 <Settings className="w-5 h-5" /> */}
                        {/*                 <span>System Settings</span> */}
                        {/*             </button> */}
                        {/*         </div> */}
                        {/*     </div> */}
                        {/* </div> */}

                        {/* Profile Details */}
                        <div className="lg:col-span-2 mt-5">
                            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/60 p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={Admin.adminName}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            />
                                        ) : (
                                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                                                <User className="w-5 h-5 text-gray-400" />
                                                <span className="text-gray-900">{Admin.adminName}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                value={Admin.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            />
                                        ) : (
                                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                                                <Mail className="w-5 h-5 text-gray-400" />
                                                <span className="text-gray-900">{Admin.email}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={Admin.contact}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            />
                                        ) : (
                                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                                                <Phone className="w-5 h-5 text-gray-400" />
                                                <span className="text-gray-900">{Admin.contact}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Password
                                        </label>
                                        <p>WIP</p>
                                        {/* {isEditing ? ( */}
                                        {/*     <input */}
                                        {/*         type="tel" */}
                                        {/*         value={Admin.password} */}
                                        {/*         onChange={(e) => handleInputChange('phone', e.target.value)} */}
                                        {/*         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" */}
                                        {/*     /> */}
                                        {/* ) : ( */}
                                        {/*     <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl"> */}
                                        {/*         <Phone className="w-5 h-5 text-gray-400" /> */}
                                        {/*         <span className="text-gray-900">{Admin.password}</span> */}
                                        {/*     </div> */}
                                        {/* )} */}
                                    </div>

                                    {/*     {/* Location */}
                                    {/*     <div> */}
                                    {/*         <label className="block text-sm font-medium text-gray-700 mb-2"> */}
                                    {/*             Location */}
                                    {/*         </label> */}
                                    {/*         {isEditing ? ( */}
                                    {/*             <input */}
                                    {/*                 type="text" */}
                                    {/*                 value={profileData.location} */}
                                    {/*                 onChange={(e) => handleInputChange('location', e.target.value)} */}
                                    {/*                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" */}
                                    {/*             /> */}
                                    {/*         ) : ( */}
                                    {/*             <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl"> */}
                                    {/*                 <MapPin className="w-5 h-5 text-gray-400" /> */}
                                    {/*                 <span className="text-gray-900">{profileData.location}</span> */}
                                    {/*             </div> */}
                                    {/*         )} */}
                                    {/*     </div> */}
                                    {/* </div> */}
                                    {/**/}
                                    {/* {/* Bio */}
                                    {/* <div className="mt-6"> */}
                                    {/*     <label className="block text-sm font-medium text-gray-700 mb-2"> */}
                                    {/*         Bio */}
                                    {/*     </label> */}
                                    {/*     {isEditing ? ( */}
                                    {/*         <textarea */}
                                    {/*             value={profileData.bio} */}
                                    {/*             onChange={(e) => handleInputChange('bio', e.target.value)} */}
                                    {/*             rows={4} */}
                                    {/*             className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none" */}
                                    {/*         /> */}
                                    {/*     ) : ( */}
                                    {/*         <div className="p-4 bg-gray-50 rounded-xl"> */}
                                    {/*             <p className="text-gray-700">{profileData.bio}</p> */}
                                    {/*         </div> */}
                                    {/*     )} */}
                                    {/* </div> */}

                                    {/* {/* Permissions */}
                                    {/* <div className="mt-8"> */}
                                    {/*     <h4 className="text-lg font-semibold text-gray-900 mb-4">Admin Permissions</h4> */}
                                    {/*     <div className="grid grid-cols-2 gap-3"> */}
                                    {/*         {profileData.permissions.map((permission, index) => ( */}
                                    {/*             <div key={index} className="flex items-center space-x-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50"> */}
                                    {/*                 <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div> */}
                                    {/*                 <span className="text-sm font-medium text-blue-700">{permission}</span> */}
                                    {/*             </div> */}
                                    {/*         ))} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminProfile;
