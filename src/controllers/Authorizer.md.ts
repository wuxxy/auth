import { MoreThan } from "typeorm";
import { SessionDB } from "../database";
import Token from "../utils/Token";
export default async (req, res, next) => {
  const token = new Token(req.headers.authorization.split(" ")[1]);
  if (!token.userId) {
    res.statusCode = 401;
    return res.end("Unauthorized");
  }
  let findToken = await SessionDB.findOne({
    where: {
      id: token.tokenId,
      expiresAt: MoreThan(new Date(Date.now())),
    },
  });
  if (!findToken) {
    return res.end("Unauthorized");
  }
  let getUser = await token.getUser();
  if (getUser) {
    req.user = getUser;
    req.session = token.tokenId;
  } else {
    res.statusCode = 401;
    return res.end("Unauthorized");
  }
  next();
};
