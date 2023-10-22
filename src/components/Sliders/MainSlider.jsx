import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slider1 from '../../images/slider-image-1.jpeg';
import slider2 from '../../images/slider-image-2.jpeg';
import slider3 from '../../images/slider-image-3.jpeg';
import blog1 from '../../images/blog-img-1.jpeg';
import blog2 from '../../images/blog-img-2.jpeg';
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };

  return (
    <>
      <div className="row gx-0">
        <div className="col-md-7">
          <Slider {...settings}>
            <img  height={400}className="w-100" src={slider1} alt="Slider 1" />
            <img height={400} className="w-100" src={slider2} alt="Slider 2" />
            <img height={400} className="w-100" src={slider3} alt="Slider 3" />
          </Slider>
        </div>
        <div className="col-md-4">
            <img height={200}className="w-100" src={blog1} alt="blog 1" />
            <img height={200} className="w-100" src={blog2} alt="blog 2" />
        </div>
      </div>
      
    </>
  );
}