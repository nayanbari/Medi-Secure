import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  middlename: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  aadharno: {
    type: String,
    required: true,
    unique: true,
  },
  contactno: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dateofbirth: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
  guardian: {
    type: Object,
  },
  profile: {
    type: String,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  accountHash: {
    type: String,
    required: true,
  },
  otp:{
    type:String
  },
  MedicalDetails:{
    type:Array
  }
});

export default new mongoose.model("UserSchema", UserSchema);
