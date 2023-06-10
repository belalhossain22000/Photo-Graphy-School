import React, { useState } from 'react';
import TopSlider from './TopSlider';
import PopularClasses from './PopularClasses';
import PopularInstructors from './PopularInstructors';
import ExtraSection from './ExtraSection';
import { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import PhotoGraphyPrograss from './PhotoGraphyPrograss/PhotoGraphyPrograss';


const Home = () => {
    const { theme } = useContext(AuthContext)

    return (
        <div className={`${theme === 'light' ? 'bg-white' : 'bg-black'} text-${theme === 'light' ? 'black' : 'white'}`}>

            <TopSlider></TopSlider>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
           <PhotoGraphyPrograss></PhotoGraphyPrograss>
        </div>
    );
};

export default Home;