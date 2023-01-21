import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionurl = process.env.mongodburl;

export const connectdb = async () => {
  try {
    mongoose.connect(connectionurl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
        console.log(`Application is connected to Database 😃`);
    })
  } catch (error) {
    console.log(error);
  }
};
