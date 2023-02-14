import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  AiOutlineUserAdd,
  AiOutlineFolderView,
  AiOutlineClose,
  AiFillEdit,
  AiFillSave,
  AiOutlineSearch,
} from "react-icons/ai";
import Swal from "sweetalert2";
import { DoctorProfile } from "../../api/api";
import { docqualification } from "../../api/list";
import {
  loadBlockchainDataDoc,
  loadWeb3Doc,
} from "../../webblock/Web3DocHelpers";
import BigCalendar from "../Appointment/BigCalendar/BigCalendar";

const DocData = ({ setStep }) => {
  const [auth, setAuth] = useState();
  const [accounts, setAccounts] = useState();
  const [docData, setDocData] = useState([])

  useEffect(() => {
    const queryData = async () => {
      const data = await axios.get(`http://localhost:6969/doctor`);
      // DoctorProfile.docEvents = data.data[0].docEvents
      console.log(data.data[0]._id)
      setDocData(data.data[0])
    };
    queryData();
  }, []);

  const loadAccounts = async () => {
    let { auth, accounts } = await loadBlockchainDataDoc();

    setAccounts(accounts);
    setAuth(auth);
  };

  useEffect(() => {
    loadWeb3Doc();
  }, []);

  useEffect(() => {
    loadAccounts();
  }, []);

  const [isDocShow, setIsDocShow] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateData, setUpdateData] = useState(docData);
  console.log(docData.docEvents)
  const renderNav = () => {
    return (
      <nav className="p-2 mt-8">
        <div className="mx-4 px-2 flex justify-between items-center border-b-2 border-zinc-200">
          <span className="uppercase font-bold text-2xl">
            Register Doctor Details
          </span>
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

  const handleSave = async (e) => {
    e.preventDefault();

    setIsUpdate(!isUpdate);

    if (updateData.contactNo.length != 10) {
      Swal.fire({
        title: "Invalid Contact",
        text: "Please fill 10 Digit contact no",
        icon: "error",
      });
    } else if (isUpdate) {
      const postData = {
        fullname: updateData.fullname,
        email: updateData.email,
        qualification: updateData.qualification,
        registrationNo: updateData.registrationNo,
        contactNo: updateData.contactNo,
        accountHash: accounts,
        docEvents: updateData.docEvents
      };

      const data = await axios.post(
        "http://localhost:6969/doctor/update",
        postData
      );

      window.localStorage.setItem("Doctor", JSON.stringify(data.data));

      await auth.methods
        .createDoctor(
          updateData.fullname,
          updateData.qualification,
          updateData.registrationNo,
          updateData.contactNo,
          updateData.email
        )
        .send({ from: accounts });
    }
  };
  const eventDataHandler = (childdata) => {
    console.log(childdata);
    // setEventData(childdata)

  }

  return (
    <div className="select-none">
      {renderNav()}
      <section className="my-16 mx-8 p-4">
        <div className="text-lg">
          Account Hash:{" "}
          <span className="ml-2 font-bold text-xl">
            {DoctorProfile.accountHash}
          </span>
        </div>
        <div className="text-lg my-4">
          FullName:{" "}
          {isUpdate ? (
            <input
              className="w-[75%] ml-2 py-2 px-1 border focus:outline-none"
              placeholder="Full Name"
              onChange={(e) =>
                setUpdateData({ ...updateData, fullname: e.target.value })
              }
              value={updateData.fullname}
            />
          ) : (
            <span className="ml-2 font-bold text-xl">
              {DoctorProfile.fullname}
            </span>
          )}
        </div>
        <div className="text-lg my-4">
          Email:{" "}
          {isUpdate ? (
            <input
              className="w-[75%] ml-2 py-2 px-1 border focus:outline-none"
              placeholder="Email"
              onChange={(e) =>
                setUpdateData({ ...updateData, email: e.target.value })
              }
              value={updateData.email}
            />
          ) : (
            <span className="ml-2 text-xl font-bold">
              {DoctorProfile.email}
            </span>
          )}
        </div>
        <div className="text-lg my-4">
          Qualification:{" "}
          {isUpdate ? (
            <select
              value={updateData.qualification}
              className="py-2 px-1 border w-[75%] focus:outline-none"
              onChange={(e) =>
                setUpdateData({ ...updateData, qualification: e.target.value })
              }
            >
              {docqualification.map((val, _id) => {
                return <option key={_id}>{val}</option>;
              })}
            </select>
          ) : (
            <span className="ml-2 text-xl font-bold">
              {DoctorProfile.qualification}
            </span>
          )}
        </div>
        <div className="text-lg my-4 flex justify-between w-full">
          <div className="w-1/2">
            Registration No:{" "}
            {isUpdate ? (
              <input
                className="w-[65%] py-2 px-1 border focus:outline-none"
                value={updateData.registrationNo}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    registrationNo: e.target.value,
                  })
                }
              />
            ) : (
              <span className="text-green-600 font-bold text-xl ml-2">
                {DoctorProfile.registrationNo}
              </span>
            )}
          </div>
          <div className="w-1/2">
            Contact No:{" "}
            {isUpdate ? (
              <input
                type={"text"}
                maxLength={10}
                className="w-[75%] py-2 px-1 border focus:outline-none"
                value={updateData.contactNo}
                onChange={(e) =>
                  setUpdateData({ ...updateData, contactNo: e.target.value })
                }
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*?)\..*/g, "$1")
                    .replace(/^0[^.]/, "0");
                }}
              />
            ) : (
              <span className="text-purple-600 font-bold text-xl ml-2">
                +91 {DoctorProfile.contactNo}
              </span>
            )}
          </div>
        </div>
        <div className="text-lg my-6 flex w-full justify-between">
          <button className="p-2 bg-indigo-600 text-white w-1/4 rounded-lg focus:outline-none" onClick={() => setStep(10)}>
            <div className="flex items-center justify-center">
              <AiOutlineSearch className="mr-2" />
              Search Details
            </div>
          </button>
          <button
            className={`p-2 w-1/4 bg-${
              isDocShow ? "red" : "green"
            }-600 text-white rounded-lg duration-200`}
            onClick={() => setIsDocShow(!isDocShow)}
          >
            {isDocShow ? (
              <div className="flex items-center justify-center text-white">
                <AiOutlineClose className="mr-2" />
                Close Certificate
              </div>
            ) : (
              <div className="flex items-center justify-center text-white">
                <AiOutlineFolderView className="mr-2" />
                View Certificate
              </div>
            )}
          </button>
          <button
            className={`p-2 w-1/4 bg-${
              isUpdate ? "green" : "red"
            }-600 duration-300 text-white rounded-lg`}
            onClick={handleSave}
          >
            {isUpdate ? (
              <div className="flex items-center justify-center">
                <AiFillSave className="mr-2" />
                Save Profile
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <AiFillEdit className="mr-2" />
                Update Profile
              </div>
            )}
          </button>
        </div>
        {isDocShow && (
          <div className="flex justify-center">
            <img
              className="h-96 w-1/2 mt-2 border border-zinc-400 text-center"
              src={DoctorProfile.certificate}
            />
          </div>
        )}
      </section>
      {(docData.docEvents == undefined) ? <p>Loading</p> : <BigCalendar eventDataHandler={eventDataHandler} prevEventsData={docData.docEvents} />}
      
    </div>
  );
};

export default DocData;
