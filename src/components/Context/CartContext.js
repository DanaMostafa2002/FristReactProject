import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CartContext = createContext();

 export default function CartContextProvider(props) {
   const [cartId,setcartId]=useState(null);
async function getCart(){
let {data}= await getLoggedUserCart();
setcartId(data?.data._id);
console.log(data?.data._id);
 }
  
  useEffect(()=>{
getCart();


  },[]);
  const headers = {
    token: localStorage.getItem("userToken"),
  };

  async function addToCart(productId) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers: headers,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function removeCartItem(productId) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers: headers,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  function clearCart(){
    axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
    .then((response)=>response)
    .catch((error)=>error)

  }
  function updateProduct(productId,count){
   return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
     {count:count},{headers})
     .then((response)=>response)
     .catch((error)=>error);

  }
 
  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  function onlinePayment(cartId,url,values) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
          shippingAddress: values
        },
        { headers: headers }
      )
      .then((response) => response.data)
      .catch((error) => error);
  }
  
  function cashPayment(cartId, values) {
    return axios
      .post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
        shippingAddress: values
      }, { headers: headers })
      .then((response) => response)
      .catch((error) => error);
  }

  return (
    <CartContext.Provider
      value={{cartId, addToCart,onlinePayment, getLoggedUserCart, removeCartItem,updateProduct,clearCart ,cashPayment  }}
    >
      {props.children}
    </CartContext.Provider>
  );
}