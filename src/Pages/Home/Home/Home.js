import React from 'react';
import Contact from '../Contact/Contact';
import Gallery from '../Gallery/Gallery';
import MobileCategory from '../MobileCategory/MobileCategory';
import Slider from '../Slider/Slider';
import AdvertizedProduct from './AdvertizedProduct/AdvertizedProduct';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <MobileCategory></MobileCategory>
            <AdvertizedProduct></AdvertizedProduct>
            <Gallery></Gallery>
            <Contact></Contact>
        </div>
    );
};

export default Home;