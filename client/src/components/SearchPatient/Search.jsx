import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { MdSettingsInputComponent } from "react-icons/md";

const Search = ({setStep}) => {
  const navigate =  useNavigate();
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const queryData = async () => {
      const data =
        query !== ""
          ? await axios.get(`http://localhost:6969/user/?search=${query}`)
          : { data: [] };
      setUsers(data.data);
    };
    queryData();
  }, [query]);

  const renderNav = () => {
    return (
      <nav className="m-8 p-2 border-b-2 flex">
        <h1 className="text-2xl uppercase font-bold">Search Patient</h1>
      </nav>
    );
  };
  
  const handleViewProfile = (id) => {
    navigate(`/user/${id}`);
    setStep(11); 
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
                <div className="w-1/5 flex items-center">
                  <img src={_val.profile} className="w-28 h-28 p-2 border border-green-300 rounded-full" />
                </div>
                <div className="w-3/5">
                  <h2 className="my-2">
                    FullName:{" "}
                    <span className="text-lg font-semibold ml-2 ">
                      {_val.firstname +
                        " " +
                        _val.middlename +
                        " " +
                        _val.lastname}
                    </span>
                  </h2>
                  <h2 className="my-2">
                    Aadhar Details:{" "}
                    <span className="text-lg font-semibold ml-2 text-indigo-700">
                      {_val.aadharno}
                    </span>
                  </h2>
                  <h2 className="my-2">
                    Contact Details:{" "}
                    <span className="text-lg font-semibold ml-2 ">
                      +91-{_val.contactno}
                    </span>
                  </h2>
                </div>
                <div className="w-1/5 flex items-center">
                  <button className="w-full mx-2 p-2 bg-indigo-700 text-white rounded-lg" onClick={() => handleViewProfile(_val._id)}>View Data</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Search;
