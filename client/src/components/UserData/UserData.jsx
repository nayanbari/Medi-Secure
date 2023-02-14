import React from "react";
import { Profile } from "../../api/api";
import { AiFillDatabase, AiOutlineUserAdd, AiTwotoneEdit } from "react-icons/ai";
import { TiUserDelete } from "react-icons/ti";
import { MdVerified } from "react-icons/md";
import { useState } from "react";
import OTP from "../OTP/OTP";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserData = ({ setStep }) => {
  const navigate = useNavigate();
  const [isEmailVerified, setEmailVerified] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const path = Profile.id;

  const handleVerify = async () => {
    setIsVerify(!isVerify);
    setEmailVerified(!isEmailVerified);

    const emailData = { email: Profile?.email };

    const data = await axios.post(
      "http://localhost:6969/user/sendOtp",
      emailData
    );

    console.log(data);
  };

  const handlePrev = () => {
    setStep(14);
    navigate(`/user/${path}`);
  }

  const handleDelete = async () => {
    const data = await axios.get(
      `http://localhost:6969/user/delete/${Profile.id}`
    );
    window.localStorage.removeItem("Profile");
    window.location.reload(0);
    alert(data.data);
  };
  const UserComp = () => {
    return (
      <section className="select-none flex flex-col justify-center ml-8">
        <div className="flex flex-col items-center mt-4 ">
          <img
            alt=""
            src={Profile.profile}
            className="w-32 h-32 border rounded-full border-black"
          />
          <div className="w-full m-4">
            <h1 className="text-2xl font-bold hover:underline duration-200 my-4">
              Personal Details
            </h1>
            <h2 className="flex text-lg">
              Account Hash:
              <p className="font-bold ml-4">{Profile.accountHash}</p>
            </h2>
            <h2 className="flex text-lg my-2">
              Full Name:
              <p className="font-bold ml-4">
                {Profile.firstname +
                  " " +
                  Profile.middlename +
                  " " +
                  Profile.lastname}
              </p>
            </h2>
            <h2 className="flex text-lg w-full items-center">
              <div className="flex">
                Email :<p className="font-bold ml-4">{Profile.email}</p>
              </div>
              {!isEmailVerified && (
                <MdVerified
                  className={`text-${
                    isEmailVerified ? "green" : "red"
                  }-600 ml-2 cursor-pointer`}
                  onClick={handleVerify}
                />
              )}
            </h2>
            {isVerify && (
              <OTP email={Profile.email} setEmailVerified={setEmailVerified} />
            )}
          </div>
        </div>
        <div>
          <div className="flex my-4 w-full justify-between">
            <h2 className="flex text-lg w-1/2">
              Aadhar No:<p className="font-bold ml-4">{Profile.aadharno}</p>
            </h2>
            <h2 className="flex text-lg w-1/2">
              Contact No:<p className="font-bold ml-4">{Profile.contactno}</p>
            </h2>
          </div>
          <div className="flex justify-between my-4 w-full">
            <h2 className="flex text-lg w-1/2">
              Gender:
              <p className="font-bold ml-4 uppercase">{Profile.gender}</p>
            </h2>
            <h2 className="flex text-lg w-1/2">
              Date of Birth:
              <p className="font-bold ml-4">{Profile.dateofbirth}</p>
            </h2>
          </div>
        </div>
        <div className="my-8">
          <h1 className="text-2xl font-bold hover:underline duration-200">
            Address:{" "}
          </h1>
          <div>
            <h2 className="my-2  w-full flex flex-wrap text-lg">
              Complete Address:
              <br />
              <p className="font-bold text-lg w-[80%] ml-4">
                {Profile.address.fulladdress}
              </p>
            </h2>
          </div>
          <div className="flex justify-between w-full my-4">
            <h2 className="flex text-lg w-1/2">
              Country:{" "}
              <p className="font-bold ml-4 text-lg">
                {Profile.address.country}
              </p>
            </h2>
            <h2 className="flex text-lg w-1/2">
              State:{" "}
              <p className="font-bold ml-4 text-lg">{Profile.address.state}</p>
            </h2>
          </div>
        </div>
      </section>
    );
  };
  return (
    <div className="p-2 mt-8">
      <div className=" mx-4 px-2  flex justify-between items-center border-b-2 border-zinc-200">
        <span className="uppercase font-bold text-2xl">Register User Data</span>
        <button
          onClick={() => setStep(2)}
          className="p-2 text-white bg-[#0a1172] w-1/5 rounded-lg flex items-center justify-center"
        >
          <AiOutlineUserAdd className="mr-2" />
          New User
        </button>
      </div>
      {UserComp()}
      <div className="mt-8 flex w-full justify-around">
        <button className="border mr-2 p-2 w-1/2 bg-green-600 text-white rounded-lg flex items-center justify-center" onClick={handlePrev}>
          <AiFillDatabase className="mr-4" />
          Personal Medical Record
        </button>
        <button
          className="border ml-2 p-2 w-1/2 bg-red-600 text-white rounded-lg flex items-center justify-center"    
          onClick={handleDelete}
        >
          <TiUserDelete className="mr-4" />
          Delete User Data
        </button>
      </div>
    </div>
  );
};

export default UserData;