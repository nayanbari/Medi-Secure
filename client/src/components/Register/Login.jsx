import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import login from "../../utils/images/login.svg";

const Login = ({setStep}) => {
  const [isOTP, setIsOTP] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");

  const handleSendOTP = async () => {
    try {
      const data = await axios.post(`http://localhost:6969/user/sendOTP`, {
        email,
      });
      if (data.data) {
        setIsOTP(!isOTP);
        Swal.fire({
          title: "Done!! ✔️",
          text: data.data,
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Server Error",
        text: error.message,
        icon: error,
      });
    }
  };

  const validateOTP = async () => {
    try {
      const data = await axios.post(`http://localhost:6969/user/verifyEmail`, {
        email,
        otp,
      });

      if (data.data) {
        setIsOTP(!isOTP);
        Swal.fire({
          title: "Done!! ✔️",
          text: data.data.msg,
          icon: "success",
        });
        setStep(1);
        window.localStorage.setItem("Profile",JSON.stringify(data.data.user));
        window.location.reload(0);
      }
    } catch (error) {
      Swal.fire({
        title: "Server Error",
        text: error.message,
        icon: error,
      });
    }
  };
  return (
    <section>
      <div className="border-b-2 text-2xl font-bold uppercase p-4 m-4">
        User Login
      </div>
      <div className="">
        <div className="w-full flex justify-center">
          <img alt="" src={login} className="w-72 h-72" />
        </div>
        <div className="m-4 p-2 flex items-center flex-col border">
          <div className="text-xl font-semibold w-full">Sign In Here</div>
          <div className="w-full m-4 flex">
            {isOTP ? (
              <input
                placeholder="Validate OTP"
                className="px-1 py-2 border w-2/3 focus:outline-none mr-2"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
              />
            ) : (
              <input
                placeholder="Enter Email"
                className="px-1 py-2 border w-2/3 focus:outline-none mr-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
            <button
              className="border p-2 w-1/3 bg-indigo-600 text-white rounded-lg"
              onClick={isOTP ? validateOTP : handleSendOTP}
            >
              {isOTP ? "Validate OTP" : "Send OTP"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
