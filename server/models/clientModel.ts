import mongoose from "mongoose";
import { IClient } from "../types/types";
const Schema = mongoose.Schema;
const ArrayClientSubSchema = new Schema({
  name: String,
  startTime: String,
  finishTime: String,
  months: Number,
  active: Boolean,
  extendTimes: {
    type: Number,
    default: 0
  }
});
const NotesClientSubSchema = new Schema({
  date: String,
  body: {
    type: String
  }
});

const ClientSchema = new Schema<IClient>({
  fullname: {
    type: String,
    required: true
  },
  email: String,
  typeOfService: [ArrayClientSubSchema],
  notes: [NotesClientSubSchema]
});

export default ClientSchema;
