import checkPasswordStrength from "../utils/checkPassword";
import err from "../utils/err";
import testAlphaNumeric from "../utils/testAlphaNumeric";
import Token from "../utils/Token";
import validateEmail from "../utils/validateEmail";
import { UserDB } from "../database";
import { checkPassword } from "../utils/PasswordManager";
export default async (req, res) => {
  const { email, password } = req.body;
  if (email == null || password == null) return err("Missing inputs", res);

  if (!validateEmail(email)) return err("Invalid e-mail", res);
  let passwordStrength = checkPasswordStrength(password);
  if (passwordStrength == 0)
    return err(
      "Password contains a space, or is less than 8 characters long, or is more than 32 characters long",
      res
    );
  if (passwordStrength < 3) return err("Invalid Password", res);
  const fetchUser = await UserDB.findOneOrFail({ where: { email } });
  if (!fetchUser) return err("User could not be found", res);
  if (await checkPassword(password, fetchUser.password)) {
    const login = new Token();
    const tokenPair = await login.generate(fetchUser.id);
    if (tokenPair[2] == -2) return err("Too many sessions", res);
    res.send({
      user: {
        id: fetchUser.id,
        discriminator: fetchUser.discriminator,
        username: fetchUser.username,
        email: fetchUser.email,
      },
      access: tokenPair[0],
      refresh: tokenPair[1],
    });
  }
};
