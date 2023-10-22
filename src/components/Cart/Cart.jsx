import React, { useContext, useEffect, useState } from 'react';
import style from './Cart.module.css';
import { CartContext } from '../Context/CartContext';
import { ThreeDots } from "react-loader-spinner";
import { Link } from 'react-router-dom';

export default function Cart() {
  const { getLoggedUserCart, removeCartItem ,updateProduct ,clearCart} = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  const [cartDetails, setCartDetails] = useState(null);
  const [error, setError] = useState(null);

  async function removeItem(id) {
    console.log("Removing item with ID:", id);
    try {
      await removeCartItem(id);
      const response = await getLoggedUserCart();
      setCartDetails(response.data);
    } catch (error) {
      setError(error);
    }
  }
  async function clear(){
     
    setCartDetails(null)
    await clearCart();
  }

async function updateproductQuantity(id,count)
{
 let {data}=await  updateProduct(id,count);
 setCartDetails(data);
}
  async function getCart() {
    try {
      const response = await getLoggedUserCart();
      setCartDetails(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className='w-100 py-5 d-flex justify-content-center'>
          <ThreeDots
            height={100}
            width={100}
            color="green"
            ariaLabel="three-dots-loading"
          />
        </div>
      ) : (
        <>
          {cartDetails ? (
            <div className="w-75 mx-auto mt-4 p-2 bg-main-light">
              <h3 className='text-main'>Shopping Cart</h3>
              <h4 className="h6 fw-bolder text-main">Cart Items: {cartDetails.numOfCartItems}</h4>
              <h4 className="h6 fw-bolder text-main mb-4">Total Cart Price: {cartDetails.data.totalCartPrice}</h4>
              {cartDetails.data.products.map((product) => (
                <div key={product.product.id} className='row py-2 border-bottom'>
                  <div className="col-md-1">
                    <img className='w-100' src={product.product.imageCover} alt="" />
                  </div>
                  <div className="col-md-11">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h3 className='h6'>
                          {product.product.title}
                        </h3>
                        <h6 className='text-main'>Price: {product.price} EGP</h6>
                      </div>
                      <div>
                        <button onClick={()=>updateproductQuantity(product.product.id,product.count+1)} className='btn bg-main text-white p-1'>+</button>
                        <span className='mx-2'>{product.count}</span>
                        <button  onClick={()=>updateproductQuantity(product.product.id,product.count-1)} className='btn bg-main text-white p-1'>-</button>
                      </div>
                    </div>
                    <button onClick={() => removeItem(product.product.id)} className='btn p-0'>
                      <i className='fas fa-trash-can font-sm text-danger mx-1 '></i>
                      Remove
                    </button>
                   
                  </div>
                  </div>))}
              <Link to={'/address'}  className='btn bg-main text-white mt-3 m-2'>  Online payment </Link>
              <Link to={'/addresscash'}  className='btn bg-main text-white mt-3 m-2'> Cash payment</Link>
                <div>
                <button onClick={clear} className={`${style.clearButton} btn text-white bg-main m-3`}>
                  Clear
                </button>
              </div>
            
            </div>
          ) : (
            <div className='text-center mt-4 '>No cart items found.</div>
          )}
          {error && <div>Error: {error.message}</div>}
        </>
      )}
    </>
  );
}