import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
 const salt = await bcrypt.genSalt(10);
 if (salt) {
  const pass = await bcrypt.hash(password, salt);
  return pass;
 } else {
  return null;
 }
};

export const matchPassword = async (enteredPassword, password) => {
 return await bcrypt.compare(enteredPassword, password);
};
