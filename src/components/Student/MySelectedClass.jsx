import React, { useContext, useEffect, useState } from 'react';
import useGetData from '../../hooks/useGetData';

import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import CheckOutModal from '../CheckoutForm/CheckOutModal';
import { Link } from 'react-router-dom';

const MySelectedClass = () => {
    const { user } = useContext(AuthContext)
    const [selectedClasses, setSelectedClasses] = useState([]);
    const { data, isLoading, error } = useGetData(`http://localhost:5000/selectedClasses/${user?.email}`);
    const { data: updateDatas } = useGetData(`http://localhost:5000/classes`);
    // const stripePromise = loadStripe(`${import.meta.env.VITE_payment_gateway_pk}`);
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

        try {
            const response = await fetch(`http://localhost:5000/makePayment/${itemId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify({ itemId })
            });

            if (response.ok) {

                console.log('Payment successful');
                alert('Payment successful');
            } else {
                console.log('Payment failed');
                alert('Payment failed');
            }
        } catch (error) {
            console.log('Error:', error);
        }

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
                               <Link to={`/dashboard/checkout/${item._id}`}> <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Payment</button></Link>
                            </td>

                            <td className="border-b px-4 py-2">
                                <button onClick={() => handleDelete(item._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button>
                            </td>


                        </tr>

                    ))}

                </tbody>
            </table>
        </div>
    );
};

export default MySelectedClass;
