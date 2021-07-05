//# Dependencys
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//# Connection to mongo DB
export const connect = async () => {
  try {
    const { FAZT_USER, FAZT_PASSWORD, FAZT_CLUSTER, FAZT_DB } = process.env;
    await mongoose.connect(
      `mongodb+srv://${FAZT_USER}:${FAZT_PASSWORD}@${FAZT_CLUSTER}/${FAZT_DB}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    console.log(`🚀 The DB  is connected.`);
  } catch (error) {
    throw new Error(error);
  }
};
