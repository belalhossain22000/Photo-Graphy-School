import React from 'react';

const classesData = [
    {
        id: 1,
        name: 'Photography Basics',
        instructor: 'John Doe',
        seats: 10,
        price: 99,
        image: 'https://example.com/photography-basics.jpg',
        approved: true,
    },
    {
        id: 2,
        name: 'Advanced Lighting Techniques',
        instructor: 'Jane Smith',
        seats: 0,
        price: 149,
        image: 'https://example.com/advanced-lighting.jpg',
        approved: true,
    },
    // Add more classes here...
];

const Classes = ({ isLoggedIn, userType }) => {
    const handleSelectClass = (classId) => {
        if (!isLoggedIn) {
            alert('Please log in before selecting the course.');
        } else if (userType === 'admin' || userType === 'instructor') {
            alert('As an admin or instructor, you cannot select a course.');
        } else {
            // Handle selecting the class here
            // ...
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Classes</h1>
            {classesData.map((classItem) => (
                <div
                    key={classItem.id}
                    className={`p-4 mb-4 ${classItem.seats === 0 ? 'bg-red-200' : 'bg-white'}`}
                >
                    <img src={classItem.image} alt={classItem.name} className="mb-2" />
                    <h2 className="text-lg font-bold">{classItem.name}</h2>
                    <p className="mb-2">Instructor: {classItem.instructor}</p>
                    <p className="mb-2">Available Seats: {classItem.seats}</p>
                    <p className="mb-2">Price: {classItem.price}</p>
                    <button
                        disabled={classItem.seats === 0 || userType === 'admin' || userType === 'instructor'}
                        onClick={() => handleSelectClass(classItem.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Select
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Classes;
