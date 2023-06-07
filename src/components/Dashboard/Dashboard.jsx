import React from 'react';

const Dashboard = () => {
    const userType='instructor';
    return (
        <div>
            {userType === 'user' && (
                <div>
                    <h1>User Dashboard</h1>
                    {/* User-specific dashboard content */}
                </div>
            )}
            {userType === 'instructor' && (
                <div>
                    <h1>Instructor Dashboard</h1>
                    {/* Instructor-specific dashboard content */}
                </div>
            )}
            {userType === 'admin' && (
                <div>
                    <h1>Admin Dashboard</h1>
                    {/* Admin-specific dashboard content */}
                </div>
            )}
        </div>
    );
};

export default Dashboard;