import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { AuthContext } from '../../Provider/AuthProvider';
import { useLoaderData } from 'react-router-dom';

const UpdateClasses = () => {
    const classesData=useLoaderData()
    console.log(classesData)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext)
  

    const onSubmit = (data) => {
      console.log(data);
    
      // Send the form data to the server using Axios
      axios
        .patch(`http://localhost:5000/classes/${classesData?._id}`, data)
        .then((response) => {
          console.log("Data successfully sent to the server:", response.data);
          // Perform any further actions after successful submission
          alert('Successfully updated classes')
        })
        .catch((error) => {
          console.error("Error sending data to the server:", error);
          // Handle the error appropriately
        });
    };
    

  return (
    <div className="w-[50%]  mx-auto p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Update class</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="className" className="block text-sm font-medium mb-1">Class Name</label>
                    <input defaultValue={classesData?.className}  {...register('className', { required: true })} type="text" id="className" className="input border-2 border-gray-300 p-2 w-full rounded-md" />
                    {errors.className && <span className="text-red-500">Class Name is required</span>}
                </div>

                <div>
                    <label htmlFor="classImage" className="block text-sm font-medium mb-1">Class Image URL</label>
                    <input defaultValue={classesData?.classImage} {...register('classImage', { required: true })} type="photoURL" id="classImage" className="input border-2 border-gray-300 p-2 w-full rounded-md" />
                    {errors.classImage && <span className="text-red-500">Class Image URL is required</span>}
                </div>

                <div>
                    <label htmlFor="instructorName" className="block text-sm font-medium mb-1">Instructor Name</label>
                    <input  {...register('instructorName')} type="text" id="instructorName" readOnly defaultValue={user?.displayName} className="input border-2 border-gray-300 p-2 w-full rounded-md" />
                </div>

                <div>
                    <label htmlFor="instructorEmail" className="block text-sm font-medium mb-1">Instructor Email</label>
                    <input {...register('instructorEmail')} type="email" id="instructorEmail" readOnly defaultValue={user?.email} className="input border-2 border-gray-300 p-2 w-full rounded-md" />
                </div>

                <div>
                    <label htmlFor="availableSeats" className="block text-sm font-medium mb-1">Available Seats</label>
                    <input defaultValue={classesData?.availableSeats} {...register('availableSeats', { required: true })} type="number" id="availableSeats" className="input border-2 border-gray-300 p-2 w-full rounded-md" />
                    {errors.availableSeats && <span className="text-red-500">Available Seats is required</span>}
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium mb-1">Price</label>
                    <input defaultValue={classesData?.price} {...register('price', { required: true })} type="number" id="price" className="input border-2 border-gray-300 p-2 w-full rounded-md" />
                    {errors.price && <span className="text-red-500">Price is required</span>}
                </div>

                <button type="submit" className="btn btn-primary w-full bg-slate-400 p-3 text-2xl font-semibold">Update Class</button>
            </form>
        </div>
  );
};

export default UpdateClasses;
