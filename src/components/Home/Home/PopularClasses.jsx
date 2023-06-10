import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import image from "../../../assets/black-female-photographer-making-photos-modern-architecture_273443-2000.avif"

const PopularClasses = () => {

    const [popularClass, setPopularClasses] = useState([])
    const [isLoading, setIsLoading] = useState(true);


    //fetch data
    useEffect(() => {
        fetch('http://localhost:5000/classes')
            .then(res => res.json())
            .then(data => {
                setPopularClasses(data)
                setIsLoading(false);
            })
    }, [])

    // console.log('from popular classes',popularClass)
    const sortedClasses = popularClass.sort((a, b) => b?.students - a?.students);

    if (isLoading) {
        return <div>Loading...</div>; // Display a loading message or spinner
    }

    console.log('sorted classes from server data', sortedClasses)

   
    
    return (
        <section className="popular-classes py-12">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center ">Popular Classes</h2>
                <motion.div
                    className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {sortedClasses?.slice(0, 6).map((cls) => (
                        <motion.div
                            key={cls?._id}
                            className="class-card"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="class-card-image">
                                <img src={image} alt={cls?.className} />
                            </div>
                            <div className="class-card-content">
                                <h3 className="text-xl font-bold">{cls?.className}</h3>
                                <p className="text-gray-600">Students: {cls?.students}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default PopularClasses;
