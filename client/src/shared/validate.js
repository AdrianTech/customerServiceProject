import * as yup from "yup";

export const validateUpdateServices = data => {
  console.log(data);
  let schema = yup.object().shape({
    name: yup.string().notRequired(),
    unitPrice: yup.number().positive("Must be at least 1"),
    months: yup
      .number()
      .min(1, "Value must be between 1 and 36")
      .max(36, "Value must be between 1 and 36")
    // .test("check number", "Value must be between 1 and 36", val => {
    //   console.log(val);
    //   if (val !== undefined) return parseInt(val) > 0 && parseInt(val) < 37;
    // })
  });
  return schema.validate(data).catch(e => e.errors);
};
