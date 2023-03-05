import dotenv from "dotenv";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import formBody from "@fastify/formbody";
import staticServe from "@fastify/static";
import querystring from "querystring";
import path from "path";
import UserAPI from "./controllers/UserAPI";
import Middleware from "@fastify/middie";
import { AppDataSource } from "./database";
import { User } from "./entity/User";
dotenv.config();

import Auth from "./controllers/User";
const server = fastify({
  logger: true,
  querystringParser: (str) => querystring.parse(str.toLowerCase()),
});
server.register(formBody);
server.register(cors, {
  origin: "*", // allow requests from any origin
  methods: ["GET", "POST", "PUT", "DELETE"], // allow only these methods
  allowedHeaders: ["Authorization", "Content-Type"], // allow only these headers
  credentials: true, // allow sending cookies from the client
});
server.register(Middleware);
server.register(Auth, { prefix: "/auth" });
server.register(UserAPI, { prefix: "/api" });
server.get("/ping", async (request: FastifyRequest, reply: FastifyReply) => {
  return "pong\n";
});

server.register(staticServe, {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

server.setNotFoundHandler((req, res) => {
  res.sendFile("index.html");
});
AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new user into the database...");
    console.log("Loading users from the database...");
    // const users = await AppDataSource.manager.find(User);
    // console.log("Loaded users: ", users);
    server.listen(
      { port: parseInt(process.env.PORT || "8080") },
      (err, address) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        console.log(`Server listening at ${address}`);
      }
    );
  })
  .catch((error) => console.log(error, "test"));
