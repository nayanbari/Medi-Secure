import React,{useState} from 'react'
import {BiSearch} from "react-icons/bi";

const Right_Nav = () => {
  const [selected,setSelected] = useState(0);

  const handleNav = () => {setSelected(!selected)}
  return (
    <nav className='flex border-b-2 m-8'>
    <ul className='p-4 flex w-full list-none'>
      <li onClick={handleNav} className={`mx-8 text-lg cursor-pointer ${!selected ? 'text-[#63c5da] font-bold border-b-2 border-[#63c5da]': 'text-black'} duration-300`}>My Health Form</li>
      <li onClick={handleNav} className={`mx-8 text-lg cursor-pointer ${selected ? 'text-[#63c5da] font-bold border-b-2 border-[#63c5da]': 'text-black'} duration-300`}>Submitted Form</li>
    </ul>
    <div className='flex items-center'>
    <div className='flex items-center'>
      <input placeholder='Search....' className='p-2 mr-4 border focus:outline-none'  />
      <BiSearch className='text-lg text-[#767676] cursor-pointer border-black rounded-lg' />
    </div>
    </div>
    </nav>
  )
}

export default Right_Nav