import React from 'react';

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
    return (
        <div>
            <h1>Instructors</h1>
            {instructorsData.map((instructor) => (
                <div key={instructor.id}>
                    <img src={instructor.image} alt={instructor.name} />
                    <h2>{instructor.name}</h2>
                    <p>Email: {instructor.email}</p>
                </div>
            ))}
        </div>
    );
};

export default InstructorsPage;
