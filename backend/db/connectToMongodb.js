import mongoose from "mongoose";

const connectToMongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("connected to monogodb");
  } catch (error) {
    console.log("Error connecting with database", error);
  }
};

export default connectToMongodb;
