const emailValid = /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/;
const phoneValid = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s/0-9]*$/g;
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
export const createNewUserValid = ({ fullname, phone, email, clientArr }) => {
  let validInfo = {
    bool: true,
    msg: "Ok"
  };
  const test = clientArr.filter(elem => elem.active && elem.months === 0);
  if (test.length > 0) {
    return (validInfo = {
      bool: false,
      msg: "You're checked option, but don't add a value"
    });
  }
  if (!email.match(emailValid)) {
    return (validInfo = {
      bool: false,
      msg: "Invalid email. Please, enter correct email"
    });
  }
  if (!phone.match(phoneValid)) {
    fullname;
    return (validInfo = {
      bool: false,
      msg: "Ivalid phone number"
    });
  }
  return validInfo;
};
