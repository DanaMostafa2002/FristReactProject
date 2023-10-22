import React, { useState,useContext } from 'react'
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import { ThreeDots } from  'react-loader-spinner'
import { UserContext } from "../Context/UserContext";
export default function Login() {
    const navigate =useNavigate();
    const { userToken, setUserToken  ,setuserData} = useContext(UserContext);

    let [error,seterror]=useState(null);
    let [loading,setloading]=useState(false);


    async function submitLogin(values){
        setloading(true);
        let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).catch(
            err=>{
                setloading(false)
                seterror(err.response.data.message);
            }
        )
        if(data.message=='success'){
            setloading(false)
            localStorage.setItem("userToken", data.token)
            setUserToken(data.token)
            setuserData(data.user)
            navigate("/")
        }
    }
    let validatSchema=Yup.object({
        email:Yup.string().email("email is invailed").required('email is required'),
    password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
    })
    let formik=useFormik({
        initialValues:{
            email:"",password:""},validationSchema:validatSchema,
            onSubmit:submitLogin,
            validateOnChange: true,
            validateOnBlur: true,
        })
    return (
    <>
    <div className="container mt-5">

        <form className='w-75 mx-auto' onSubmit={formik.handleSubmit} >
            {error?<div className='alert alert-danger p-2 mt-2 text-center'>{error}</div>:null}
            <h2 className='text-center'>Login Now</h2>
           
            <label htmlFor="email">email:</label>
            <input type="email" name='email' id='email' className='form-control mb-3'value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            {formik.errors.email&&formik.touched.email?<div className='alert alert-danger p-2 mt-2'>{formik.errors.email}</div>:null}
            <label htmlFor="password">password:</label>
            <input type="password" name='password' id='password' className='form-control mb-3'value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            {formik.errors.password&&formik.touched.password?<div className='alert alert-danger p-2 mt-2'>{formik.errors.password}</div>:null}
            {loading?<button  type="button" className='btn float-end bg-main text-white'>
            <ThreeDots
            height="30"
            width="30"
            radius="5"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
            </button>:<button disabled ={!(formik.isValid&&formik.dirty)} type="submit" className='btn float-end bg-main text-white'>Login</button>}
        </form>
    </div>
    </>
    )
}
 