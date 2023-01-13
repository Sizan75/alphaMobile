import React from 'react';
import Contact from '../Contact/Contact';
import MobileCategory from '../MobileCategory/MobileCategory';
import Slider from '../Slider/Slider';
import AdvertizedProduct from './AdvertizedProduct/AdvertizedProduct';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <MobileCategory></MobileCategory>
            <AdvertizedProduct></AdvertizedProduct>
            <Contact></Contact>
        </div>
    );
};

export default Home;