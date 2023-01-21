import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SingleRecord from "./SingleRecord";

const MedicalRecords = () => {
  const location = useLocation();

  const path = location.pathname.split("/")[2];

  const [records, setRecords] = useState([]);

  const [issingleRecord, setIsSingleRecord] = useState(false);
  const [singleRecord, setSingleRecord] = useState();

  useEffect(() => {
    async function getRecord() {
      const response = await axios.get(
        `http://localhost:6969/user/medicalRecords/${path}`
      );
      setRecords(response.data);
    }
    getRecord();
  }, []);

  const handleRecord = (_id) => {
    setIsSingleRecord(!singleRecord);
    setSingleRecord(records[_id]);
  };

  return (
    <section className="border m-8 border-zinc-400 p-2 rounded-lg">
      {records.length == 0 && (
        <div className="text-center">
          <h1 className="font-bold text-2xl">No Record Found</h1>
        </div>
      )}
      {console.log(records)}
      {!issingleRecord && records.length != 0 && (
        <>
          <div className="text-xl p-2 font-bold uppercase">Medical Records</div>
          {records?.map((_val, _id) => {
            return (
              <div className="border p-2 my-4 rounded-lg border-zinc-400 hover:bg-green-100">
                <div className="flex my-2">
                  <label className="">Doctor Hash Address: </label>
                  <p className="ml-4 text-lg font-semibold text-indigo-700">
                    {_val.doctorhash}
                  </p>
                </div>
                <div className="flex my-2">
                  <label className="">Doctor Full Name: </label>
                  <p className="ml-4 text-lg font-semibold">
                    {_val.doctorName}
                  </p>
                </div>
                <div className="flex my-2">
                  <label className="">Checkup Date: </label>
                  <p className="ml-4 text-lg font-semibold">
                    {_val.medicalData?.date?.toString()}
                  </p>
                </div>
                <div className="w-full flex justify-end">
                  <button
                    className="border p-2 rounded-lg text-white bg-teal-700"
                    onClick={() => handleRecord(_id)}
                  >
                    Record Details
                  </button>
                </div>
              </div>
            );
          })}
        </>
      )}
      {singleRecord && <SingleRecord record={singleRecord} />}
    </section>
  );
};

export default MedicalRecords;
