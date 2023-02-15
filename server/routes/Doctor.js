import express from "express";
import { createDoctor, getDoctor, loginDoctor, updateDoctor, VerifyLogin, docEventDetails } from "../controller/Doctor.js";

const router = express.Router();

/*
Route : `/doctor`
Method : POST -> Store Doctor
         GET  -> Retrive all doctor objects from DB
@Private
*/

router.route("/").get(getDoctor).post(createDoctor);

/* 
Route : `/doctor/update/:id`
Method : POST -> Update Doctor Details
@Private
*/

router.route("/update").post(updateDoctor);

/* 
Route : `/doctor/login`
Method : POST -> Login using Doctor Details
@Private
*/

router.route("/login").post(loginDoctor);
router.route("/verifyDoctor").post(VerifyLogin);

export default router;

