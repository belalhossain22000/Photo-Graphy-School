import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../../Provider/AuthProvider';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const PopularInstructors = () => {
  const { user } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(true);
  const [instructor, setInstructor] = useState([]);


  //use tanstack query to fetch
  const { refetch, data: PoInstructor = [] } = useQuery({
    enabled: !isLoading,
    queryKey: ['classes'],
    queryFn: async () => {
      const res = await axios.get(`https://server-nine-theta-40.vercel.app/classes`)
      // setIsLoading(false)
      return res.data;
    },
  });

  // Sort instructors based on the number of students (descending order)
  const sortedInstructors = PoInstructor.sort((a, b) => b.students - a.students);
// console.log(sortedInstructors) 
  useEffect(() => {
    setInstructor(sortedInstructors);
    setIsLoading(false)
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="popular-instructors py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-center">OUR</h2>
        <h2 className="text-3xl font-bold mb-6 text-center">Popular Instructors</h2>
        <div className="grid  gap-4 md:grid-cols-3 lg:grid-cols-3">
          {sortedInstructors?.slice(0, 6)?.map((instructor) => (
            <motion.div
              key={instructor?._id}
              className="instructor-card"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="instructor-card-image">
                <img src={instructor?.instructorImage} alt={instructor?.instructorName} />
              </div>
              <div className="instructor-card-content">
                <motion.h3 className="text-xl font-bold" initial={{ x: -100 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
                  {instructor?.instructorName}
                </motion.h3>
                <motion.p
                  className="text-gray-600"
                  initial={{ x: -100 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Students: {instructor?.students}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularInstructors;
