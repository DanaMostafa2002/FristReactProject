import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { ThreeDots } from "react-loader-spinner";

export default function Orders() {
  function getOrders() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/orders/");
  }

  const { data, isLoading } = useQuery("order", getOrders);
  console.log(data?.data.data)
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
      ) :  (
        <div className="container py-2">
          <h2> All Orders</h2>
          {data?.data.data.map((order) => (
            <div key={order._id} className="card mb-3">
              <div className="card-header">Order ID: {order._id}</div>
              <div className="card-body">
                <h5 className="card-title">Shipping Address</h5>
                <p className="card-text">
                  <strong>Details:</strong> {order.shippingAddress?.details}
                </p>
                <p className="card-text">
                  <strong>Phone:</strong> {order.shippingAddress?.phone}
                </p>
                <p className="card-text">
                  <strong>City:</strong> {order.shippingAddress?.city}
                </p>
                <h5 className="card-title">Payment Status</h5>
                <p className="card-text">
                  {order.isPaid ? (
                    <span className="text-success">Paid</span>
                  ) : (
                    <span className="text-danger">Not Paid</span>
                  )}
                </p>
                <h5 className="card-title">Delivery Status</h5>
                <p className="card-text">
                  {order.isDelivered ? (
                    <span className="text-success">Delivered</span>
                  ) : (
                    <span className="text-danger">Not Delivered</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
    