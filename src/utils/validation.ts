export const rules = {
  required: {
    value: true,
    message: "required",
  },
  checkDoubleByteNumbers: (text: string) => {
    const doubleByteNumbers = text.match(/[０-９]/g);
    const isValid = doubleByteNumbers ? false : true;
    if (isValid) return;
    return "checkDoubleByteNumbers";
  },
  validateEmail: (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = Boolean(regex.test(email));
    if (isValid) return;
    return "Email không hợp lệ";
  },
  validatePassword: (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/;
    if (!password) {
      return;
    }
    if (!passwordRegex.test(password)) {
      return "Mật khẩu phải gồm có chữ hoa, chữ thường, chữ số, kí tự đặc biệt và có độ dài từ 8-25 kí tự.";
    }
  },
  validatePasswordConfirm: (passwordConfirm: string, password: string) => {
    console.log(passwordConfirm, password);
    if (passwordConfirm !== password) {
      return "Mật khẩu xác nhận không khớp";
    }
  },
};
