import { QRCodeCanvas } from "qrcode.react";
import React, { useEffect, useState } from "react";
import { Profile } from "../../api/api";
import logo from "../../utils/images/satJ.png";

const UserCard = ({ user }) => {
  const [query, setQuery] = useState(user?.id ? user : Profile);
  console.log(user, Profile)
  const RenderQR = () => {
    return (
      <QRCodeCanvas
        className="my-4"
        size={144}
        id="qrCode"
        value={`http://localhost:5173/user/${query?._id}`}
        bgColor={"white"}
        level={"H"}
      />
    );
  };

  const fullname =
    query?.firstname + " " + query?.middlename + " " + query?.lastname;

  const address = query?.address?.city + ", " + query?.address?.state;

  const modifyString = (str) => {
    console.log(str)
    return str.match(/.{1,4}/g).join("-");
  };

  const RenderCard = () => {
    return (
      <section className="border border-zinc-400 shadow-2xl w-10/12 h-[480px] my-8 rounded-lg">
        <div className="flex items-center justify-center p-4 border-b-2 m-2 font-bold text-lg">
          <img className="h-12 w-12 mr-2" src={logo} />
          <span>MINISTRY of HEALTH AND FAMILY WELFARE</span>
        </div>
        <div className="h-[20rem] border-b-2 border-red-600 m-2 flex items-center">
          <div className="w-1/3 h-full flex justify-center items-center p-1">
            <img src={Profile?.profile} className="w-10/12" />
          </div>
          <div className="w-1/3 h-full">
            <div className="h-2/3 flex flex-col justify-center">
              <span className="flex text-lg my-4">
                Name: <p className="ml-4 font-bold text-xl">{fullname}</p>
              </span>
              <span className="flex text-lg my-4">
                Date of Birth:{" "}
                <p className="ml-4 font-bold text-xl">{query?.dateofbirth}</p>
              </span>
              <span className="flex text-lg my-4">
                Gender:{" "}
                <p className="ml-4 uppercase font-bold text-xl">
                  {query?.gender}
                </p>
              </span>
              <span className="flex text-lg my-4">
                Address:{" "}
                <p className="ml-4 uppercase font-bold text-xl">{address}</p>
              </span>
            </div>
            <div className="flex  items-center h-1/3">
              <span className="text-3xl font-bold ">
                {modifyString(query?.aadharno)}
              </span>
            </div>
          </div>
          <div className="w-1/3 h-full flex justify-center items-end">
            {RenderQR()}
          </div>
        </div>
        <div className="w-full h-12 flex justify-center items-center">
        <p className="text-xl"><span className="uppercase font-bold text-red-600">E-Health</span> - Live Healthy Life</p>
        </div>
      </section>
    );
  };

  return (
    <div className="p-4">
      <div className="text-3xl font-bold uppercase border-b-2 p-2">
        E-Health Card Details
      </div>
      <div className="flex justify-center items-center m-4">{RenderCard()}</div>
    </div>
  );
};

export default UserCard;
