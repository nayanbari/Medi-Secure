import mongoose from "mongoose";


const DoctorSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    registrationNo:{
        type:String,
        required:true
    },
    contactNo:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    certificate:{
        type:String,
        required:true
    },
    docEvents:{
        type:Array,
    },
    accountHash:{
        type:String,
        required:true
    },
    otp:{
        type:String
    }
});

export default new mongoose.model("Doctor",DoctorSchema);