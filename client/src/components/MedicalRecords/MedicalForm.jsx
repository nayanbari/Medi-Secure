import axios from "axios";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { BiAddToQueue } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { DoctorProfile } from "../../api/api";
import { bloodGroups, medicines, diseases } from "../../api/list";
import Spinner from "../../utils/Spinner";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'


const MedicalForm = () => {
  const location = useLocation();

  const path = location.pathname.split("/")[2];
  let diseasesArr = [];

  for (let i = 0; i < diseases.length; i++) {
    diseasesArr.push({
      disease: diseases[i],
    });
  }
  const [ubloodGroup, setUBloodGroup] = useState(bloodGroups[0]);
  const [medicin, setMedicin] = useState(medicines[0].name);
  const [udisease, setUdisease] = useState(diseasesArr);
  const [medication, setMedication] = useState([{ name: "", dose: "" }]);
  const [operationDetails, setOperationDetails] = useState("");
  const [medicalReport, setMedicalReport] = useState();
  const [specailCare, setSpecialCare] = useState("");
  let date = new Date();
  
  const [loading, setLoading] = useState(false);

  const [isListening, setIsListening] = useState(false)

  const [note, setNote] = useState(null)

  const [savedNotes, setSavedNotes] = useState([])

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    console.log('Saved notes' ,note)
    setSpecialCare([...savedNotes, note].join('\n'))
    setNote('')
  }

  const handleFiles = (post) => {
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

    if (post.type === "application/pdf") {
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
          setMedicalReport(data.url.toString());
          setLoading(false);
        });
    } else {
      Swal.fire({
        title: "Document not found",
        icon: "warning",
        text: "Please Select an document!",
      });
      setLoading(false);
      return;
    }
  };

  const handleChangeMed = (e, id) => {
    const { name, value } = e.target;
    let arr = [...medication];

    arr[id][name] = value;
    setMedication(arr);
  };

  const handleAddMeddication = () => {
    setMedication([...medication, { name: "", dose: "" }]);
  };

  const handleDelete = (index) => {
    let med = [...medication];
    med.splice(index, 1);
    setMedication(med);
  };

  const handleDisease = (e, id) => {
    let arr = [...udisease];
    console.log(e.target.name);
    arr[id][e.target.name] = e.target.value;
    setUdisease(arr);
  };

  const publishRec = async (e) => {
    e.preventDefault();
    if (ubloodGroup === bloodGroups[0]) {
      Swal.fire({
        title: "Empty Blood Group",
        text: "Please Select a blood group",
        icon: "error",
      });
    } else {
      try {
        const postData = {
          bloodGroup: ubloodGroup,
          diseases: udisease,
          medication,
          operationDetails,
          medicalReport,
          specailCare,
          date
        };

        const reqData = {
          doctorhash: DoctorProfile.accountHash,
          doctorName: DoctorProfile.fullname,
          medicalData: postData,
        };

        const data = await axios.post(`http://localhost:6969/user/medicalDetails/${path}`, reqData);

        if(data.data._id){
          Swal.fire({
            title:"Data Published",
            text:"Medical data is updated",
            icon:"success"
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Server-Side Error",
          text: error.message,
          icon: "error",
        });
      }
    }
  };

  return (
    <section className="m-8 border border-zinc-400 p-4 overflow-y-scroll h-full">
      <div className="text-xl uppercase font-bold">Medical Details Form</div>
      <div className="my-4 text-lg">
      
        <label className="font-semibold">Blood Group: </label>
        <select
          className="my-2 p-2 border w-full focus:outline-none"
          onChange={(e) => setUBloodGroup(e.target.value)}
        >
          {bloodGroups.map((_val, _id) => {
            return <option key={_id}>{_val}</option>;
          })}
        </select>
      </div>
      <div className="text-lg">
        <div className="flex items-center justify-between">
          <label className="font-semibold">Medication: </label>
          <BiAddToQueue
            onClick={handleAddMeddication}
            className="mr-2 border rounded-full p-2 text-4xl text-green-600"
          />
        </div>
        {medication.map((_val, _id) => {
          return (
            <div className="my-2 flex items-center justify-between">
              {/* <input
                placeholder="Name"
                className="border w-2/5 p-2 mr-2 focus:outline-none"
                name="name"
                onChange={(e) => handleChangeMed(e, _id)}
              /> */}
              <select
              placeholder="Name"
              name="name"
                className="my-2 p-2 border w-full focus:outline-none"
                onChange={(e) => handleChangeMed(e, _id)}
              >
                {medicines.map((_val, _id) => {
                  return <option key={_id}>{_val.name}</option>;
                })}
              </select>
              <input
                placeholder="Dose"
                className="border w-2/5 p-2 ml-2 focus:outline-none"
                name="dose"
                onChange={(e) => handleChangeMed(e, _id)}
              />
              <div className="w-1/5 flex items-center justify-center">
                <FiDelete
                  className="text-2xl text-red-600"
                  onClick={() => handleDelete(_id)}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="my-6 w-full">
        <label className="text-lg font-semibold">Diseases: </label>
        {diseases.map((_val, _id) => {
          return (
            <div className="my-2 flex items-center w-full">
              <li className="py-1 w-1/2 mr-4">{_val}</li>
              <div className="flex w-1/2">
                <div className="flex items-center w-1/3">
                  <input
                    type={"radio"}
                    className="mr-2  cursor-pointer"
                    value={true}
                    name={`status${_id}`}
                    onChange={(e) => handleDisease(e, _id)}
                  />
                  <label className="hover:text-green-600 duration-200 cursor-pointer">
                    YES
                  </label>
                </div>
                <div className="flex items-center w-1/3">
                  <input
                    type={"radio"}
                    className="mr-2 cursor-pointer"
                    name={`status${_id}`}
                    value={false}
                    onChange={(e) => handleDisease(e, _id)}
                  />
                  <label className="hover:text-red-600 duration-200 cursor-pointer">
                    NO
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="my-4">
        <label className="font-semibold text-lg">
          Previous Operation Details:{" "}
        </label>
        <div>
          <textarea
            className="resize-none border my-2 w-full focus:outline-none px-1 py-2"
            placeholder="Details of past operations with medications...."
            rows={5}
            cols={30}
            onChange={(e) => setOperationDetails(e.target.value)}
          />
        </div>
      </div>
      <div className="my-4">
        <label className="text-lg font-semibold flex justify-between">
          Medical Reports:
          <span className="text-red-600 text-sm">
            *(max 3 reports (*pdf) at a time -- max size 1MB)
          </span>
        </label>
        <div>
          <input
            type={"file"}
            className="border p-2 w-full"
            onChange={(e) => handleFiles(e.target.files[0])}
          />
        </div>
      </div>
      <div className="my-4">
        <label className="text-lg font-semibold flex justify-between">
          Record your audio:
          {isListening ? <span className="text-green-600 text-sm">listening</span> : <span className="text-red-600 text-sm">not listening</span>}
        </label>
        <div>
          <button onClick={handleSaveNote} disabled={!note}  className="border p-2 w-1/2">
            Save
          </button>  
          <button onClick={() => setIsListening(prevState => !prevState)} className="border p-2 w-1/2">
            Start/Stop
          </button>
          <p>{note}</p>
        </div>
        <div>
          <label className="text-lg font-semibold flex justify-between">
            Notes
          </label>
          <p>{specailCare}</p>
          {/* {savedNotes.map(n => (
            <p key={n}>{n}</p>
          ))} */}
        </div>
      </div>
      <div className="my-4">
        <label className="text-lg font-semibold">Special Care:</label>
        <textarea
          className="border w-full px-1 py-2 resize-none focus:outline-none"
          cols={30}
          rows={5}
          placeholder="Important points regarding medical treatment....."
          value={specailCare}
          onChange={(e) => {setSpecialCare(e.target.value)}}
        />
      </div>
      <div>
        <button
          className="border w-full p-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700 duration-200"
          onClick={publishRec}
        >
        {loading ? <Spinner /> :"Publish Records"}
        </button>
      </div>
    </section>
  );
};

export default MedicalForm;
