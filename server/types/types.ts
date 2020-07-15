import mongoose from "mongoose";
export type IServices = {
  name: String;
  months: any;
  startTime: String;
  finishTime: string;
  active: Boolean;
  extendTimes: Number;
  createdDate?: string;
  closed?: string;
  _id: any;
  __v?: any;
};
export type INotes = {
  date: string;
  body: string;
};
export interface IClient extends mongoose.Document {
  fullname: string;
  email: string;
  typeOfService: Array<IServices>;
  notes: Array<INotes>;
  servicesHistory?: Array<IServices>;
}

export interface IUser extends mongoose.Document {
  password: string;
  email: string;
}
export type ICompanyServices = {
  name: string;
  createdDate: string;
  unitPrice: number;
  __v: number;
};
