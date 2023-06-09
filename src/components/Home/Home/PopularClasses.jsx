import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import image from "../../../assets/black-female-photographer-making-photos-modern-architecture_273443-2000.avif"

const PopularClasses = () => {

    const [popularClass, setPopularClasses] = useState()


    //fetch data
    useEffect(() => {
        fetch('http://localhost:5000/classes')
            .then(res => res.json())
            .then(data => setPopularClasses(data))
    }, [])

    console.log(popularClass)



    const popularClasses = [
        {
            id: 1,
            title: 'Portrait Photography',
            image: '../../../assets/black-female-photographer-making-photos-modern-architecture_273443-2000.avif',
            students: 120,
        },
        {
            id: 2,
            title: 'Landscape Photography',
            image: 'landscape-photography.jpg',
            students: 98,
        },
        {
            id: 3,
            title: 'Street Photography',
            image: 'street-photography.jpg',
            students: 85,
        },
        {
            id: 4,
            title: 'Product Photography',
            image: 'product-photography.jpg',
            students: 72,
        },
        {
            id: 5,
            title: 'Fashion Photography',
            image: 'fashion-photography.jpg',
            students: 68,
        },
        {
            id: 6,
            title: 'Wildlife Photography',
            image: 'wildlife-photography.jpg',
            students: 52,
        },
    ];

    // Sort classes based on the number of students (descending order)
    const sortedClasses = popularClasses.sort((a, b) => b?.students - a?.students);

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
                    {sortedClasses.slice(0, 6).map((cls) => (
                        <motion.div
                            key={cls.id}
                            className="class-card"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="class-card-image">
                                <img src={image} alt={cls.title} />
                            </div>
                            <div className="class-card-content">
                                <h3 className="text-xl font-bold">{cls.title}</h3>
                                <p className="text-gray-600">Students: {cls.students}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default PopularClasses;
