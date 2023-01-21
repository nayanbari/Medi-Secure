import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiFillDatabase } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import MedicalForm from '../MedicalRecords/MedicalForm';
import MedicalRecords from '../MedicalRecords/MedicalRecords';

const PersonalMedical = () => {
  const location = useLocation();

  const [user, setUser] = useState();

  let path = location.pathname.split("/")[2];

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`http://localhost:6969/user/${path}`);
      setUser(response.data);
    };
    getUser();
  }, []);

  const renderNav = () => {
    return (
      <nav className="m-8 p-2 border-b-2">
        <h1 className="text-3xl font-bold">
          {user?.firstname + " " + user?.lastname}
        </h1>
      </nav>
    );
  };

  const getAge = (dob) => {
    let year = dob?.substr(0, 4);
    let currYear = new Date().getFullYear();

    let age = currYear - year;

    return age;
  };

  const [isForm, setIsForm] = useState(false);
  const [isRecord, setIsRecord] = useState(false);

  return (
    <div>
      {renderNav()}
      <section className="m-8 flex">
        <div className="w-2/3">
          <h2 className="text-lg my-4 flex items-center">
            FullName:
            <span className="ml-4 text-xl font-semibold">
              {user?.firstname + " " + user?.middlename + " " + user?.lastname}
            </span>
          </h2>
          <h2 className="text-lg my-4 w-full flex items-center">
            Aadhaar Number:
            <span className="ml-4 text-xl font-semibold text-indigo-600">
              {user?.aadharno}
            </span>
          </h2>
          <h2 className="text-lg my-4 w-full flex items-center">
            Contact Number:
            <span className="ml-4 text-xl font-semibold">
              +91-{user?.contactno}
            </span>
          </h2>
          <h2 className="text-lg my-4 w-full flex items-center">
            Gender:
            <span className="ml-4 text-xl font-semibold capitalize">
              {user?.gender}
            </span>
          </h2>
          <h2 className="text-lg my-4 w-full flex items-center">
            Date of Birth:
            <span className="ml-4 text-xl font-semibold flex">
              {user?.dateofbirth}{" "}
              <p className="font-bold ml-2 text-red-600">
                ( {getAge(user?.dateofbirth)} years )
              </p>
            </span>
          </h2>
          <h2 className="text-lg my-4 w-full flex items-center">
            Address:
            <span className="ml-4 text-xl font-semibold">
              {user?.address?.city}, {user?.address?.state}
            </span>
          </h2>
        </div>
        <div className="w-1/3 flex items-center justify-center">
          <img
            alt=""
            src={user?.profile}
            className="w-48 h-48 border rounded-full p-2 hover:border-zinc-400 hover:scale-105 duration-200"
          />
        </div>
      </section>
      <div className="mx-8 flex w-full">
        <button
          className="py-3 px-2 rounded-lg border bg-emerald-800 text-white flex justify-center items-center w-1/3"
          onClick={() => setIsRecord(!isRecord)}
        >
          <AiFillDatabase className="mr-2" />
          Previous Medical Records
        </button>
      </div>
      {isRecord  ? <MedicalRecords /> : null}
    </div>
  );
}

export default PersonalMedical