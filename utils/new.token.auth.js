//# DEPENDENCYS
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//# ENVIROMENTS
const { FAZT_SECRED_KEY } = process.env;

//# METHOD
export const newAccesToken = async (user, expiresIn) => {
  const { id, name, surname, email, photo } = user;
  return jwt.sign({ id, name, surname, email, photo }, FAZT_SECRED_KEY, {
    expiresIn,
  });
};
