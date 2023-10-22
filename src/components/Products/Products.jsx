import React, { useContext, useState } from "react";
import style from "./Products.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
 
import toast from "react-hot-toast";
 
export default function Products() {
  const { addToCart } = useContext(CartContext);
  
  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response.status === "success") {
      toast.success("Product successfully added");
    } else {
      toast.error("Error");
    }
    console.log(response);
  }

  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { isError, isFetched, data, isLoading } = useQuery(
    "products",
    getProducts
  );
  console.log(data?.data.data);

  return (
    <>
      {isLoading ? (
        <div className="w-100 py-5 d-flex justify-content-center">
          <ThreeDots
            height="100"
            width="100"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <div className="container py-2">
          <div className="row">
            {data?.data.data.map((product) => (
              <div key={product.id} className="col-md-2 ">
                <Link to={`/productdetails/${product.id}`}>
                  <div className="product cursor-pointer py-3 px-2 product:hover">
                    <img
                      className="w-100"
                      src={product.imageCover}
                      alt={product.title}
                    />

                    <span className="text-main font-sm fw-bolder">
                      {product.category.name}
                    </span>
                    <h3 className="h6">
                      {product.title.split(" ").slice(0, 2).join("")}
                    </h3>

                    <div className="d-flex justify-content-between mt-3">
                      <span>{product.price}EGP</span>
                      <span>
                        <i className="fas fa-star rating-color"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => addProduct(product.id)}
                  className="btn bg-main text-white w-100btn-sm mt-2"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}