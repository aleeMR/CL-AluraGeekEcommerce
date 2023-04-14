import mongoose from "mongoose";

export const mongodbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connection succesfully!");
  } catch (err) {
    throw new Error("Error al conectarse a la base de datos", err);
  }
};

export const mongodbDisconnection = async () => {
  try {
    await mongoose.disconnect();
    console.log("Database disconnection succesfully!");
  } catch (err) {
    throw new Error("Error al desconectarse de la base de datos", err);
  }
};
