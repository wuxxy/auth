import rateLimit from "@fastify/rate-limit";
import { DoneFuncWithErrOrRes, FastifyInstance } from "fastify";
import err from "../utils/err";
import { RegisterBody } from "../interfaces/Auth";
import testAlphaNumeric from "../utils/testAlphaNumeric";
import checkPassword from "../utils/checkPassword";
import validateEmail from "../utils/validateEmail";
import { AppDataSource } from "../database";
import { User } from "../entity/User";
import { hashPassword } from "../utils/PasswordManager";
import createDiscriminator from "../utils/createDiscriminator";
export default (fastify: FastifyInstance, opts, done: DoneFuncWithErrOrRes) => {
  fastify.register(rateLimit, {
    max: 5,
    timeWindow: "1 minute",
  });
  fastify.post("/register", async (req: RegisterBody, res) => {
    const { username, password, email } = req.body;
    if (username == null || password == null || email == null)
      return err("Missing inputs", res);
    if (testAlphaNumeric(username))
      return err("Username contains non-alphanumeric charcters", res);
    if (!validateEmail(email)) return err("Broken Email", res);
    let passwordStrength = checkPassword(password);
    if (passwordStrength == 0)
      return err(
        "Password contains a space, or is less than 8 characters long, or is more than 32 characters long",
        res
      );
    if (passwordStrength < 3) return err("Password is not strong enough", res);
    const checkEmailExists = await AppDataSource.manager.findOne(User, {
      where: { email },
    });
    if (checkEmailExists) return err("Email already exists", res);
    try {
      const user = new User();
      user.email = email;
      user.username = username;
      user.password = await hashPassword(password);
      user.discriminator = await createDiscriminator(password);
      await AppDataSource.manager.save(user);
      res.send({
        message: "User has been created.",
      });
    } catch (error) {
      err(`An error occured while saving to database ${error}`, res);
    }
  });
  fastify.post("/login", (req, res) => {
    res.send("test");
  });
  fastify.delete("/delete", (req, res) => {
    res.send("test");
  });
  fastify.post("/forgot", (req, res) => {
    res.send("test");
  });
  fastify.delete("/logout", (req, res) => {
    res.send("test");
  });

  done();
};
