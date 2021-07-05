//# MODELS
import User from "../../models/User";

//# UTILS
import { newAccesToken } from "../../utils/new.token.auth";
import { newHashPassword, newHashCompare } from "../../utils/hash.password";

import { newReadStream } from "../../utils/read.stream";
import { awsUploadImage, awsDeleteImage } from "../../utils/aws.upload";

export default {
  Query: {
    getUsers: async () => {
      try {
        //# GET ALL => USERS
        const users = await User.find({});
        return {
          status: 200,
          data: users,
        };
      } catch (error) {
        //# ERROR INTERNAL SERVER
        return {
          status: 500,
          message: `Error internal from server: ${error}`,
        };
      }
    },
    getUser: async (_, { id }) => {
      try {
        //# GET BYID ONE => USER
        const user = await User.findById(id);
        //# VERIFY IF NOT EXIST => USER
        if (!user) {
          return {
            status: 404,
            message: "No se encontro ningun usuario.",
          };
        }
        return {
          status: 200,
          data: user,
        };
      } catch (error) {
        //# ERROR INTERNAL SERVER
        return {
          status: 500,
          message: `Error internal from server: ${error}`,
        };
      }
    },
    getLogIn: async (_, {}, ctx) => {
      try {
        //# GET LOGIN => USER
        const userAuth = ctx;
        //# VERIFY IF NOT EXIST => USER
        if (!userLogIn) {
          return {
            status: 404,
            message: "No se encontro ningun usuario.",
          };
        }
        return {
          status: 200,
          data: userAuth,
        };
      } catch (error) {
        //# ERROR INTERNAL SERVER
        return {
          status: 500,
          message: `Error internal from server: ${error}`,
        };
      }
    },
  },
  Mutation: {
    newUser: async (_, { input }) => {
      try {
        const { password, photo } = input;
        //# VERIFY IF EXIST => PHOTO
        if (photo) {
          //# CREATE READ STREAM
          const { fileData, imageName } = await newReadStream("users", photo);
          //# UPLOAD IN AWS S3 => PHOTO
          const url = await awsUploadImage(fileData, imageName);
          input.photo = url;
        }
        //# HASHEAR => PASSWORD
        input.password = await newHashPassword(password);
        //# SAVE NEW => USER
        const user = new User(input);
        await user.save();
        return {
          status: 200,
          message: "El nuevo usuario se registra con éxito.",
          data: user,
        };
      } catch (error) {
        //# ERROR INTERNAL SERVER
        return {
          status: 500,
          message: `Error internal from server: ${error}`,
        };
      }
    },
    removeUser: async (_, { id }) => {
      try {
        //# VERIFY IF NOT EXIST => USER
        const verifyUser = await User.findById(id);
        if (!verifyUser) {
          return {
            status: 404,
            message: "No se encontro ningun usuario para eliminar.",
          };
        }
        //# REMOVE => USER
        const user = await User.findByIdAndDelete(id);
        //# REMOVE FROM AWS S3 => PHOTO
        await awsDeleteImage(user.photo);
        return {
          status: 200,
          message: "El usuario eliminado es un éxito.",
          data: user,
        };
      } catch (error) {
        //# ERROR INTERNAL SERVER
        return {
          status: 500,
          message: `Error internal from server: ${error}`,
        };
      }
    },
    updateUser: async (_, { id, input }) => {
      try {
        const { password, photo } = input;
        //# VERIFY IF NOT EXIST => USER
        const verifyUser = await User.findById(id);
        if (!verifyUser)
          return {
            status: 404,
            message: "El usuario a actualizar no existe.",
          };
        //# VERIFY IS EXIST => PHOTO
        if (photo) {
          //# CREATE READ STREAM
          const { fileData, imageName } = await newReadStream("users", photo);
          //# UPLOAD IN AWS S3 => PHOTO
          const url = await awsUploadImage(fileData, imageName);
          input.photo = url;
          //# REMOVE FROM AWS S3 => PHOTO
          await awsDeleteImage(verifyUser.photo);
        }
        //# VERIFY => PASSWORD
        const verifyStatus = await newHashCompare(
          password,
          verifyUser.password
        );
        if (verifyStatus === 200) {
          //# ASING THE DESIGN => PASSWORD
          input.password = verifyUser.password;
        } else {
          //# HASHEAR => PASSWORD
          input.password = await newHashPassword(password);
        }
        //# UPDATE THE => USER
        const user = await User.findByIdAndUpdate(id, input, {
          new: true,
        });
        return {
          status: 200,
          message: "La actualización del usuario es un éxito.",
          date: user,
        };
      } catch (error) {
        //# ERROR INTERNAL SERVER
        return {
          status: 500,
          message: `Error internal from server: ${error}`,
        };
      }
    },
    authUser: async (_, { input }) => {
      try {
        const { email, password } = input;
        //# VERIFY IS NOT EXIST => USER
        const user = await User.findOne({ email });
        if (!user)
          return {
            status: 404,
            message: "El usuario que solicita no existe.",
          };
        //# VERIFY => PASSWORD
        const verifyStatus = await newHashCompare(password, user.password);
        if (verifyStatus === 500)
          return {
            status: 404,
            message: "La contraseña introducida no es válida.",
          };
        //# CREATE THE TOKEN ACCESS FOR 24H
        return {
          status: 200,
          message: `Bienvenido Sr(a) ${user.name} ${user.surname}`,
          token: await newAccesToken(user, "24h"),
        };
      } catch (error) {
        //# ERROR INTERNAL SERVER
        return {
          status: 500,
          message: `Error internal from server: ${error}`,
        };
      }
    },
  },
};
