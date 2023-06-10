import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaMoon, FaUserFriends, FaCalendarAlt, FaChartBar, FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import { FiLogOut } from "react-icons/fi"
import { TbLogin } from "react-icons/tb"
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut, toggleTheme, theme } = useContext(AuthContext);

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogOut = () => {
    console.log("clicked");
    logOut()
      .then(() => {
        console.log("User logged out");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <nav className={`bg-gray-800 fixed top-0 z-10 w-full ${scrollPosition > 0 ? "bg-transparent bg-gray-100" : "text-gray-200"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between  h-16">
          <div className="flex items-center">
            <Link to="/" className="flex flex-shrink-0">
              <img className="h-10 w-10 rounded-full" src="https://i.ibb.co/VVmCnC7/schoolhouse11.jpg" alt="Website Logo" />
              <span className="font-semibold text-2xl ml-2">Photo School</span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8">
            <ul className="flex space-x-8">
              <li>
                <Link to="/" className="hover:text-gray-300 flex items-center justify-center gap-1">
                  <FaHome className="h-6 w-6" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/instructors" className="hover:text-gray-300 flex items-center justify-center gap-1">
                  <FaUserFriends className="h-6 w-6" />
                  <span>Instructors</span>
                </Link>
              </li>
              <li>
                <Link to="/classes" className="hover:text-gray-300 flex items-center justify-center gap-1">
                  <FaCalendarAlt className="h-6 w-6" />
                  <span>Classes</span>
                </Link>
              </li>
              {user && (
                <li>
                  <Link to="/dashboard" className="hover:text-gray-300 flex items-center justify-center gap-1">
                    <FaChartBar className="h-6 w-6" />
                    <span>Dashboard</span>
                  </Link>
                </li>
              )}
            </ul>
            <div className="flex relative items-center space-x-8">
              {user ? (
                <><img className="h-8 w-8 rounded-full" src={user?.photoURL} alt="User Profile Picture" />
                  <button onClick={handleLogOut} className="hover:text-gray-300 flex items-center justify-center gap-1">
                    <FiLogOut className="h-6 w-6" />
                    Logout
                  </button></>
              ) : (
                <Link to="/login" className="hover:text-gray-300 flex items-center justify-center ">
                  <TbLogin className="h-6 w-6" />
                  Login
                </Link>
              )}
              <button onClick={toggleTheme} className="hover:text-gray-300 flex items-center justify-center gap-1">
                <FaMoon className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={handleToggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none"
            >
              {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <ul className="flex flex-col space-y-2">
            <li>
              <Link to="/" className="hover:text-gray-300  px-3 py-2 flex items-center  gap-1 rounded-md text-base font-medium">
                <FaHome className="h-6 w-6" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/instructors" className="hover:text-gray-300 flex items-center  gap-1 px-3 py-2 rounded-md text-base font-medium">
                <FaUserFriends className="h-6 w-6" />
                <span>Instructors</span>
              </Link>
            </li>
            <li>
              <Link to="/classes" className="hover:text-gray-300 flex items-center  gap-1 px-3 py-2 rounded-md text-base font-medium">
                <FaCalendarAlt className="h-6 w-6" />
                <span>Classes</span>
              </Link>
            </li>
            {user && (
              <li>
                <Link to="/dashboard" className="hover:text-gray-300 flex items-center  gap-1 px-3 py-2 rounded-md text-base font-medium">
                  <FaChartBar className="h-6 w-6" />
                  <span>Dashboard</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          {user ? (
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img className="h-8 w-8 rounded-full" src="profile.png" alt="User Profile Picture" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">{user.displayName}</div>
                <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
              </div>
              <button
                onClick={handleLogOut}
                className="ml-auto flex-shrink-0 bg-gray-700 hover:bg-gray-600 border-gray-700 hover:border-gray-600 px-3 py-2 rounded-md text-sm font-medium text-white focus:outline-none"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="px-5 py-3">
              <Link to="/login" className="block text-white font-medium hover:text-gray-300">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
