import React from "react";

const ApplyJob = ({ student, job }) => {
    const studentMarks = student.education;
    const jobMinMarks = job.minMarks;

    function isEligible(studentMarks, jobMinMarks) {
        return (
            studentMarks.tenth >= jobMinMarks.tenth &&
            studentMarks.twelfth >= jobMinMarks.twelfth &&
            studentMarks.ug >= jobMinMarks.ug &&
            (jobMinMarks.pg ? studentMarks.pg >= jobMinMarks.pg : true)
        );
    }
    return (
        <div className="flex justify-between px-4 py-6 bg-gray-800 rounded my-8 cursor-pointer hover:shadow-xl ">
            <div>
                <h1>{job.title}</h1>
                <p>{job.description}</p>
            </div>
            <p className="bg-red-600 h-max rounded p-1 w-content">Eligible</p>
        </div>
    )
}
export default ApplyJob;
