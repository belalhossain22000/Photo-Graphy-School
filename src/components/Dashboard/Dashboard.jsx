import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaHome, FaCalendarAlt,FaUserFriends,FaAd } from 'react-icons/fa';
import { GrUserManager } from 'react-icons/gr';
import { MdManageHistory } from 'react-icons/md';
import useGetData from '../../hooks/useGetData';
import { AuthContext } from '../../Provider/AuthProvider';


const Dashboard = () => {
    const {user}=useContext(AuthContext)
const {data}=useGetData(`http://localhost:5000/users/${user?.email}`)
const userType=data.role


    return (
        <div className="drawer drawer-mobile">
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* <!-- Page content here -->? */}
                <Outlet></Outlet>

            </div>
            <div className="drawer-side fixed top-0  ">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 space-y-4 bg-gray-200 h-[100vh] font-semibold bg-base-100 text-base-content">
                    {
                        userType=='Admin' ? <>
                            <li className='text-3xl font-semibold text-center'><Link className='flex gap-1 items-center'> <FaHome /> Admin Home</Link></li>
                            <li><Link to="/dashboard/manage-classes" className='flex items-center gap-1 text-2xl'><GrUserManager/>Manage Classes</Link></li>
                            <li><Link to="/dashboard/allusers" className='flex items-center gap-1 text-2xl'><MdManageHistory/>Manage Users  </Link></li>
                        </> : userType=="Instructor" ? <>
                            <li className='text-3xl font-semibold text-center'><Link className='flex gap-1 items-center'> <FaHome /> Instructors Home</Link></li>
                            <li><Link to="/dashboard/add-a-class" className='flex items-center gap-1 text-2xl'> <FaAd/>Add a Class</Link></li>
                            <li><Link to="/dashboard/my-classes" className='flex items-center gap-1 text-2xl'><FaCalendarAlt/>My Classes  </Link></li>
                        </> : <>
                            <li className='text-3xl font-semibold text-center '><Link className='flex gap-1 items-center'> <FaHome /> Student Home</Link></li>
                            <li><Link to="/dashboard/my-selected-classes" className='flex items-center gap-1 text-2xl'> <FaCalendarAlt/>My Selected Classes</Link></li>
                            <li><Link to="/dashboard/my-enrolled-classes" className='flex items-center gap-1 text-2xl'> <FaCalendarAlt/>My Enrolled Classes  </Link></li>
                        </>
                    }

                    <hr className="w-[80%] text-center" />
                    <li><Link to="/" className='flex items-center gap-1 text-2xl'><FaHome></FaHome> Home</Link></li>
                    <li><Link to="/instructors" className='flex items-center gap-1 text-2xl'><FaUserFriends/>Instructors</Link></li>
                    <li> <Link to="/classes" className='flex items-center gap-1 text-2xl'> <FaCalendarAlt/>Classes</Link></li>

                </ul>

            </div>
        </div>
    );
};

export default Dashboard;