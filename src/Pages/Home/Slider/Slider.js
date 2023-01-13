import React from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import slider1 from '../../../assets/Banner/iphones.jpg'
import slider2 from '../../../assets/Banner/xiaomi-redmi-7-1.jpg'
import slider3 from '../../../assets/Banner/samsung1.jfif'
const Slider = () => {
    
    return (
        <div className="carousel w-3/4 h-1/2 mx-auto">
        <div id="slide1" className="carousel-item relative w-full">
          <img src={slider1} alt=' ' className="w-full h-3/4" />
          <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-1/4  ">
    
     </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="text-green-600 "><FaArrowLeft></FaArrowLeft></a> 
            <a href="#slide2" className="text-green-600 "><FaArrowRight></FaArrowRight></a>
          </div>
        </div> 
        <div id="slide2" className="carousel-item relative w-full">
          <img src={slider2} alt='' className="w-full h-3/4" />
          <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-1/4  ">
    
     </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="text-green-600 "><FaArrowLeft ></FaArrowLeft></a> 
            <a href="#slide3" className="text-green-600 "><FaArrowRight></FaArrowRight></a>
          </div>
        </div> 
        <div id="slide3" className="carousel-item relative w-full">
          <img src={slider3} alt='' className="w-full h-3/4" />
          <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-1/4  ">
   
     </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="text-green-600"><FaArrowLeft></FaArrowLeft></a> 
            <a href="#slide1" className="text-green-600"><FaArrowRight></FaArrowRight></a>
          </div>
        </div> 
        
      </div>
    );
};

export default Slider;