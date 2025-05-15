require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const connectDB = require("./database/db");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolver");
const cors = require("cors");

async function startServer() {
  await connectDB();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.PRODUCTION_FRONTEND_URL,
  ];

  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT },
    cors: {
      origin: allowedOrigins,
    },
  });

  console.log(`Server ready at: ${url}`);
}

startServer();