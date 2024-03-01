import mongoose from "mongoose";

//creating schema
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  profilepic: {
    type: String,
    default: "",
  },
  //createAt,updatedAt
},{timestamps:true});

//creating model
const User = mongoose.model("User", userSchema);
export default User;
