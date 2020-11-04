import * as yup from "yup";

export const validateUpdateServices = (data) => {
  let schema = yup.object().shape({
    name: yup.string(),
    unitPrice: yup.number().positive("Must be at least 1"),
    months: yup
      .number()
      .min(1, "Value must be between 1 and 36")
      .max(36, "Value must be between 1 and 36"),
  });
  return schema.validate(data).catch((e) => e.errors);
};
export const validateUpdateClient = async (data) => {
  let schema = yup.object().shape({
    fullname: yup
      .string("Value must be a string")
      .min(3, "Full name must have at least 3 characters")
      .max(25, "Full name may contain max 25 characters"),
    email: yup
      .string()
      .min(8, "Email must contain at least 8 characters")
      .email("Incorrect email"),
    phone: yup
      .string()
      .min(9, "Incorrect phone number")
      .max(10, "Incorrect phone number"),
  });
  const err = await schema.validate(data).catch((e) => e.errors);
  let status = true;
  if (Array.isArray(err)) status = false;
  return {
    err,
    status,
  };
};
export const validateUpdateUser = async (data) => {
  let schema = yup.object().shape({
    loginname: yup
      .string("Name must be a string")
      .min(3, "Name must have at least 3 characters")
      .max(25, "Name may contain max 25 characters"),
    email: yup
      .string()
      .min(5, "Email must contain at least 5 characters")
      .email("Incorrect email"),
    password: yup
      .string()
      .min(8, "Password must have at least 8 characters")
      .max(25, "Password must not exceed 25 characters"),
  });
  const err = await schema.validate(data).catch((e) => e.errors);
  let status = true;
  if (Array.isArray(err)) status = false;
  return {
    err,
    status,
  };
};
export const userValidation = async (data) => {
  let schema = yup.object().shape({
    loginname: yup
      .string("Name must be a string")
      .min(3, "Name must have at least 3 characters")
      .max(25, "Name may contain max 25 characters")
      .nullable()
      .required("This field is required"),
    email: yup
      .string()
      .min(5, "Email must contain at least 5 characters")
      .email("Incorrect email")
      .required("This field is required"),
    role: yup.string().required(),
  });
  const err = await schema.validate(data, { abortEarly: false }).catch((e) => e.errors);
  let status = true;
  if (Array.isArray(err)) status = false;
  return {
    err,
    status,
  };
};
export const emailValidation = async (email) => {
  let schema = yup.object().shape({
    email: yup
      .string()
      .min(5, "Email must contain at least 5 characters")
      .email("Incorrect email")
      .required("This field is required"),
  });
  const err = await schema.validate(email, { abortEarly: false }).catch((e) => e.errors);
  let status = true;
  if (Array.isArray(err)) status = false;
  return {
    err,
    status,
  };
};
