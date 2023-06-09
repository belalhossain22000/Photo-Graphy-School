import React, { useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const AllUsers = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => {
               
                setUsers(data)
            })
    }, [])
    console.log(users)

    //make admin role 

    const makeAdminRole = (id,) => {
        console.log(id)
        axios.patch(`http://localhost:5000/users/${id}`, { role: "Admin" })
            .then((response) => {
                console.log(response.data);
                alert('admin role created successfully')
                // Update the user's role in the array
                const updatedUsers = users.map((user) =>
                    user._id === id ? { ...user, role: "Admin" } : user
                );

                setUsers(updatedUsers);
            })
            .catch((error) => {
                console.error(error);
            });

    }
    const makeInstructorRole = (id,) => {
        console.log(id)
        axios.patch(`http://localhost:5000/users/${id}`, { role: "Instructor" })
            .then((response) => {
                console.log(response.data);
                alert('admin role created successfully')
                // Update the user's role in the array
                const updatedUsers = users.map((user) =>
                    user._id === id ? { ...user, role: "Instructor" } : user
                );

                setUsers(updatedUsers);
            })
            .catch((error) => {
                console.error(error);
            });

    }

    const role = "Admin"
    return (
        <div>
            {
                role === "Admin" && <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map(user => <tr key={user?._id}>
                                    <th>1</th>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td>{user?.role}</td>
                                    <td><button disabled={user?.role === "Admin"} onClick={() => makeAdminRole(user._id)} >Make Admin</button>/<button disabled={user?.role === "Instructor"} onClick={() => makeInstructorRole(user._id)}>Make Instructors</button></td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            }
        </div>

    );
};

export default AllUsers;