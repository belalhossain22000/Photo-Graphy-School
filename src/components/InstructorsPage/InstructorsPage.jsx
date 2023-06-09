import React from 'react';
import image from '../../assets/black-female-photographer-making-photos-modern-architecture_273443-2000.avif'
import useGetData from '../../hooks/useGetData';

// Sample data for instructors
const instructorsData = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        image: 'https://example.com/john.jpg',
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        image: 'https://example.com/jane.jpg',
    },
    // Add more instructors here...
];


const InstructorsPage = () => {
    const {data, isLoading, error}=useGetData('http://localhost:5000/instructor')
    // console.log(data)
    return (
        <div className='my-20 p-4'>
            <h1 className='text-center text-3xl font-bold p-8'>Instructors</h1>
            <div className='grid grid-cols-3 gap-8'>
            {data?.map((instructor) => (
                <div key={instructor?._id}>
                    <img src={instructor?.image} alt={instructor.name} />
                    <h2>{instructor.name}</h2>
                    <p>Email: {instructor?.email}</p>
                </div>
            ))}
            </div>
        </div>
    );
};

export default InstructorsPage;
