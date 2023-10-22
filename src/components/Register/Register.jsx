import React, { useState } from 'react'
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from  'react-loader-spinner'

export default function Register() {
    let navigate =useNavigate();
    let [error,seterror]=useState(null);
    let [loading,setloading]=useState(false);
    async function submitRegister(values){
        setloading(true);
        let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).catch(
            err=>{
                setloading(false)
                seterror(err.response.data.message);
            }
        )
        if(data.message=='success'){
            setloading(false)
            navigate('/Login')
        }
    }
    let validatSchema=Yup.object({
        name:Yup.string().min(3,"name minlength is three ").max(10,'name maxlength is ten').required("Name is required"),
        email:Yup.string().email("email is invailed").required('email is required'),
        phone: Yup.string()
    .matches(/^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/, 'Phone number is not valid')
    .required('Phone number is required'),
    password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
    rePassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
    })
    let formik=useFormik({
        initialValues:{
            name:"",email:"",password:"",rePassword:"",phone:""},validationSchema:validatSchema,
            onSubmit:submitRegister,
            validateOnChange: true,
            validateOnBlur: true,
        })
    return (
    <>
    <div className="container mt-5">

        <form className='w-75 mx-auto' onSubmit={formik.handleSubmit} >
            {error?<div className='alert alert-danger p-2 mt-2 text-center'>{error}</div>:null}
            <h2 className='text-center'>Register Now</h2>
            <label htmlFor="name" >name:</label>
            <input type="text" name='name' id='name' className='form-control mb-3' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            {formik.errors.name&&formik.touched.name?<div className='alert alert-danger p-2 mt-2'>{formik.errors.name}</div>:null}
            <label htmlFor="email">email:</label>
            <input type="email" name='email' id='email' className='form-control mb-3'value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            {formik.errors.email&&formik.touched.email?<div className='alert alert-danger p-2 mt-2'>{formik.errors.email}</div>:null}
            <label htmlFor="password">password:</label>
            <input type="password" name='password' id='password' className='form-control mb-3'value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            {formik.errors.password&&formik.touched.password?<div className='alert alert-danger p-2 mt-2'>{formik.errors.password}</div>:null}
            <label htmlFor="rePassword">rePassword:</label>
            <input type="password" name='rePassword' id='rePassword' className='form-control mb-3'value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            {formik.errors.rePassword&&formik.touched.rePassword?<div className='alert alert-danger p-2 mt-2'>{formik.errors.rePassword}</div>:null}
            <label htmlFor="phone">phone:</label>
            <input type="tel" name='phone' id='phone' className='form-control mb-3'value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            {formik.errors.phone&&formik.touched.phone?<div className='alert alert-danger p-2 mt-2'>{formik.errors.phone}</div>:null}
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
            </button>:<button disabled ={!(formik.isValid&&formik.dirty)} type="submit" className='btn float-end bg-main text-white'>Register</button>}
        </form>
    </div>
    </>
    )
}
 
 