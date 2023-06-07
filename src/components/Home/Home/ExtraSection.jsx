import React from 'react';
import { motion } from 'framer-motion';
import image from "../../../assets/black-female-photographer-making-photos-modern-architecture_273443-2000.avif"


const ExtraSection = () => {
  return (
    <section className="extra-section py-12">
      <div className="container mx-auto">
        <motion.div
          className="extra-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="extra-image">
            <motion.img
              src={image}
              alt="Extra Section"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="extra-text">
            <motion.h2
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover Your Passion for Photography
            </motion.h2>
            <motion.p
              className="text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Unleash your creativity and capture stunning moments with our photography courses. Whether you're a beginner or an
              experienced photographer, we have classes tailored to your skill level.
            </motion.p>
            <motion.button
              className="btn btn-primary mt-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Explore Courses
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExtraSection;
