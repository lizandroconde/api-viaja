//# Dependencys
import { Server, PORT } from "./app";

// //# Running server
const Main = async () => {
  try {
    const { url, subscriptionsUrl } = await Server.listen({ port: PORT });
    console.log(`🚀 Server running in ${url}`);
    console.log(`🚀 Web Socket running in ${subscriptionsUrl}`);
  } catch (error) {
    throw new Error(error);
  }
};
Main();

//importando
