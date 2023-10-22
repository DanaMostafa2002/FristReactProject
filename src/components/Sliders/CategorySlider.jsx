import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import Categories from '../Categories/Categories';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };

  function getCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  const { isLoading, data } = useQuery('CategorySlider', getCategories);
  console.log(data?.data.data);

  return (
    <div className="container py-4">
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {data?.data.data && (
            <Slider {...settings}>
              {data.data.data.map((category) => (
                <img key={category._id} height={200} className="w-100" src={category.image} alt={category.name} />
              ))}
            </Slider>
          )}
        </>
      )}
    </div>
  );
}