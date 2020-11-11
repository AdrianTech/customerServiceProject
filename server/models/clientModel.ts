import mongoose from "mongoose";
import { IClient, INotes } from "../types/types";
const Schema = mongoose.Schema;
const ArrayClientSubSchema = new Schema({
  name: String,
  startTime: String,
  finishTime: String,
  totalPrice: Number,
  months: Number,
  active: Boolean,
  unitPrice: Number,
  extendTimes: {
    type: Number,
    default: 0,
  },
  closed: String,
});
const NotesClientSubSchema = new Schema<INotes>({
  date: String,
  body: {
    type: String,
  },
});

const ClientSchema = new Schema<IClient>({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  registerDate: {
    type: String,
    trim: true,
  },
  allMonths: {
    type: Number,
    default: 0,
  },
  totalIncome: {
    type: Number,
    default: 0,
  },
  typeOfService: [ArrayClientSubSchema],
  notes: [NotesClientSubSchema],
  servicesHistory: [ArrayClientSubSchema],
});

const ClientModel = mongoose.model("clients", ClientSchema);
export default ClientModel;
