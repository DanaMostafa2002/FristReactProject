import React from "react";
import style from "./Categories.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { ThreeDots } from "react-loader-spinner";

export default function Categories() {
  function getcategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { data, isLoading } = useQuery("categories", getcategories);

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
           </div> :  <div className="container py-2">
        <div className="row g-4">
          {data?.data.data.map((categories) => (
            <div key={categories.id} className="col-md-4 ng-star-inserted">
              <div className="card">
                <div >
                  <img
                    className="w-100 "
                    style={{ height: 300 }}
                    src={categories.image}  
                  />
                  <div className="card-body">
                    <p className="text-success    text-center">
                      {categories.name}  
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
