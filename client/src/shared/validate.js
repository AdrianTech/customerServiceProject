import * as yup from "yup";

export const validateUpdateServices = data => {
  let schema = yup.object().shape({
    name: yup.string(),
    unitPrice: yup.number().positive("Must be at least 1"),
    months: yup
      .number()
      .min(1, "Value must be between 1 and 36")
      .max(36, "Value must be between 1 and 36")
  });
  return schema.validate(data).catch(e => e.errors);
};
export const validateUpdateClient = async data => {
  console.log(data);
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
      .max(10, "Incorrect phone number")
  });
  const err = await schema.validate(data).catch(e => e.errors);
  let status = true;
  if (Array.isArray(err)) status = false;
  return {
    err,
    status
  };
};
