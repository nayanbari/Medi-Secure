import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { docqualification } from "../../api/list";
import Spinner from "../../utils/Spinner";
import {
  loadBlockchainDataDoc,
  loadWeb3Doc,
} from "../../webblock/Web3DocHelpers";
import { loadBlockchainData, loadWeb3 } from "../../webblock/Web3helpers";

const DocRegister = ({setStep}) => {
  const [auth, setAuth] = useState();
  const [accounts, setAccounts] = useState();

  const loadAccounts = async () => {
    let { auth, accounts } = await loadBlockchainDataDoc();
    console.log(auth)
    setAccounts(accounts);
    setAuth(auth);
    console.log(accounts)
  };

  useEffect(() => {
    loadWeb3Doc();
  }, []);

  useEffect(() => {
    loadAccounts();
  }, []);

  const [doctor, setDoctor] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    registrationNo: "",
    contactNo: "",
    email: "",
    errors: {
      firstname: "",
      middlename: "",
      lastname: "",
      qualification: "",
      registrationNo: "",
      contactNo: "",
      email: "",
    },
  });
  const [qualification, setQualification] = useState(docqualification[0]);
  const [loading, setLoading] = useState("");
  const [cerr, setCerr] = useState("");

  let Emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleInput = (e) => {
    const { name, value } = e.target;

    let error = doctor.errors;

    switch (name) {
      case "firstname":
        error.firstname =
          value.length < 5 && value.length == 0 ? "Invalid Firstname" : "";
        break;
      case "middlename":
        error.middlename =
          value.length < 5 && value.length == 0 ? "Invalid Middlename" : "";
        break;
      case "lastname":
        error.lastname =
          value.length < 5 && value.length == 0 ? "Invalid Lastname" : "";
        break;

      case "registrationNo":
        error.registrationNo =
          value.length == 0 ? "Invalid Registration No" : "";
        break;

      case "contactNo":
        error.contactNo =
          value.length > 0 && value.length < 10
            ? "Invalid Contact Details"
            : "";
        break;

      case "email":
        error.email = !value.match(Emailregex) ? "Invalid Email" : "";
        break;

      default:
        return;
    }
    setDoctor({ ...doctor, [name]: value, errors: error });
    console.log(doctor)
  };

  const handleEmpty = (obj) => {
    for (var keys in obj) {
      if (obj[keys] === "") {
        return true;
      }
    }

    return false;
  };

  const handleError = (obj) => {
    for (var keys in obj) {
      if (obj[keys] != "") {
        return true;
      }
    }

    return false;
  };

  const handleCerr = (post) => {
    setLoading(true);
    if (post === undefined) {
      Swal.fire({
        title: "No Image!",
        icon: "error",
        text: "Please Select an Image!",
      });
      return;
    }

    console.log(post);

    if (post.type === "image/jpeg" || post.type === "image/png") {
      const data = new FormData();
      data.append("file", post);
      data.append("upload_preset", "blockchain");
      data.append("cloud_name", "dgrxzxtd8");
      fetch("https://api.cloudinary.com/v1_1/dgrxzxtd8/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setCerr(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        });
    } else {
      Swal.fire({
        title: "Image not found",
        icon: "warning",
        text: "Please Select an Image!",
      });
      setLoading(false);
      return;
    }
  };

  const handleButton = async (e) => {
    e.preventDefault();

    if (cerr === "") {
      Swal.fire({
        title: "Empty Fields",
        text: "Please upload medical certificate",
        icon: "error",
      });
    } else if (qualification === "") {
      Swal.fire({
        title: "Empty Fields",
        text: "Please Select Qualification",
        icon: "error",
      });
    } else if (handleEmpty(doctor) || handleError(doctor.errors)) {
      Swal.fire({
        title: "Empty Fields",
        text: "All Fields are Required",
        icon: "error",
      });
    } else {
      let fullname =
        "Dr. "+doctor.firstname + " " + doctor.middlename + " " + doctor.lastname;
      
      const postData = {
        fullname,
        qualification,
        registrationNo:doctor.registrationNo,
        contactNo:doctor.contactNo,
        email:doctor.email,
        certificate:cerr,
        accountHash:accounts
      }

      const data = await axios.post("http://localhost:6969/doctor",postData);

      window.localStorage.setItem("Doctor",JSON.stringify(data.data));

      await auth.methods
        .createDoctor(
          fullname,
          qualification,
          doctor.registrationNo,
          doctor.contactNo,
          doctor.email
        )
        .send({ from: accounts });
    }
  };

  const renderNav = () => (
    <div className="p-2 text-2xl font-bold border-b-2 border-zinc-400 uppercase flex items-center justify-between">
      <h1 className="text-gray-500">Register as Verified Doctor</h1>
      <button className="p-2 text-xl w-1/5 text-white bg-[#0a1172] rounded-lg" onClick={() => setStep(9)}>
        Sign In
      </button>
    </div>
  );

  const renderForm = () => (
    <form className="p-2 my-8">
      <div className="mt-4">
        <label className="text-lg">Full Name: </label>
        <div className="mt-2 flex w-full">
          <div className="w-1/3 mr-2">
            <input
              placeholder="FirstName"
              className="border py-2 px-1 w-full mr-2 focus:outline-none"
              name="firstname"
              onChange={handleInput}
            />
            {doctor.errors.firstname.length > 0 && (
              <p className="text-red-600">{doctor.errors.firstname}</p>
            )}
          </div>
          <div className="w-1/3 mr-2">
            <input
              placeholder="MiddleName"
              className="border py-2 px-1 w-full mr-2 focus:outline-none"
              name="middlename"
              onChange={handleInput}
            />
            {doctor.errors.middlename.length > 0 && (
              <p className="text-red-600">{doctor.errors.middlename}</p>
            )}
          </div>
          <div className="w-1/3">
            <input
              placeholder="LastName"
              className="border py-2 px-1 w-full focus:outline-none"
              name="lastname"
              onChange={handleInput}
            />
            {doctor.errors.lastname.length > 0 && (
              <p className="text-red-600">{doctor.errors.lastname}</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <label className="text-lg">Qualification: </label>
        <div className="mt-2">
          <select
            name="qualification"
            onChange={(e) => setQualification(e.target.value)}
            className="border py-2 px-1 w-full focus:outline-none"
          >
            {docqualification.map((val, _id) => {
              return <option key={_id}>{val}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="mt-4 flex w-full">
        <div className="w-1/2 mr-2">
          <label className="text-lg">Registration Number : </label>
          <br />
          <div>
            <input
              placeholder="e.g. M-88151"
              className="py-2 px-1 border w-full  focus:outline-none"
              name="registrationNo"
              onChange={handleInput}
            />
            {doctor.errors.registrationNo.length > 0 && (
              <p className="text-red-600">{doctor.errors.registrationNo}</p>
            )}
          </div>
        </div>
        <div className="w-1/2">
          <label className="text-lg">Contact Number : </label>
          <br />
          <input
            placeholder="e.g. 7709493932"
            type={"text"}
            maxLength={10}
            className="py-2 px-1 border w-full  focus:outline-none"
            name="contactNo"
            onChange={handleInput}
            onInput={(e) => {
              e.target.value = e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*?)\..*/g, "$1")
                .replace(/^0[^.]/, "0");
            }}
          />
          {doctor.errors.contactNo.length > 0 && (
            <p className="text-red-600">{doctor.errors.contactNo}</p>
          )}
        </div>
      </div>
      <div className="mt-4 w-full">
        <label className="text-lg">Email: </label>
        <br />
        <input
          placeholder="e.g. abc@gmail.com"
          className="px-1 py-2 w-full focus:outline-none border"
          name="email"
          onChange={handleInput}
        />
        {doctor.errors.email.length > 0 && (
          <p className="text-red-600">{doctor.errors.email}</p>
        )}
      </div>
      <div className="mt-4 w-full">
        <label className="text-lg">
          Certificate Proof:{" "}
          <span className="text-red-600 ml-2">(only png/jpg*)</span>{" "}
        </label>
        <br />
        <input
          type={"file"}
          className="px-1 py-2 w-full focus:outline-none border"
          onChange={(e) => handleCerr(e.target.files[0])}
        />
      </div>
      <div className="text-center mt-4">
        <button
          onClick={handleButton}
          className="px-1 py-2 w-2/3  rounded-lg bg-green-600 text-white text-lg border-none"
        >
          {loading ? <Spinner /> : "Submit"}
        </button>
      </div>
    </form>
  );
  return (
    <section className="p-4">
      {renderNav()}
      <div className="mt-8">{renderForm()}</div>
    </section>
  );
};

export default DocRegister;
