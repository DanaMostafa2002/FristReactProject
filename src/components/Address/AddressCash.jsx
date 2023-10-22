import { useFormik } from "formik";
import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
 
 
export default function Address(){
    let {cashPayment,cartId}= useContext(CartContext)
    const handleAddressSubmit = async (values) => {
        let response = await cashPayment(cartId,values);
      console.log(response.data );
     
      };
 
    let formik=useFormik({
        initialValues:{
         details:'',
         phone:'',
         city:''
        },
        onSubmit: handleAddressSubmit
    })
    return <>
     <div className="container mt-5">

<form className='w-75 mx-auto' onSubmit={formik.handleSubmit}>
   
    <h2 className='text-center text-main'>Address</h2>
   
    <label htmlFor="details">Details :</label>
    <input type="text" name='details' id='details' className='form-control mb-3'value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
     
   
    <label htmlFor="phone">phone :</label>
    <input type="tel" name='phone' id='phone' className='form-control mb-3'value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
    
    <label htmlFor="city">city :</label>
    <input type="text" name='city' id='city' className='form-control mb-3'value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
     
    <button  type='submit'className="btn bg-main text-white">Pay Now</button>
    
</form>
</div>
    
    
    
    </>
}