import React from 'react';
import TopSlider from './TopSlider';
import PopularClasses from './PopularClasses';
import PopularInstructors from './PopularInstructors';
import ExtraSection from './ExtraSection';


const Home = () => {
    return (
        <div>
            <TopSlider></TopSlider>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
            <ExtraSection></ExtraSection>
        </div>
    );
};

export default Home;