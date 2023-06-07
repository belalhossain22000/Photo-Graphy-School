import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-800 py-6">
            <div className="container mx-auto px-4">
                <div className="md:flex justify-center gap-28">
                    <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
                        <div className="text-white text-xl font-semibold">
                            <img src="/logo.png" alt="Website Logo" className="h-8 w-8 inline-block mr-2" />
                            Photo School
                        </div>
                        <p className="text-gray-400 mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
                        <h3 className="text-white font-semibold mb-4">Contact</h3>
                        <ul className="text-gray-400">
                            <li className="flex items-center mb-2">
                                <FaPhone className="mr-2" />
                                +1 123 456 7890
                            </li>
                            <li className="flex items-center mb-2">
                                <FaEnvelope className="mr-2" />
                                info@example.com
                            </li>
                            <li className="flex items-start">
                                <FaMapMarkerAlt className="mr-2 mt-1" />
                                123 Street, City, Country
                            </li>
                        </ul>
                    </div>
                    {/* Add more sections as needed */}
                </div>
                <hr className="border-gray-700 my-6" />
                <div className="text-gray-400 text-sm text-center">
                    &copy; {new Date().getFullYear()} Photo School. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
