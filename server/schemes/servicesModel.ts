import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { ICompanyServices } from "../types/types";

export const Services = new Schema<ICompanyServices>({
  name: String,
  createdDate: String,
  unitPrice: Number,
  months: {
    type: Number,
    default: 0,
  },
  active: {
    type: Boolean,
    default: false,
  },
});
export const ServicesModel = mongoose.model("services", Services);
