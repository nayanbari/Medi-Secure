import React, { useEffect } from "react";
import axios from "axios";
import { cities, countries, relation, states } from "../../../api/list";
import { BiReset, BiSave } from "react-icons/bi";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { useState } from "react";
import Spinner from "../../../utils/Spinner";
import Swal from "sweetalert2";
import { loadBlockchainData, loadWeb3 } from "../../../webblock/Web3helpers";

const Form = () => {
  const [auth, setAuth] = useState();
  const [accounts, setAccounts] = useState();

  const loadAccounts = async () => {
    let { auth, accounts } = await loadBlockchainData();

    setAccounts(accounts);
    setAuth(auth);
  };

  useEffect(() => {
    loadWeb3();
  }, []);

  useEffect(() => {
    loadAccounts();
  }, []);

  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const [isEmpty, setIsEmpty] = useState({
    firstname: false,
    middlename: false,
    lastname: false,
    aadharno: false,
    contactno: false,
    gender: false,
    dateofbirth: false,
    email: false,
    country: false,
    state: false,
    city: false,
    houseno: false,
    pincode: false,
    address: false,
  });

  const [isGuardEmpty, setIsGuardEmpty] = useState({
    fullname: false,
    relationship: false,
    contactno: false,
  });

  const Required = () => {
    return <span className="text-red-600 ml-1">*</span>;
  };

  const [user, setUser] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    aadharno: "",
    contactno: "",
    gender: "",
    dateofbirth: "",
    email: "",
    country: "India",
    state: "",
    city: "",
    houseno: "",
    pincode: "",
    address: "",
  });

  const [guardian, setGuardian] = useState({
    fullname: "",
    relationship: "Father",
    contactno: "",
    errors: {
      fullname: "",
      relationship: "",
      contactno: "",
    },
  });

  const [errors, setErrors] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    aadharno: "",
    contactno: "",
    gender: "",
    dateofbirth: "",
    email: "",
    country: "",
    state: "",
    city: "",
    houseno: "",
    pincode: "",
    address: "",
  });

  const handleFile = (post) => {
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
      data.append("upload_preset", "hello");
      data.append("file", post);
      data.append("cloud_name", "dgrxzxtd8");
      fetch("https://api.cloudinary.com/v1_1/dgrxzxtd8/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setFile(data.url.toString());
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

  const handleUser = (event) => {
    const { name, value } = event.target;

    let err = errors;

    switch (name) {
      case "firstname":
        err.firstname =
          value.length === 0 ? "Firstname should not be empty." : "";
        break;

      case "middlename":
        err.middlename =
          value.length === 0 ? "Middlename should not be empty." : "";
        break;

      case "lastname":
        err.lastname =
          value.length === 0 ? "Lastname should not be empty." : "";
        break;

      case "aadharno":
        err.aadharno =
          value.length < 12 || value.length === 0
            ? "Invalid Aadhar Number"
            : "";
        break;

      case "contactno":
        err.contactno =
          value.length < 10 || value.length === 0
            ? "Invalid Contact Number"
            : "";
        break;

      case "dateofbirth":
        err.dateofbirth = value.length === 0 ? "Please add Date of Birth" : "";
        break;

      case "email":
        err.email = value.length === 0 ? "Invalid Email" : "";
        break;

      case "country":
        err.country = value.length === 0 ? "Please Select Country" : "";
        break;

      case "state":
        err.state = value.length === 0 ? "Please Select State" : "";
        break;

      case "city":
        err.city = value.length === 0 ? "Please Select City" : "";
        break;

      case "houseno":
        err.houseno = value.length === 0 ? "Please Fill Flat/House Number" : "";
        break;

      case "pincode":
        err.pincode =
          value.length < 6 || value.length === 0 ? "Invalid PINCODE" : "";
        break;

      case "address":
        err.address = value.length === 0 ? "Please Enter Complete Address" : "";
        break;

      default:
        break;
    }
    setErrors(err);

    setUser({ ...user, [name]: value });
  };

  const handleGuardian = (event) => {
    const { name, value } = event.target;

    let err = guardian.errors;

    switch (name) {
      case "fullname":
        err.fullname =
          value.length === 0 ? "Please Enter Full Name of Guardian" : "";
        break;

      case "relationship":
        err.relationship = value.length === 0 ? "Please Select Menu" : "";
        break;

      case "contactno":
        err.contactno =
          value.length === 0 ? "Please Enter Guardian Contact Details" : "";
        break;
    }

    setGuardian({ ...guardian, [name]: value, errors: err });
  };

  const handleEmpty = (obj) => {
    let flag = false;
    for (var keys in obj) {
      if (obj[keys] === "") {
        isEmpty[keys] = true;
        flag = true;
      }
    }
    return flag;
  };

  const handleEmptyGuard = (obj) => {
    let flag = false;
    for (var keys in obj) {
      if (obj[keys] === "") {
        isGuardEmpty[keys] = true;
        flag = true;
      }
    }

    return flag;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (handleEmpty(user) || handleEmptyGuard(guardian)) {
      Swal.fire({
        title: "Empty Fields",
        text: "Please enter all details",
        icon: "error",
      });
      setLoading(false);
    } 
    else if(!isSelected){
      Swal.fire({
        title: "Not Accepted",
        text: "Please accept the filled data",
        icon: "error",
      });
    }
    else {
      let fullname =
        user.firstname + " " + user.middlename + " " + user.lastname;
      try {
        const postData = {
          firstname: user.firstname,
          middlename: user.middlename,
          lastname: user.lastname,
          aadharno: user.aadharno,
          contactno: user.contactno,
          email: user.email,
          gender: user.gender,
          dateofbirth: user.dateofbirth,
          address: {
            country: user.country,
            state: user.state,
            city: user.city,
            houseno: user.houseno,
            pincode: user.pincode,
            fulladdress: user.address,
          },
          profile: file,
          guardian: {
            fullname: guardian.fullname,
            relationship: guardian.relationship,
            contactno: guardian.contactno,
          },
          accountHash: accounts,
        };

        const data = await axios.post("http://localhost:6969/user", postData);

        window.localStorage.setItem("Profile",JSON.stringify(data.data));

        await auth.methods
          .createUser(
            fullname,
            user.aadharno,
            user.email,
            user.contactno,
            user.gender,
            user.dateofbirth,
            user.address
          )
          .send({ from: accounts });
      } catch (err) {
        Swal.fire({
          ttile: "Error",
          text: data,
          icon: "error",
        });
      }
      setLoading(false);
    }
  };

  const RenderError = (err) => {
    return <p className="p-1 text-red-600">{err}</p>;
  };

  return (
    <section className="p-4 m-8 overflow-auto">
      <form className="flex flex-col space-y-6">
        <div>
          <label className="text-lg">Full Name{Required()}</label>
          <div className="flex">
            <div className="w-1/3 mr-2">
              <input
                placeholder="First Name"
                name="firstname"
                className={`border w-full p-2 mr-2 focus:outline-none ${
                  isEmpty["firstname"] ? "border-red-600" : ""
                }`}
                onChange={handleUser}
              />
              {errors.firstname.length > 0 && RenderError(errors.firstname)}
            </div>
            <div className="w-1/3 mr-2">
              <input
                placeholder="Middle Name"
                name="middlename"
                className={`border p-2 w-full mr-2 focus:outline-none ${
                  isEmpty["middlename"] ? "border-red-600" : ""
                } `}
                onChange={handleUser}
              />
              {errors.middlename.length > 0 && RenderError(errors.middlename)}
            </div>
            <div className="w-1/3">
              <input
                placeholder="Last Name"
                name="lastname"
                className={`border p-2 w-full focus:outline-none ${
                  isEmpty["lastname"] ? "border-red-600" : ""
                } `}
                onChange={handleUser}
              />
              {errors.lastname.length > 0 && RenderError(errors.lastname)}
            </div>
          </div>
        </div>
        <div className="inline-flex">
          <div className="w-1/2 mr-2">
            <label className="text-lg">Aadhar Number{Required()}</label>
            <div>
              <input
                placeholder="xxxx-xxxx-xxxx"
                name="aadharno"
                type={"text"}
                maxLength={12}
                minLength={12}
                className={`border p-2 w-full focus:outline-none ${
                  isEmpty["aadharno"] ? "border-red-600" : ""
                } `}
                onChange={handleUser}
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*?)\..*/g, "$1")
                    .replace(/^0[^.]/, "0");
                }}
              />
              {errors.aadharno.length > 0 && RenderError(errors.aadharno)}
            </div>
          </div>
          <div className="w-1/2">
            <label className="text-lg">Contact Number{Required()}</label>
            <div>
              <input
                placeholder="xxxxx-xxxxx"
                name="contactno"
                type={"text"}
                maxLength={12}
                minLength={10}
                className={`border p-2 w-full focus:outline-none ${
                  isEmpty["contactno"] ? "border-red-600" : ""
                } `}
                onChange={handleUser}
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*?)\..*/g, "$1")
                    .replace(/^0[^.]/, "0");
                }}
              />
              {errors.contactno.length > 0 && RenderError(errors.contactno)}
            </div>
          </div>
        </div>
        <div className="inline-flex">
          <div className="w-1/2">
            <label className="text-lg">Gender {Required()}</label>
            <div className="flex">
              <div className="w-1/2 py-2 flex items-center">
                <input
                  name="gender"
                  value="male"
                  type={"radio"}
                  className="cursor-pointer"
                  onChange={handleUser}
                />
                <span className="ml-2 flex items-center">
                  <BsGenderMale className="mr-2" />
                  Male
                </span>
              </div>
              <div className="w-1/2 py-2 flex items-center">
                <input
                  name="gender"
                  value="female"
                  type={"radio"}
                  className="cursor-pointer"
                  onChange={handleUser}
                />
                <span className="ml-2 flex items-center">
                  <BsGenderFemale className="mr-2" />
                  Female
                </span>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <label className="text-lg">Date of Birth {Required()}</label>
            <div>
              <input
                type={"date"}
                name="dateofbirth"
                className={`border p-2 w-full focus:outline-none ${
                  isEmpty["dateofbirth"] ? "border-red-600" : ""
                } `}
                onChange={handleUser}
              />
              {errors.dateofbirth.length > 0 && RenderError(errors.dateofbirth)}
            </div>
          </div>
        </div>
        <div className="inline-flex">
          <div className="w-1/2 mr-2">
            <label>Email</label>
            <div>
              <input
                placeholder="abc@gmail.com"
                name="email"
                className={`border p-2 w-full focus:outline-none ${
                  isEmpty["email"] ? "border-red-600" : ""
                } `}
                onChange={handleUser}
              />
              {errors.email.length > 0 && RenderError(errors.email)}
            </div>
          </div>
          <div className="w-1/2">
            <label>Country {Required()}</label>
            <div>
              <select
                name="country"
                className={`border p-2 w-full focus:outline-none ${
                  isEmpty["country"] ? "border-red-600" : ""
                } `}
                onChange={handleUser}
              >
                <option>India</option>
              </select>
              {errors.country.length > 0 && RenderError(errors.country)}
            </div>
          </div>
        </div>
        <div className="inline-flex">
          <div className="w-1/2 mr-2">
            <label>State {Required()}</label>
            <div>
              <select
                name="state"
                className={`border p-2 w-full focus:outline-none ${
                  isEmpty["state"] ? "border-red-600" : ""
                } `}
                onChange={handleUser}
              >
                {states.map((val, idx) => {
                  return <option key={idx}>{val}</option>;
                })}
              </select>
              {errors.state.length > 0 && RenderError(errors.state)}
            </div>
          </div>
          <div className="w-1/2">
            <label>City {Required()}</label>
            <div>
              <select
                name="city"
                className={`border p-2 w-full focus:outline-none ${
                  isEmpty["city"] ? "border-red-600" : ""
                } `}
                onChange={handleUser}
              >
                {cities.map((val, idx) => {
                  return <option key={idx}>{val}</option>;
                })}
              </select>
              {errors.city.length > 0 && RenderError(errors.city)}
            </div>
          </div>
        </div>

        <div className="inline-flex">
          <div className="w-1/2 mr-2">
            <label>Flat No,Plot no</label>
            <div>
              <input
                placeholder="e.g. 10"
                name="houseno"
                className={`border p-2 w-full focus:outline-none ${
                  isEmpty["houseno"] ? "border-red-600" : ""
                } `}
                onChange={handleUser}
              />
              {errors.houseno.length > 0 && RenderError(errors.houseno)}
            </div>
          </div>
          <div className="w-1/2">
            <label>PINCODE {Required()}</label>
            <div>
              <input
                placeholder="e.g. 440027"
                type={"text"}
                maxLength={6}
                name="pincode"
                className={`border p-2 w-full focus:outline-none ${
                  isEmpty["pincode"] ? "border-red-600" : ""
                } `}
                onChange={handleUser}
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*?)\..*/g, "$1")
                    .replace(/^0[^.]/, "0");
                }}
              />
              {errors.pincode.length > 0 && RenderError(errors.pincode)}
            </div>
          </div>
        </div>
        <div>
          <label>Full Address {Required()}</label>
          <div>
            <textarea
              className={`p-2 w-full border resize-none focus:outline-none ${
                isEmpty["address"] ? "border-red-600" : ""
              }`}
              rows={3}
              cols={30}
              placeholder="Address..."
              name="address"
              onChange={handleUser}
            />
            {errors.address.length > 0 && RenderError(errors.address)}
          </div>
        </div>

        <div>
          <div>
            <label>Guardian Name {Required()}</label>
            <div>
              <input
                name="fullname"
                className={`p-2 border w-full focus:outline-none ${
                  isGuardEmpty["fullname"] ? "border-red-600" : ""
                }`}
                placeholder="Full Name"
                onChange={handleGuardian}
              />
              {guardian.errors.fullname.length > 0 &&
                RenderError(guardian.errors.fullname)}
            </div>
          </div>
        </div>
        <div className="mt-4 inline-flex">
          <div className="w-1/2 mr-2">
            <label>Relationship with Guardian {Required()}</label>
            <div>
              <select
                name="relationship"
                className="border p-2 w-full focus:outline-none"
                onChange={handleGuardian}
              >
                {relation.map((val, idx) => {
                  return <option key={idx}>{val}</option>;
                })}
              </select>
              {guardian.errors.relationship.length > 0 &&
                RenderError(guardian.errors.relationship)}
            </div>
          </div>
          <div className="w-1/2">
            <label>Guardian Contact Number</label>
            <div>
              <input
                placeholder="xxxxx-xxxxx"
                className={`p-2 border focus:outline-none w-full ${
                  isGuardEmpty["contactno"] ? "border-red-600" : ""
                }`}
                type={"text"}
                maxLength={12}
                minLength={10}
                name="contactno"
                onChange={handleGuardian}
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*?)\..*/g, "$1")
                    .replace(/^0[^.]/, "0");
                }}
              />
              {guardian.errors.contactno.length > 0 &&
                RenderError(guardian.errors.contactno)}
            </div>
          </div>
        </div>
        <div className="mt-4 inline-flex">
          <div className="w-full">
            <label>User Profile Image {Required()}</label>
            <div>
              <input
                type={"file"}
                className="p-2 border focus:outline-none w-full"
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        <div>
          <input
            type={"checkbox"}
            className="mr-2"
            onChange={() => {setIsSelected(!isSelected)}}
          />
          <span
            className={`capitalize ${
              isSelected ? "text-green-600" : "text-black"
            } duration-300`}
          >
            I accept all details
          </span>
        </div>
        <div className="inline-flex">
          <button className="w-1/2 mr-2 p-2 bg-red-600 text-white text-lg flex items-center justify-center rounded-lg">
            <BiReset className="text-white mr-2" /> Reset
          </button>
          <button
            onClick={handleSave}
            className="w-1/2 p-2 bg-green-600 text-white text-lg flex items-center justify-center rounded-lg"
          >
            <BiSave className="text-white mr-2" />
            {isLoading ? <Spinner /> : null} Save
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
