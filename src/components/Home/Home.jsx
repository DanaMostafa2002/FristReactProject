import React from "react";
import style from "./Home.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import MainSlider from "../Sliders/MainSlider";
import CategorySlider from "../Sliders/CategorySlider";
import { Helmet } from "react-helmet";
import Products from '../Products/Products';

export default function Home() {
  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isLoading } = useQuery("products", getProducts);
  console.log(data?.data.data);
  
  return (
    <>
      <Helmet>
        <meta name="description" content="" />
        <title> Fresh cart</title>
      </Helmet>
      <MainSlider></MainSlider>
      <CategorySlider></CategorySlider>
      <Products></Products>
    </>
  );
}