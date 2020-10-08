import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userModel = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: String,
  loginname: {
    type: String,
    required: true,
  },
});

export default userModel;
