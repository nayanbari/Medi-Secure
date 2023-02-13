import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionurl = 'mongodb+srv://nayan:nayan@cluster0.l03qppq.mongodb.net/?retryWrites=true&w=majority';

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
