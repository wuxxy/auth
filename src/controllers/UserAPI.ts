import rateLimit from "@fastify/rate-limit";
import { DoneFuncWithErrOrRes, FastifyInstance } from "fastify";
import RegisterController from "./Register.controller";
import Token from "../utils/Token";
import err from "../utils/err";
import { SessionDB, IntegrationsDB, UserDB, AppDataSource } from "../database";
import { MoreThan } from "typeorm";
import isAuthorized from "./Authorizer.md";
import { Integrations } from "../entity/Integrations";
import { User } from "../entity/User";

export default (fastify: FastifyInstance, opts, done: DoneFuncWithErrOrRes) => {
  fastify.register(rateLimit, {
    max: 50,
    timeWindow: "1 minute",
  });
  fastify.use(isAuthorized); // This endpoint is only for authorized indivisuals
  fastify.get("/@me", async (req, res) => {
    res.send(req.raw["user"]);
  });
  fastify.post("/logout", async (req, res) => {
    try {
      await SessionDB.delete({ id: req.raw["session"] });
      res.send({
        message: "Successfully logged out",
        code: 6008,
      });
    } catch (error) {
      err("Failed to logout", res);
    }
  });
  fastify.post("/logoutall", async (req, res) => {
    try {
      if (await SessionDB.findOne({ where: { id: req.raw["session"] } })) {
        await SessionDB.delete({ userId: req.raw["user"].id });
        return res.send({
          message: "Successfully logged out from all sessions",
          code: 6008,
        });
      }
      return err("Invalid Session", res);
    } catch (error) {
      return err("Failed to logout from all sessions", res);
    }
  });
  fastify.post("/connect", async (req, res) => {
    const ints = await IntegrationsDB.findOne({
      where: { id: req.body["int"] },
    });
    if (ints) {
      const user = await UserDB.findOne({
        where: { id: req.raw["user"].id },
        relations: {
          integrations: true,
        },
      });
      user.integrations.push(ints);
      await UserDB.save(user);
      res.send(user.integrations);
    }
  });
  // fastify.post("/")
  fastify.post("/disconnect", async (req, res) => {
    const ints = await IntegrationsDB.findOne({
      where: { id: req.body["int"] },
    });
    if (ints) {
      console.log("test \n\n");

      await AppDataSource.createQueryBuilder()
        .relation(User, "integrations")
        .of(req.raw["user"].id)
        .remove(ints);
      const user = await UserDB.findOne({
        where: { id: req.raw["user"].id },
        relations: {
          integrations: true,
        },
      });
      await UserDB.save(user);
      res.send(user.integrations);
    }
  });
  done();
};
