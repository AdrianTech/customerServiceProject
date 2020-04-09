const emailValid = /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/;
export const validationLogin = data => {
  let validInfo = {
    bool: true,
    msg: "Ok"
  };
  const { email, password } = data;
  if (!email.match(emailValid)) {
    return (validInfo = {
      bool: false,
      msg: "Invalid email. Please, enter correct email"
    });
  }
  if (password.length < 8) {
    return (validInfo = {
      bool: false,
      msg: "Your password must have at least 8 characters"
    });
  }
  return validInfo;
};

export const createNewServiceValid = data => {
  let validInfo = {
    bool: true,
    msg: "Ok"
  };
  const { name, unitPrice } = data;
  if (name === "" || name.length < 3)
    return (validInfo = {
      bool: false,
      msg: "Name of service must contains at least 3 characters"
    });
  if (unitPrice === "" || unitPrice < 0)
    return (validInfo = {
      bool: false,
      msg: "Wrong type of value. Please, enter correct value"
    });
  return validInfo;
};
