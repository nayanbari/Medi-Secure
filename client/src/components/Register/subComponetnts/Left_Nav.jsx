import React, { useState } from "react";
import { MdHealthAndSafety } from "react-icons/md";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import {
  AiFillHome,
  AiFillIdcard,
  AiFillSetting,
  AiOutlineMenu,
  AiOutlineSearch,
} from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { IoDocument, IoLogInSharp, IoSearchSharp } from "react-icons/io5";
import { BsChatSquareFill } from "react-icons/bs";
import { GiHealthNormal } from "react-icons/gi";
import userAvatar from "../../../Test/images/useravatar.jpg";
import { DoctorProfile } from "../../../api/api";
import { ImCross } from "react-icons/im";

const Left_Nav = ({ profile, setStep }) => {
  const [isShow, setIsShow] = useState(false);
  const RenderHeader = () => {
    return (
      <h1 className="flex items-center justify-between text-2xl p-4 font-bold uppercase border-b-2 border-white">
        <div className="flex items-center">
          <MdHealthAndSafety className="mr-4" />
          E-Health
        </div>
        <ImCross className="text-blue-400" onClick={() => setIsShow(!isShow)} />
      </h1>
    );
  };

  const RenderProfile = () => {
    return (
      <div className="md:my-8 mx-4 flex items-center flex-col">
        {profile ? (
          <>
            <img
              alt=""
              src={profile.profile}
              className="w-36 h-36  rounded-full border border-white p-2"
            />
            <span className="my-4 text-lg uppercase">
              {profile.firstname + " " + profile.lastname}
            </span>
          </>
        ) : (
          <button className="py-4 px-8 bg-[#63c5da] rounded-lg text-white flex items-center text-xl hover:bg-[#2832c2] scale-105 duration-300">
            <FiLogIn className="mr-4" /> Login Here
          </button>
        )}
      </div>
    );
  };

  const RenderLinks = () => {
    return (
      <ul className="list-none text-lg m-8  items-start justify-center flex-col cursor-pointer hidden md:flex">
        <li className="my-4 flex items-center hover:text-[#63c5da] hover:scale-105 duration-300">
          <AiFillIdcard className="mr-2" />
          <a onClick={() => setStep(12)} className="">
            Health Card
          </a>
        </li>
        <li className="my-4 flex items-center hover:text-[#63c5da] hover:scale-105 duration-300">
          <AiFillHome className="mr-2" />
          <a onClick={() => setStep(1)} className="">
            Home
          </a>
        </li>
        <li className="my-4 flex items-center hover:text-[#63c5da] hover:scale-105 duration-300">
          <FaUser className="mr-2" />
          <a onClick={() => setStep(2)}>Health Form</a>
        </li>
        <li className="my-4 flex items-center hover:text-[#63c5da] hover:scale-105 duration-300">
          <GiHealthNormal className="mr-2" />
          <a onClick={() => setStep(3)}>Doctor</a>
        </li>
        {DoctorProfile && (
          <li className="my-4 flex items-center hover:text-[#63c5da] hover:scale-105 duration-300">
            <IoSearchSharp className="mr-2" />
            <a onClick={() => setStep(10)}>Search Patient</a>
          </li>
        )}
        <li className="my-4 flex items-center hover:text-[#63c5da] hover:scale-105 duration-300">
          <IoDocument className="mr-2" />
          <a onClick={() => setStep(3)}>Appointment</a>
        </li>
        <li className="my-4 flex items-center hover:text-[#63c5da] hover:scale-105 duration-300">
          <BsChatSquareFill className="mr-2" />
          <a onClick={() => setStep(4)}>Chats</a>
        </li>

        <li className="my-4 flex items-center hover:text-[#63c5da] hover:scale-105 duration-300">
          <AiFillSetting className="mr-2" />
          <a onClick={() => setStep(5)}>Settings</a>
        </li>
        <li className="my-4 flex items-center hover:text-[#63c5da] hover:scale-105 duration-300">
          <FiLogOut className="mr-2" />
          <a onClick={() => setStep(6)}>Logout</a>
        </li>
      </ul>
    );
  };

  return isShow ? (
    <nav className="md:w-1/3 hidden md:block  bg-[#0a1172] p-4 text-white rounded-l-lg">
      {RenderHeader()}
      <div className="flex md:flex-col my-16 flex-row">
        {/* {RenderProfile()} */}
        {RenderLinks()}
      </div>
    </nav>
  ) : (
    <nav className="hidden bg-[#0a1172] text-white rounded-l-lg p-4 md:flex flex-col items-center">
      <div>
        <AiOutlineMenu
          className="mx-4 text-3xl my-2 hover:scale-105 hover:text-blue-400 duration-200 "
          onClick={() => setIsShow(!isShow)}
        />
      </div>
      <div className="my-8 p-4">
      <AiFillIdcard className="text-2xl my-8 hover:scale-105 duration-200 hover:text-blue-400 cursor-pointer" onClick={() => setStep(12)} />
      <AiFillHome className="text-2xl my-8 hover:scale-105 duration-200 hover:text-blue-400 cursor-pointer" onClick={() => setStep(1)} />
      <IoLogInSharp className="text-2xl my-8 hover:scale-105 duration-200 hover:text-blue-400 cursor-pointer" onClick={() => setStep(13)}  />
      <FaUser className="text-2xl my-8 hover:scale-105 duration-200 hover:text-blue-400 cursor-pointer" onClick={() => setStep(2)}/>
      <GiHealthNormal className="text-2xl my-8 hover:scale-105 duration-200 hover:text-blue-400 cursor-pointer" onClick={() => setStep(3)}/>
      <IoSearchSharp className="text-2xl my-8 hover:scale-105 duration-200 hover:text-blue-400 cursor-pointer" onClick={() => setStep(10)}/>
      <IoDocument className="text-2xl my-8 hover:scale-105 duration-200 hover:text-blue-400 cursor-pointer" onClick={() => setStep(4)}/>
      <BsChatSquareFill className="text-2xl my-8 hover:scale-105 duration-200 hover:text-blue-400 cursor-pointer" onClick={() => setStep(5)}/>
      <AiFillSetting className="text-2xl my-8 hover:scale-105 duration-200 hover:text-blue-400 cursor-pointer" onClick={() => setStep(6)}/>
      <FiLogOut className="text-2xl my-8 hover:scale-105 duration-200 hover:text-blue-400 cursor-pointer" onClick={() => setStep(7)}/>
      </div>
    </nav>
  );
};

export default Left_Nav;
