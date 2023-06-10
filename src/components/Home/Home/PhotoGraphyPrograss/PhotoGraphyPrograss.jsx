import React from 'react';
import { motion } from 'framer-motion';

const PhotoGraphyPrograss = () => {
  return (
    <div className="container mx-auto py-10">
      <h2 className="text-5xl text-center font-bold p-4 mb-8">---Your Skills After a Month---</h2>
      <div className="grid grid-cols-2 gap-6">
        <ProgressCard title="Fashion" initialPercentage={0} targetPercentage={75} />
        <ProgressCard title="Peoples" initialPercentage={0} targetPercentage={75} />
        <ProgressCard title="Nature" initialPercentage={0} targetPercentage={65} />
        <ProgressCard title="Object shooting" initialPercentage={0} targetPercentage={60} />
        <ProgressCard title="Illustrations" initialPercentage={0} targetPercentage={50} />
      </div>
    </div>
  );
};

const ProgressCard = ({ title, initialPercentage, targetPercentage }) => {
  const variants = {
    initial: {
      width: `${initialPercentage}%`,
    },
    animate: {
      width: `${targetPercentage}%`,
    },
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md"
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full" style={{ width: '100%' }}></motion.div>
      </div>
      <p className="text-gray-600 text-sm mt-4">{targetPercentage}% Progress</p>
    </motion.div>
  );
};

export default PhotoGraphyPrograss;
