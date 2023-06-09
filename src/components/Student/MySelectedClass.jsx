import React, { useContext, useEffect, useState } from 'react';
import useGetData from '../../hooks/useGetData';

import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';

const MySelectedClass = () => {
    const { user } = useContext(AuthContext)
    const [selectedClasses, setSelectedClasses] = useState([]);
    const { data, isLoading, error } = useGetData(`http://localhost:5000/selectedClasses/${user?.email}`);

    useEffect(() => {
        setSelectedClasses(data);
    }, [data]);


    //delete function
    const handleDelete = async (itemId) => {
        alert("are you sure you want to delete this item")
        try {
            await axios.delete(`http://localhost:5000/selectedClasses/${user?.email}/${itemId}`);
             const updatedData = selectedClasses.filter((item) => item._id !== itemId);
            setSelectedClasses(updatedData);
        } catch (error) {
            console.error(error);
        }
    };

    //handle payment 
    const handlePayment = async (itemId) => {
        console.log(itemId)
    };

    return (
        <div className="overflow-x-auto ml-[18%]">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border-b px-4 py-2">#</th>
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
                    {selectedClasses?.map((item, index) => (
                        <tr key={item._id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                            <td className="border-b px-4 py-2">{index + 1}</td>
                            <td className="border-b px-4 py-2">
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item?.selectedClasses?.classImage} alt="Avatar" />
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
                                <button onClick={()=>handlePayment(item._id)} className="btn btn-ghost btn-xs">Payment</button>
                            </td>
                            <td className="border-b px-4 py-2">
                                <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-xs">Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MySelectedClass;
