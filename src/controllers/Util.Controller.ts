import err from "../utils/err";
import Token from "../utils/Token";

export const RefreshController = async (req, res) => {
  let refresh = req.body["refresh"];
  if (!refresh) return err("Missing args", res);
  const generate = await new Token().refresh(refresh);
  res.send(generate);
};
