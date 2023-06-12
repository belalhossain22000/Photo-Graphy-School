import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const InstructorPrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (user && !dataLoaded) {
      fetchUserData();
    }
  }, [user, dataLoaded]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://server-nine-theta-40.vercel.app/users/${user?.email}`);
      const data = await response.json();
      setUserData(data);
      setDataLoaded(true);
    } catch (error) {
      console.error(error);
      setDataLoaded(true);
    }
  };

  if (loading || !dataLoaded) {
    return <progress className="progress w-56">loading...</progress>;
  }

  console.log(userData);

  if (userData?.role === 'Instructor') {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default InstructorPrivateRoute;
