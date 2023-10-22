import React, { useContext, useEffect } from 'react'
import style from './Layout.module.css';
import Navbar from '../Navbar/Navbar'
import{Outlet} from'react-router-dom'
import { UserContext } from "../Context/UserContext";
import { Offline, Online } from "react-detect-offline";
export default function Layout() {
  let {setuserToken}=useContext(UserContext)
  useEffect(()=>{
   if(localStorage.getItem('userToken')!==null){
     setuserToken(localStorage.getItem('userToken'))
   }

  },[]);
  return (
    <> 
   <Navbar/>
   <div className="container">
   <Outlet/>
   </div>
    
    <Offline>
 
    <div className='network'>
      <i className='fas fa-wifi'></i>
      you are  offline (surprise!)
      </div>
      </Offline>
  
 

    
    </>
  )
}
