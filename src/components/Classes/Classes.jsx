import React, { useContext, useEffect, useState } from 'react';
// import image from '../../assets/black-female-photographer-making-photos-modern-architecture_273443-2000.avif'
import useGetData from '../../hooks/useGetData';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';



const Classes = () => {
    const { user } = useContext(AuthContext)
    // console.log(user?.email)

    const { data, isLoading, error } = useGetData('https://server-nine-theta-40.vercel.app/classes');
    const [dataUser, setDataUser] = useState({})
    useEffect(() => {
        fetch(`https://server-nine-theta-40.vercel.app/users/${user?.email}`)
            .then(res => res.json())
            .then(data => setDataUser(data))
    }, [user])

    const userType = dataUser.role
    // console.log(userType)
    const handleSelectClass = (classItem) => {
        // console.log(classItem)
        if (!user) {
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Log in before selecting the course',
                showConfirmButton: false,
                timer: 1500
            });
            return
        } else if (userType === 'Admin' || userType === 'Instructor') {
            alert('As an admin or instructor, you cannot select a course.');
            return
        }
        const selectedClass = { ...classItem, email: user?.email }
        fetch('https://server-nine-theta-40.vercel.app/postSelectedClasses', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,

                'Content-Type': 'application/json',

            },
            body: JSON.stringify(selectedClass),
        })
            .then((response) => response.json())
            .then((data) => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Course selected successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                // Handle the response from the server
                console.log('Selected classes posted:', data);
            })
            .catch((error) => {
                console.error('Error posting selected classes:', error);
            });

    };

    return (
        <div>
            <h1 className="text-2xl font-bold my-8">Classes</h1>
            <div className='grid grid-cols-3 gap-4'>
                {data?.map((classItem) => (
                    classItem.status == 'approved' && <div
                        key={classItem?._id}
                        className={`p-4 mb-4 ${classItem.availableSeats == 0 ? 'bg-red-200' : 'bg-white'}`}
                    >
                        <img src={classItem?.classImage} alt={classItem.name} className="mb-2" />
                        <h2 className="text-lg font-bold">{classItem?.className}</h2>
                        <p className="mb-2">Instructor: {classItem?.instructorName}</p>
                        <p className="mb-2">Available Seats: {classItem?.availableSeats}</p>
                        <p className="mb-2">Price: {classItem?.price}</p>
                        <button
                            disabled={classItem.seats === 0 || userType === 'Admin' || userType === 'Instructor'}
                            onClick={() => handleSelectClass(classItem)}
                            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                        >
                            Select
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Classes;
