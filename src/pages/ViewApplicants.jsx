import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const ViewApplicants = () => {
    const { jobId } = useParams();
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const res = await API.get(`/jobs/${jobId}/applicants`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                },
                );
                setApplicants(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchApplicants();
    }, [jobId]);

    return (
        <div>
            <h2>Applicants</h2>
            {applicants.map((app) => (
                <div key={app._id}>
                    {app.name} — {app.email}
                </div>
            ))}
        </div>
    );
};
export default ViewApplicants;
