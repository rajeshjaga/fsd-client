import React from "react";
const StatCard = ({ title, value }) => {


    return (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm capitalize font-medium text-gray-600">{title}</h3>
            </div>

            <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-gray-900">{value}</div>
            </div>
        </div>
    );
}

export default StatCard;
