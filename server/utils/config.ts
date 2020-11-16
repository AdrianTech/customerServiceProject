export type IRanges = {
  last_14days: number;
  last_7days: number;
  last_day: number;
};

export const cookieOptions = {
  maxAge: 1000 * 60 * 60 * 5,
  sameSite: true,
  // secure: true,
  // httpOnly: true,
  // domain: "test.adriantech.eu",
};
export const ranges: IRanges = {
  last_day: 1,
  last_7days: 7,
  last_14days: 17,
};
