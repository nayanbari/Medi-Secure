import axios from "axios";
import React,{useState} from "react";

const OTP = ({email,setEmailVerified}) => {
  const [otp,setOtp] = useState("");

  const handleValidate = async () => {
    const postData = {
      email,
      otp
    };

    const data = await axios.post("http://localhost:6969/user/verifyEmail", postData);

    alert(data.data);
  }
  return (<div className="flex justify-between items-center">
    <input placeholder="Enter OTP Here" onChange={(e) => setOtp(e.target.value)} className="border p-2 w-full mr-2"  />
    <button className="p-2 border bg-green-600 text-white rounded-lg" onClick={handleValidate}>Validate</button>
  </div>)
};

export default OTP;
