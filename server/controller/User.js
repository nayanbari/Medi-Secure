import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import { sendMail } from "../services/MAIL.js";
import { genrateOTP } from "../services/OTP.js";
import { genrateToken } from "../utils/token.js";

/* 
@Description: Creation of User 
@Route: POST /user/
*/

export const createUser = asyncHandler(async (req, res) => {
  const {
    firstname,
    middlename,
    lastname,
    aadharno,
    contactno,
    gender,
    dateofbirth,
    email,
    address,
    guardian,
    profile,
    accountHash,
  } = req.body;

  if (!req.body) {
    res.status(400);
    throw new Error("Invalid Query is passed");
  }

  const userExists = await User.findOne({ aadharno });

  if (userExists) {
    res.status(400);
    throw new Error("User Already available on these AADHAR Number");
  }

  const user = await User.create({
    firstname,
    middlename,
    lastname,
    aadharno,
    contactno,
    gender,
    dateofbirth,
    email,
    address,
    guardian,
    profile,
    accountHash,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      firstname,
      middlename,
      lastname,
      aadharno,
      contactno,
      gender,
      dateofbirth,
      email,
      address,
      guardian,
      profile,
      accountHash,
      token: genrateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

export const SendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const otp = genrateOTP();
    try {
      sendMail({
        to: email,
        OTP: otp,
      });

      user.otp = otp;

      user
        .save()
        .then(() => {
          res.status(200).json("OTP is Send on Email");
        })
        .catch((err) => {
          res.status(400).json(`Server Side Error Occur: ${err}`);
        });
    } catch (error) {
      res.json(400).json(`Server Side Error Occured ${error}`);
    }
  }
});

export const VerifyEmail = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (user && user.otp === otp) {
    res.status(200).json({msg:"Email Verified Successfully",user});
  } else if (!user) {
    res.status(400);
    throw new Error("User not found on these email");
  } else {
    res.status(400);
    throw new Error("Invalid OTP is entered");
  }
});

export const DeleteUser = asyncHandler(async (req, res) => {
  let _id = req.params.id;

  User.findByIdAndRemove(_id, (err, user) => {
    if (err) res.status(400).json(err);
    else res.status(200).json("User Deleted Sucessfully");
  });
});

export const QuerySearch = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { firstname: { $regex: req.query.search, $options: "i" } },
          { middlename: { $regex: req.query.search, $options: "i" } },
          { lastname: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
          { aadharno: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword);

  if (users) res.status(200).json(users);
  else {
    res.status(400);
    throw new Error("Invalid Queries");
  }
});

export const fetchSingleUser = asyncHandler(async (req, res) => {
  let id = req.params.id;

  const user = await User.findOne({ _id: id });

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("Invaild Query ID is passed");
  }
});

export const medicalDetails = asyncHandler(async (req, res) => {
  let id = req.params.id;

  if (!req.body) {
    res.status(400);
    throw new Error("Query Data is not reached");
  }

  const {
    bloodGroup,
    diseases,
    medication,
    operationDetails,
    medicalReports,
    specialCare,
    date
  } = req.body;

  const userExists = await User.findOne({ _id: id });

  if (userExists) {
    userExists.MedicalDetails.push(req.body);

    userExists
      .save()
      .then(() => {
        res.status(200).json(userExists);
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

export const getMedicalRecord = asyncHandler(async (req, res) => {
  let id = req.params.id;

  const userExists = await User.findOne({ _id: id });

  if (userExists) {
    res.status(200).json(userExists.MedicalDetails);
  } else {
    res.status(400);
    throw new Error("Server side error");
  }
});
