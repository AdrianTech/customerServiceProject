import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userModel = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
});

export default userModel;
