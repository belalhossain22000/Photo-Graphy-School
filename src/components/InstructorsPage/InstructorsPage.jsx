import React from 'react';
import useGetData from '../../hooks/useGetData';
import { motion } from 'framer-motion';

const InstructorsPage = () => {
  const { data, isLoading, error } = useGetData('http://localhost:5000/instructor');

  return (
    <div className="my-20 p-4">
      <h1 className="text-center text-3xl font-bold p-8">Instructors</h1>
      <div className="grid grid-cols-3 gap-8">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading instructors</p>
        ) : (
          data.map((instructor) => (
            <motion.div
              key={instructor?._id}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={instructor?.image} alt={instructor.name} className="mb-2" />
              <h2 className="text-lg font-semibold mb-2">{instructor.name}</h2>
              <p className="text-gray-600">Email: {instructor?.email}</p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default InstructorsPage;
