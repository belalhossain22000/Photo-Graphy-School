import React from 'react';
import { motion } from 'framer-motion';
import image from '../../../assets/black-female-photographer-making-photos-modern-architecture_273443-2000.avif'

const PopularInstructors = () => {
  // Dummy data for popular instructors
  const popularInstructors = [
    {
      id: 1,
      name: 'John Doe',
      image: '../../../assets/black-female-photographer-making-photos-modern-architecture_273443-2000.avif',
      students: 75,
    },
    // ... rest of the instructor objects
  ];

  // Sort instructors based on the number of students (descending order)
  const sortedInstructors = popularInstructors.sort((a, b) => b.students - a.students);

  // Function to get a placeholder image if the instructor image is not available
  const getPlaceholderImage = () => {
    // Return the URL or path of a placeholder image
    return 'placeholder-image.jpg';
  };

  return (
    <section className="popular-instructors py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6">Popular Instructors</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
          {sortedInstructors.slice(0, 6).map((instructor) => (
            <motion.div
              key={instructor.id}
              className="instructor-card"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="instructor-card-image">
                <img src={image} alt={instructor.name} onError={getPlaceholderImage} />
              </div>
              <div className="instructor-card-content">
                <motion.h3 className="text-xl font-bold" initial={{ x: -100 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
                  {instructor.name}
                </motion.h3>
                <motion.p
                  className="text-gray-600"
                  initial={{ x: -100 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Students: {instructor.students}
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
