import mongoose from "mongoose";
import { IClient, INotes } from "../types/types";
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
  },
  closed: String
});
const NotesClientSubSchema = new Schema<INotes>({
  date: String,
  body: {
    type: String
  }
});

const ClientSchema = new Schema<IClient>({
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  registerDate: {
    type: String,
    trim: true
  },
  typeOfService: [ArrayClientSubSchema],
  notes: [NotesClientSubSchema],
  servicesHistory: [ArrayClientSubSchema]
});

const ClientModel = mongoose.model("clients", ClientSchema);
export default ClientModel;
