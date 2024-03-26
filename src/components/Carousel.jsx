import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import AgrupacionCard from "./AgrupacionCard";



export default function Carousel() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
    
            <AgrupacionCard nombre="alejo" descripcion="no saluda"></AgrupacionCard>
        
    
            <AgrupacionCard nombre="bubin" descripcion="no saluda"></AgrupacionCard>
        
    
            <AgrupacionCard nombre="reaper" descripcion="no saluda"></AgrupacionCard>
        
    
            <AgrupacionCard nombre="uco" descripcion="no saluda"></AgrupacionCard>
        
    
            <AgrupacionCard nombre="doc" descripcion="no saluda"></AgrupacionCard>
        
    
            <AgrupacionCard nombre="test" descripcion="no saluda"></AgrupacionCard>

            

        
      </Slider>
    );
  }
