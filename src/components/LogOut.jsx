import React from 'react'
import {BiPowerOff} from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
export default function LogOut() {
    const navigate = useNavigate();
    const handleClick = async()=>{
        localStorage.clear();
        navigate("/login");
    }
  return (
    <button className='logout-btn' onClick={handleClick}>
        <BiPowerOff />
    </button>
  )
}
