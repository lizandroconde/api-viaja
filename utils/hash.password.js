//# DEPENDENCYS
import bcryptjs from "bcryptjs";

//# METHOD
export const newHashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  const newHash = await bcryptjs.hash(password, salt);
  return newHash;
};

export const newHashCompare = async (sendPassword, password) => {
  const verifyHash = await bcryptjs.compare(sendPassword, password);
  if (verifyHash) {
    return 200;
  } else {
    return 500;
  }
};
