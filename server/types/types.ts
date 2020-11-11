import mongoose from "mongoose";
export type IServices = {
  name: string;
  months: any;
  startTime: string;
  finishTime: string;
  active: Boolean;
  totalPrice: number;
  extendTimes: number;
  unitPrice: number;
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
  allMonths: number;
  totalIncome: number;
  servicesHistory?: Array<IServices>;
}

export interface IUser extends mongoose.Document {
  password: string;
  email: string;
  role: string;
  loginname: string;
  isActive: boolean;
}
export type ICompanyServices = {
  name: string;
  createdDate: string;
  unitPrice: number;
  __v: number;
};
