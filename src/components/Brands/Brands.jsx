import React from "react";
import style from "./Brands.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { ThreeDots } from "react-loader-spinner";

export default function Brands() {
  function getbrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let { data, isLoading } = useQuery("brands", getbrands);

  console.log(data?.data.data);

  return (
    <>
     {isLoading? <div className="w-100 py-5 d-flex justify-content-center">
          <ThreeDots
            height="100"
            width="100"
            radius="5"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div> : <div className="container py-2">
        <h1 className="text-main mb-5 text-center fw-bolder ">All Brands</h1>
        <div className="row g-3">
          {data?.data.data.map((brands) => (
            <div key={brands.id} className="col-md-3 ng-star-inserted product .btn ">
              <div className="card product:hover">
                <div >
                  <img
                    className="w-100 "
                    style={{ height: 150 }}
                    src={brands.image}  
                  />
                  <div className="card-body">
                    <p className="text-success text-center">
                      {brands.name}  
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      } 
    </>
  );
}
