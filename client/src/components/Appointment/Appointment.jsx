import React from 'react'
import { useLocation } from 'react-router-dom'
import { DoctorProfile, localStep, Profile } from '../../api/api'
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { MdSettingsInputComponent } from "react-icons/md";
import { useState, useEffect } from 'react';
import BigCalendar from './BigCalendar/BigCalendar';
import Swal from "sweetalert2";

const Appointment = ({setStep}) => {
    const [docId, setDocId] = useState(0)
    const [userId, setUserId] = useState(0)
    const [book, setBook] = useState(false)
    const [eventsData, setEventData] = useState([])

    const navigate =  useNavigate();
    const [query, setQuery] = useState("");
    const [docInfo, setDocInfo] = useState();
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      const queryData = async () => {
        const data =
          query !== ""
            ? await axios.get(`http://localhost:6969/doctor/?search=${query}`)
            : { data: [] };
          console.log(data.data[0])
        setUsers(data.data[0]);
        setDocId(data.data[0]._id)
        setDocInfo(data.data[0])
        setEventData(data.data[0].docEvents)
        // DoctorProfile.docEvents = data.data[0].docEvents
        console.log(data.data[0]._id)
      };
      queryData();
    }, []);
  
    const renderNav = () => {
      return (
        <nav className="m-8 p-2 border-b-2 flex">
          <h1 className="text-2xl uppercase font-bold">Search Doctor</h1>
        </nav>
      );
    };
    
    const handleViewProfile = (id) => {
      setBook(true)
      // navigate(`/doctor/${id}`);
      // setStep(11); 
    }

    const publishDocRec = async (e) => {
      e.preventDefault();
        try {
          // const postData = {
          //   docEvents: eventsData
          // };
  
          const reqData = {
            fullname: DoctorProfile.fullname,
            qualification: DoctorProfile.qualification,
            registrationNo: DoctorProfile.registrationNo,
            contactNo: DoctorProfile.contactNo,
            email: DoctorProfile.email,
            certificate:DoctorProfile.certificate,
            accountHash: DoctorProfile.accountHash,
            docEvents: eventsData,
          };
          console.log(reqData['docEvents'])
          // DoctorProfile.docEvents = eventsData
          const data = await axios.post(`http://localhost:6969/doctor/update`, reqData);
          console.log(data.data)
          if(data.data._id){
            Swal.fire({
              title:"Data Published",
              text:"Medical data is updated",
              icon:"success"
            });
            // navigate(`/doctor/${docId}`)
          }
        } catch (error) {
          Swal.fire({
            title: "Server-Side Error",
            text: error.message,
            icon: "error",
          });
        }
    };
    const eventDataHandler = (childdata) => {
      console.log(childdata);
      setEventData(childdata)
      // console.log(eventsData)
    }
  return (
<div>
      {renderNav()}
      <section className="m-8">
        <div className="relative block ">
          <AiOutlineSearch className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400 " />
          <input
            className="border w-full px-12 py-2 focus:outline-none"
            placeholder="Search by Name/Aadhar No"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="h-full overflow-auto">
          {users.map((_val, _id) => {
            return (
              <div
                key={_id}
                className="border p-2 my-4 flex border-zinc-400 rounded-lg"
              >
                {/* <div className="w-1/5 flex items-center">
                  <img src={_val.profile} className="w-28 h-28 p-2 border border-green-300 rounded-full" />
                </div> */}
                <div className="w-3/5">
                  <h2 className="my-2">
                    FullName:{" "}
                    <span className="text-lg font-semibold ml-2 ">
                      {_val.fullname}
                    </span>
                  </h2>
                  <h2 className="my-2">
                    Aadhar Details:{" "}
                    <span className="text-lg font-semibold ml-2 text-indigo-700">
                      {_val.email}
                    </span>
                  </h2>
                  <h2 className="my-2">
                    Contact Details:{" "}
                    <span className="text-lg font-semibold ml-2 ">
                      +91-{_val.contactNo}
                    </span>
                  </h2>
                </div>
                <div className="w-1/5 flex items-center">
                  <button className="w-full mx-2 p-2 bg-indigo-700 text-white rounded-lg" onClick={() => handleViewProfile(_val._id)}>Book an appointment</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {book ? (
        <>
        <BigCalendar eventDataHandler={eventDataHandler} prevEventsData={eventsData} />
        <div>
          <button
            className="border w-full p-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700 duration-200"
            onClick={publishDocRec}
            >
          {/* {loading ? <Spinner /> :"Publish Records"} */}
          add event
          </button>
        </div>
        </>
      ): (
        <p>Hello</p>
      )}
    </div>
  )
}

export default Appointment