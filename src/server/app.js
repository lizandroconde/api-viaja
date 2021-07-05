//# Dependencys
import { ApolloServer } from "apollo-server";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//# Connection to database
import { connect } from "../db";
connect();

//# TypesDefs & Resolvers from GraphQL
import { resolvers, typeDefs } from "../gql";

//# Server instance & Set the port
export const PORT = process.env.PORT || 3200;
export const Server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, connection }) => {},
  subscriptions: {
    onConnect: (connectionParams, _, __) => {
      //# Connect to WS subscriptions
      console.log("Connected!");
      console.log("se esta ejecutando wss:", connectionParams.authorization);
      const { FAZT_SECRED_KEY } = process.env;
      const token = connectionParams.authorization;
      const newToken = token.replace("Bearer ", "");
      if (newToken) {
        try {
          const res = jwt.verify(newToken, FAZT_SECRED_KEY);
          return res;
        } catch (error) {
          throw new Error(error);
        }
      }
    },
    onDisconnect: (_, __) => {
      //# Disconnect to WS subscriptions
      console.log("Disconnected!");
    },
  },
});
