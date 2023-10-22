import React from 'react'
import style from './NotFound.module.css';
import error from '../../images/error.svg'
export default function  NotFound() {
  return (
    <> 
     <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
  <img src={error} className="w-50" />
</div>

    
    </>
  )
}
