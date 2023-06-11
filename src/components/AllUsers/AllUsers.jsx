import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users',{headers:{
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }})
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const makeAdminRole = (id) => {
    axios
      .patch(`http://localhost:5000/users/${id}`, { role: 'Admin' })
      .then((response) => {
        console.log(response.data);
        alert('Admin role created successfully');

        // Update the user's role in the array
        const updatedUsers = users.map((user) =>
          user._id === id ? { ...user, role: 'Admin' } : user
        );

        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const makeInstructorRole = (id) => {
    axios
      .patch(`http://localhost:5000/users/${id}`, { role: 'Instructor' })
      .then((response) => {
        console.log(response.data);
        alert('Instructor role created successfully');

        // Update the user's role in the array
        const updatedUsers = users?.map((user) =>
          user._id === id ? { ...user, role: 'Instructor' } : user
        );

        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const role = 'Admin';

  return (
    <div className='ml-[18%]'>
      {role === 'Admin' && (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-300">
            {/* head */}
            <thead>
              <tr>
                <th className="border-b px-4 py-2">#</th>
                <th className="border-b px-4 py-2">Name</th>
                <th className="border-b px-4 py-2">Email</th>
                <th className="border-b px-4 py-2">Role</th>
                <th className="border-b px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users && users?.map((user, index) => (
                <tr key={user?._id}>
                  <td className="border-b px-4 py-2">{index + 1}</td>
                  <td className="border-b px-4 py-2">{user?.name}</td>
                  <td className="border-b px-4 py-2">{user?.email}</td>
                  <td className="border-b px-4 py-2">{user?.role}</td>
                  <td className="border-b px-4 py-2">
                    <button
                      disabled={user?.role === 'Admin'}
                      onClick={() => makeAdminRole(user._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded mr-2"
                    >
                      Make Admin
                    </button>
                    <button
                      disabled={user?.role === 'Instructor'}
                      onClick={() => makeInstructorRole(user._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                    >
                      Make Instructor
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
