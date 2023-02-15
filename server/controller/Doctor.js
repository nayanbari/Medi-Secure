import asyncHandler from "express-async-handler";
import Doctor from "../models/Doctor.js";
import { sendMail } from "../services/MAIL.js";
import { genrateOTP } from "../services/OTP.js";
import { genrateToken } from "../utils/token.js";

export const createDoctor = asyncHandler(async (req, res) => {
  const {
    fullname,
    qualification,
    registrationNo,
    contactNo,
    email,
    certificate,
    accountHash,
  } = req.body;
  if (!req.body) {
    res.status(500);
    throw new Error("Data not recieved");
  }

  const doctorExist = await Doctor.findOne({ registrationNo });

  if (doctorExist) {
    res.status(400);
    throw new Error(
      "Doctor Id is already present on these Registration Number"
    );
  }

  const doctor = Doctor.create({
    fullname,
    registrationNo,
    qualification,
    contactNo,
    email,
    certificate,
    accountHash,
  });

  if (doctor) {
    res.status(200).json({
      id: doctor._id,
      fullname,
      qualification,
      contactNo,
      email,
      certificate,
      accountHash,
      registrationNo,
      docEvents: [],
    token: genrateToken(doctor._id),
    });
  } else {
    res.status(400);
    throw new Error("Server Side Error occured");
  }
});

export const getDoctor = asyncHandler(async (req, res) => {
  const Doctors = await Doctor.find();

  if (Doctors) {
    res.status(200).json(Doctors);
  } else {
    res.status(400);
    throw new Error("Doctor array is empty");
  }
});

export const updateDoctor = asyncHandler(async (req, res) => {
  const {
    fullname,
    email,
    qualification,
    registrationNo,
    contactNo,
    accountHash,
    docEvents
  } = req.body;

  Doctor.findOne({ email }, (err, doc) => {
    if (doc) {
      doc.fullname = fullname;
      doc.qualification = qualification;
      doc.registrationNo = registrationNo;
      doc.contactNo = contactNo;
      doc.accountHash = accountHash;
      doc.docEvents = docEvents;

      doc
        .save()
        .then(() => {
          res.status(200).json(doc);
        })
        .catch((err) => {
          res.status(500);
          throw new Error("Server-Side error occured");
        });
    }
    if (err) {
      res.status(500);
      throw new Error(err);
    }
  });
});

export const loginDoctor = asyncHandler(async (req, res) => {
  const { reqField } = req.body;

  const doctorExist = await Doctor.findOne({
    $or: [{ email: reqField }, { registrationNo: reqField }],
  });

  const email = doctorExist.email;

  if (doctorExist) {
    try {
      const otp = genrateOTP();
      sendMail({
        to: email,
        OTP: otp,
      });

      doctorExist.otp = otp;

      doctorExist
        .save()
        .then(() => {
          res.status(200).json({msg:"OTP is successfully send on email",email});
        })
        .catch((error) => {
          res.status(400).json("Server-side error");
        });
    } catch (error) {
      res.status(400);
      throw new Error("Server is unable to send OTP");
    }
  } else {
    res.status(400);
    throw new Error("No such doctor found in database");
  }
});

export const VerifyLogin = asyncHandler(async (req, res) => {
  const { email,otp } = req.body;

  if (!email || !otp) {
    res.status(400);
    throw new Error("Data not recieved");
  }

  const doctor = await Doctor.findOne({email});

  if(doctor && doctor.otp === otp){
    res.status(200).json({msg:"Email is verified successfully",doctor});
  }else if(!doctor){
    res.status(400);
    throw new Error("No doctor ID available on these email");
  }else{
    res.status(400);
    throw new Error("Invalid OTP entered");
  }
});

export const docEventDetails = asyncHandler(async (req, res) => {
  let id = req.params.id;
  console.log(id)
  if (!req.body) {
    res.status(400);
    throw new Error("Query Data is not reached");
  }

  const {
    eventsArray
  } = req.body;

  const docExists = await Doctor.findOne({ _id: id });

  if (docExists) {
    docExists.docEvents.push(req.body);

    docExists
      .save()
      .then(() => {
        res.status(200).json(docExists);
      })
      .catch((error) => {
        res.status(400);
        throw new Error(`Error ${error}`);
      });
  } else {
    res.status(400);
    throw new Error(`No user found by ID - ${id}`);
  }
});

// export const getMedicalRecord = asyncHandler(async (req, res) => {
//   let id = req.params.id;

//   const userExists = await User.findOne({ _id: id });

//   if (userExists) {
//     res.status(200).json(userExists.MedicalDetails);
//   } else {
//     res.status(400);
//     throw new Error("Server side error");
//   }
// });

