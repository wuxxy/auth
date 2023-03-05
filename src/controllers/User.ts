import rateLimit from "@fastify/rate-limit";
import { DoneFuncWithErrOrRes, FastifyInstance } from "fastify";
import RegisterController from "./Register.controller";
import Token from "../utils/Token";
import err from "../utils/err";
import LoginController from "./Login.controller";
import { RefreshController } from "./Util.Controller";

export default (fastify: FastifyInstance, opts, done: DoneFuncWithErrOrRes) => {
  fastify.register(rateLimit, {
    max: 15,
    timeWindow: "1 minute",
  });
  fastify.post("/register", RegisterController);
  fastify.post("/login", LoginController);
  fastify.post("/refresh", RefreshController);
  fastify.delete("/delete", (req, res) => {
    res.send("test");
  });
  fastify.post("/forgot", (req, res) => {
    res.send("test");
  });
  fastify.delete("/logout", (req, res) => {
    res.send("test");
  });
  fastify.get("/@me", async (req, res) => {
    const user = new Token(req.headers.authorization.split(" ")[1]);
    res.send(await user.getUser());
  });

  done();
};
