import React, { useState } from "react";
import { AiOutlineSwapLeft, AiOutlineUserAdd } from "react-icons/ai";
import DocLoginImg from "../../utils/images/docLogin.svg";
import Swal from "sweetalert2";
import axios from "axios";

const DocLogin = ({ setStep }) => {
  const [isReq, setIsReq] = useState(false);
  const [reqField, setReqField] = useState("");
  const [otp, setOTP] = useState("");
  const [emailRes, setEmailRes] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    setIsReq(!isReq);

    try {
      const postData = {
        reqField,
      };

      const data = await axios.post(
        "http://localhost:6969/doctor/login",
        postData
      );

      if (!data.data.email) setIsReq(!isReq);
      else setEmailRes(data.data.email);
    } catch (error) {
      Swal.fire({
        title: "Server Side Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  const handleOTP = async (e) => {
    e.preventDefault();

    try {
      const postData = {
        email: emailRes,
        otp,
      };

      const response = await axios.post(
        "http://localhost:6969/doctor/verifyDoctor",
        postData
      );

      let data = response.data;

      if (!data.doctor._id) {
        Swal.fire({
          title: "Error ❌",
          text: data,
          icon: "error",
        });
      }else{
        window.localStorage.setItem("Doctor",JSON.stringify(data?.doctor));
        window.location.reload(0);
      }

    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Server Side Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  const renderOTPField = () => {
    return (
      <>
        <input
          placeholder="Enter OTP"
          className="w-10/12 px-1 py-2 focus:outline-none border border-zinc-400"
          onChange={(e) => setOTP(e.target.value)}
        />
        <button
          className="bg-indigo-900 text-white p-2 w-2/3"
          onClick={handleOTP}
        >
          Validate OTP
        </button>
      </>
    );
  };

  const renderNav = () => {
    return (
      <nav className="p-2 mt-8">
        <div className="mx-4 px-2 flex justify-between items-center border-b-2 border-zinc-200">
          <span className="uppercase font-bold text-2xl">Login As Doctor</span>
          <button
            className="p-2 text-white bg-[#0a1172] w-1/5 rounded-lg flex items-center justify-center"
            onClick={() => setStep(8)}
          >
            <AiOutlineUserAdd className="mr-2" />
            New Doctor
          </button>
        </div>
      </nav>
    );
  };
  return (
    <section>
      {renderNav()}
      <div className="m-8">
        <div className="flex justify-center w-full">
          <img src={DocLoginImg} className="h-96 w-96" />
        </div>
        <div className="flex flex-col space-y-4 justify-center items-center">
          <input
            placeholder="Enter Registration No/Email"
            className="w-full border py-2 px-1 focus:outline-none border-zinc-400"
            onChange={(e) => setReqField(e.target.value)}
          />
          {isReq ? (
            renderOTPField()
          ) : (
            <button
              className="p-2 w-2/3 bg-indigo-600 text-white text-lg"
              onClick={handleSignIn}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default DocLogin;
