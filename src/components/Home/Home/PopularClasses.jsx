import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';


const PopularClasses = () => {

    // const [popularClass, setPopularClasses] = useState([])
    const [isLoading, setIsLoading] = useState(true);


    //fetch data
    // useEffect(() => {
    //     fetch('https://server-nine-theta-40.vercel.app/classes', {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem('access_token')}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             setPopularClasses(data)
    //             setIsLoading(false);
    //         })
    // }, [])
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,

    };


    //fetch data using tanstack query
    const { refetch, data: PoClass = [] } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axios.get(`https://server-nine-theta-40.vercel.app/classes`)
            setIsLoading(false)
            return res.data;
        },
    })
    console.log('res from axios', PoClass)

    const sortedClasses = PoClass.sort((a, b) => b?.students - a?.students);

    // if (isLoading) {
    //     return <div>Loading...</div>; // Display a loading message or spinner
    // }




    return (
        <section className="popular-classes ">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold mb-2 text-center ">OUR</h1>
                <h2 className="text-3xl font-bold mb-6 text-center ">Popular Classes</h2>
                <motion.div
                    className="grid mgrid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-3"
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
                                <img src={cls?.classImage} alt={cls?.className} />
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
