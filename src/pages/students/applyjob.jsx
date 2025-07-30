import { useState } from 'react';

const ApplyJob = ({ student, job }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const studentMarks = student.education;
    const jobMinMarks = job.minMarks;

    function isEligible(studentMarks, jobMinMarks) {
        console.log(studentMarks)
        console.log(jobMinMarks)
        return (
            studentMarks.tenth >= jobMinMarks.tenth &&
            studentMarks.twelfth >= jobMinMarks.twelfth &&
            studentMarks.graduate >= jobMinMarks.ug &&
            (jobMinMarks.pg ? studentMarks.pg >= jobMinMarks.pg : true)
        );
    }

    const eligible = isEligible(studentMarks, jobMinMarks);

    const handleApply = () => {
        if (eligible) {
            // Add your apply logic here
            console.log(`Applied for ${job.title}`);
            alert(`Successfully applied for ${job.title}!`);
            setIsModalOpen(false);
        }
    };

    return (
        <>
            {/* Main Job Card - Minimized View */}
            <div
                className="flex justify-between items-center px-6 py-4 bg-white/70 border border-gray-200 rounded-2xl cursor-pointer hover:shadow-lg hover:bg-white/80 transition-all duration-200"
                onClick={() => setIsModalOpen(true)}
            >
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{job.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{job.description}</p>
                    <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                        <span>Company: {job.company || 'N/A'}</span>
                        <span>•</span>
                        <span>Location: {job.location || 'N/A'}</span>
                        <span>•</span>
                        <span>Salary: {job.salary || 'N/A'}</span>
                    </div>
                </div>

                {/* Eligibility Indicator */}
                <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${eligible
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {eligible ? 'Eligible' : 'Not Eligible'}
                    </span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>

            {/* Modal - Maximized View */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2v-8a2 2 0 012-2V6" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
                                    <p className="text-gray-600">{job.company || 'Company Name'}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-8">
                            {/* Job Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Basic Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800">Job Information</h3>
                                    <div className="bg-white/70 rounded-2xl p-4 space-y-3">
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Position</label>
                                            <p className="text-gray-800">{job.title}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Company</label>
                                            <p className="text-gray-800">{job.company || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Location</label>
                                            <p className="text-gray-800">{job.location || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Salary</label>
                                            <p className="text-gray-800">{job.salary || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Experience Required</label>
                                            <p className="text-gray-800">{job.experience || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Job Type</label>
                                            <p className="text-gray-800">{job.jobType || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Minimum Marks Requirements */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800">Eligibility Requirements</h3>
                                    <div className="bg-white/70 rounded-2xl p-4 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-600">10th Grade</span>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-gray-800">{jobMinMarks.tenth}% required</span>
                                                <span className={`text-sm ${studentMarks.tenth >= jobMinMarks.tenth ? 'text-green-600' : 'text-red-600'}`}>
                                                    (Your: {studentMarks.tenth}%)
                                                </span>
                                                {studentMarks.tenth >= jobMinMarks.tenth ? (
                                                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-600">12th Grade</span>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-gray-800">{jobMinMarks.twelfth}% required</span>
                                                <span className={`text-sm ${studentMarks.twelfth >= jobMinMarks.twelfth ? 'text-green-600' : 'text-red-600'}`}>
                                                    (Your: {studentMarks.twelfth}%)
                                                </span>
                                                {studentMarks.twelfth >= jobMinMarks.twelfth ? (
                                                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-600">UG/Bachelor's</span>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-gray-800">{jobMinMarks.ug}% required</span>
                                                <span className={`text-sm ${studentMarks.ug >= jobMinMarks.ug ? 'text-green-600' : 'text-red-600'}`}>
                                                    (Your: {studentMarks.ug}%)
                                                </span>
                                                {studentMarks.ug >= jobMinMarks.ug ? (
                                                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                        {jobMinMarks.pg && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium text-gray-600">PG/Master's</span>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-gray-800">{jobMinMarks.pg}% required</span>
                                                    <span className={`text-sm ${studentMarks.pg >= jobMinMarks.pg ? 'text-green-600' : 'text-red-600'}`}>
                                                        (Your: {studentMarks.pg || 'N/A'}%)
                                                    </span>
                                                    {studentMarks.pg >= jobMinMarks.pg ? (
                                                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Job Description */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800">Job Description</h3>
                                <div className="bg-white/70 rounded-2xl p-4">
                                    <p className="text-gray-700 leading-relaxed">{job.description}</p>
                                </div>
                            </div>

                            {/* Skills Required */}
                            {job.skills && job.skills.length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800">Skills Required</h3>
                                    <div className="bg-white/70 rounded-2xl p-4">
                                        <div className="flex flex-wrap gap-2">
                                            {job.skills.map((skill, index) => (
                                                <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Eligibility Status */}
                            <div className="bg-white/70 rounded-2xl p-6 text-center">
                                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-lg font-semibold ${eligible
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}>
                                    {eligible ? (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    <span>{eligible ? 'You are eligible for this position!' : 'You are not eligible for this position'}</span>
                                </div>
                                {!eligible && (
                                    <p className="text-gray-600 mt-2">Please improve your academic performance to meet the requirements.</p>
                                )}
                            </div>
                        </div>

                        {/* Modal Footer with Apply Button */}
                        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50/50 rounded-b-3xl">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                            >
                                Close
                            </button>

                            <button
                                onClick={handleApply}
                                disabled={!eligible}
                                className={`px-8 py-3 rounded-2xl font-medium transition-all duration-200 ${eligible
                                    ? 'bg-gradient-to-r from-purple-600 to-green-600 text-white hover:from-purple-700 hover:to-green-700 shadow-lg hover:scale-105'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {eligible ? 'Apply Now' : 'Not Eligible'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ApplyJob;
