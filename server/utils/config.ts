import dotenv from "dotenv";
dotenv.config();
export type IRanges = {
  last_14days: number;
  last_7days: number;
  last_day: number;
};

export const cookieOptionsDev = {
  maxAge: 1000 * 60 * 60 * 2,
  sameSite: true,
  httpOnly: true,
};
export const cookieOptionsProd = {
  maxAge: 1000 * 60 * 60 * 2,
  sameSite: true,
  secure: true,
  httpOnly: true,
  domain: "service.adriantech.eu",
};
export const ranges: IRanges = {
  last_day: 1,
  last_7days: 7,
  last_14days: 17,
};
