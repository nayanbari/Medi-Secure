import express from "express";
import {
  createUser,
  DeleteUser,
  fetchSingleUser,
  getMedicalRecord,
  medicalDetails,
  QuerySearch,
  SendOTP,
  VerifyEmail,
} from "../controller/User.js";

const router = express.Router();

/* 
Route : "/"
Method: @POST (@Create User)
        @GET (@Retrive User)
*/
router.route("/").post(createUser).get(QuerySearch);

/* 
Route : "/sendOTP"
Method: @POST (@Send OTP to User Email)
*/
router.route("/sendOTP").post(SendOTP);

/* 
Route : "/verifyEmail"
Method: @POST (@Verify User Email through OTP)
*/
router.route("/verifyEmail").post(VerifyEmail);

/* 
Route : "/delete/:id"
Method: @GET (@Delete User)
*/

router.route("/delete/:id").get(DeleteUser);

/* 
Route : "/:id"
Method: @GET (@Single User from DB)
*/
router.route("/:id").get(fetchSingleUser);

/* 
Route : "/medicalDetails/:id"
Method: @POST (@Single User Medical Details)
*/
router.route("/medicalDetails/:id").post(medicalDetails);

/* 
Route : "/medicalRecords/:id"
Method: @POST (@Single User Medical Details)
*/
router.route("/medicalRecords/:id").get(getMedicalRecord);

export default router;
