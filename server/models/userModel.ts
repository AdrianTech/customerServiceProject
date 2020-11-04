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
    default: "",
    trim: true,
  },
  role: {
    type: String,
    required: true,
  },
  loginname: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export default userModel;
