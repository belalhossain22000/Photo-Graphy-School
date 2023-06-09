import React, { useContext } from 'react';
import useGetData from '../../hooks/useGetData';

import { AuthContext } from '../../Provider/AuthProvider';

const MySelectedClass = () => {
    const { user } = useContext(AuthContext)
    // console.log(user)
    const { data, isLoading, error } = useGetData(`http://localhost:5000/selectedClasses/${user?.email}`);
     
            console.log(data)

    return (
        <div>
            <div className="overflow-x-auto ">
                <table className="min-w-full border border-gray-300">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="border-b px-4 py-2"> #</th>
                            <th className="border-b px-4 py-2">Name</th>
                            <th className="border-b px-4 py-2">Email</th>
                            <th className="border-b px-4 py-2">Available Seats</th>
                            <th className="border-b px-4 py-2">Price</th>
                            <th className="border-b px-4 py-2">Payment</th>
                            <th className="border-b px-4 py-2">Remove</th>
                            <th className="border-b"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, index) => (
                            <tr key={item._id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                <td className="border-b px-4 py-2">{index + 1}</td>
                                <td className="border-b px-4 py-2">
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item?.selectedClasses?.classImage} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{item?.selectedClasses?.className}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="border-b px-4 py-2">{item?.selectedClasses?.instructorName}</td>
                                <td className="border-b px-4 py-2">{item?.selectedClasses?.availableSeats}</td>
                                <td className="border-b px-4 py-2">{item?.selectedClasses?.price}</td>
                                <td className="border-b px-4 py-2">
                                    <button className="btn btn-ghost btn-xs">Payment</button>
                                </td>
                                <td className="border-b px-4 py-2">
                                    <button className="btn btn-ghost btn-xs">Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySelectedClass;
