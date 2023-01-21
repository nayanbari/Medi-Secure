import React, { useState } from "react";
import { BiDetail } from "react-icons/bi";
import { GiMedicines, GiHealthNormal } from "react-icons/gi";
import { TiTick, TiTimes } from "react-icons/ti";
import {GrDocumentPdf} from "react-icons/all";

const SingleRecord = ({ record }) => {
  const [medicalData, setMedicalData] = useState(record?.medicalData);
  const [isReport, setIsReport] = useState(false);
  return (
    <div className="p-2">
      <div className="font-bold text-xl uppercase border-b-2 pb-2 flex items-center">
        <GiHealthNormal className="mr-2 text-red-600" /> {record?.doctorName}
      </div>
      <div className="my-4">
        <label className="text-xl font-semibold">Medication:</label>
        <div>
          {medicalData.medication?.map((_val, _id) => {
            return (
              <p className="px-3 py-2 rounded-lg border flex items-center">
                <GiMedicines className="text-indigo-600 mr-2" />
                {_val.name}{" "}
                <span className="ml-2 text-green-600">({_val.dose})</span>
              </p>
            );
          })}
        </div>
      </div>
      <div className="my-4">
        <label className="text-lg font-semibold">Diseases:</label>
        <div className="w-full flex flex-wrap">
          {medicalData?.diseases?.map((_val, _id) => {
            return (
              <p className="border px-3 py-2 rounded-lg flex items-center my-2 mx-2">
                {" "}
                {_val["status" + _id] === "true" ? (
                  <TiTick className="text-red-600 mr-4" />
                ) : (
                  <TiTimes className="text-green-600 mr-4" />
                )}{" "}
                {_val.disease}
              </p>
            );
          })}
        </div>
      </div>
      <div className="my-4">
        <label className="text-lg font-semibold">
          Previous Operation Details:{" "}
        </label>
        <p className="flex items-center text-lg py-2 border p-2 rounded-lg">
          <BiDetail className="mr-4" /> {medicalData?.operationDetails}
        </p>
      </div>
      <div className="my-4">
        <label className="text-lg font-semibold">Special Care: </label>
        <p className="flex items-center text-lg p-2 border rounded-lg">
          <BiDetail className="mr-4" /> {medicalData?.specailCare}
        </p>
      </div>
      <div className="my-4 flex items-center justify-between">
        <label className="text-lg font-semibold">Medical Report Document:</label>
        {!isReport && <button
          className="p-2 border bg-indigo-700 text-white rounded-lg"
          onClick={() => setIsReport(!isReport)}
        >
          Show Doctor Report
        </button>
        }
      </div>
      {isReport && <a href={medicalData?.medicalReport} target="_blank" className="flex items-center text-lg border p-2 rounded-lg text-green-600"><GrDocumentPdf className="text-green-600 mr-2" />Pdf Link</a>}
    </div>
  );
};

export default SingleRecord;
