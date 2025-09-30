import React from 'react'
import { MdOutlineDarkMode } from "react-icons/md";
import { ThemeContext } from '../../contexts/ThemeContext';
import { useContext ,useEffect} from 'react';

const Navbar = () => {
  const {dark,setDark} = useContext(ThemeContext);
  
  return (
    <nav className='flex justify-between text-white bg-black py-3 items-center' style={{background:dark? "white":"black",color:dark?"black":"white"}}>
      <div className="logo hover:text-yellow-400 cursor-pointer transition-all">
        <span className='font-bold text-xl mx-8'>Todo</span>
      </div>
      <ul className="flex gap-4 mx-9">
        <li className='cursor-pointer hover:text-yellow-400 p-2 transition-colors'>Home</li>
        <li className='cursor-pointer hover:text-yellow-400 p-2 transition-colors'>Your tasks</li>
        <li className='cursor-pointer hover:text-yellow-400 p-2 transition-colors'><button onClick={()=>setDark(!dark)}><MdOutlineDarkMode /></button></li>
      </ul>
    </nav>
  )
}

export default Navbar
