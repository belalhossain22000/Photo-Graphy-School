import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyClasses = () => {
    const [classes, setClasses] = useState([]);
    

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/classes');
            setClasses(response.data);
        } catch (error) {
            console.error(error);
        }
    };

console.log(classes)

    const renderStatus = (status) => {
        if (status === 'pending') {
            return <span className="text-yellow-500">Pending</span>;
        } else if (status === 'approved') {
            return <span className="text-green-500">Approved</span>;
        } else if (status === 'denied') {
            return <span className="text-red-500">Denied</span>;
        }
    };

    const renderFeedback = (status, feedback) => {
        if (status === 'denied') {
            return feedback ? <span>{feedback}</span> : null;
        }
        return null;
    };

    const renderTotalEnrolledStudents = (students) => {
        if (students?.length > 0) {
            return students?.length;
        }
        return 0;
    };

    const handleUpdateClass = (classId) => {
        // Handle update button click
        console.log(`Update class: ${classId}`);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">My Classes</h2>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Class Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Enrolled Students
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Feedback
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {classes.map((classItem) => (
                        <tr key={classItem._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{classItem.className}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm">{renderStatus(classItem.status)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-center">{renderTotalEnrolledStudents(classItem?.students)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm">{renderFeedback(classItem.status, classItem?.feedback)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button onClick={() => handleUpdateClass(classItem._id)} className="text-blue-600 hover:text-blue-900">
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyClasses;
