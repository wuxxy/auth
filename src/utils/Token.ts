import jwt from "jsonwebtoken";
import { AppDataSource } from "../database";
import { Sessions } from "../entity/Sessions";
import crypto from "crypto";
import { MoreThan } from "typeorm";
import { User } from "../entity/User";
const key = process.env.JWTKEY || "campbell";
const SEVENDAYS = 1000 * 60 * 60 * 24 * 7;
export default class Token {
  private token: string;
  public tokenId: string;
  public userId: string;
  private db = AppDataSource;
  constructor(token?: string) {
    this.token = token;
    if (token) {
      this.userId = this.verify(token).user;
      this.tokenId = this.verify(token).id;
    }
  }
  public async getUser() {
    if (!this.userId) return null;
    try {
      let user = await this.db.manager.findOneOrFail(User, {
        where: { id: this.userId },
        select: ["created_at", "discriminator", "username", "id", "email"],
        cache: true,
      });
      if (user.id !== this.userId) return null;
      return user;
    } catch (error) {
      return null;
    }
  }
  public async generate(id: string): Promise<[string, string, number?]> {
    const find = await this.db.manager.find(Sessions, {
      where: { userId: id },
    });
    if (find.length > 2) {
      return ["", "", -2];
    }
    const session = new Sessions();
    session.expiresAt = new Date(Date.now() + SEVENDAYS);
    let sessionid = (session.id = crypto.randomBytes(24).toString("hex"));
    let refresh = (session.refresh = this.createRefresh());
    session.userId = id;

    try {
      await this.db.manager.save(session);
      return [
        jwt.sign({ id: sessionid, user: id }, key, {
          expiresIn: "1d",
        }),
        refresh,
      ];
    } catch (error) {
      console.log(error);

      return ["", "", -1];
    }
  }
  public async refresh(refreshToken: string) {
    let token = await this.db.manager.findOne(Sessions, {
      where: {
        refresh: refreshToken,
        expiresAt: MoreThan(new Date(Date.now())),
      },
    });
    if (!token) return ["", "", -1];
    token.expiresAt = new Date(Date.now() + SEVENDAYS);
    let refresh = (token.refresh = this.createRefresh());

    try {
      await this.db.manager.save(token);
      return [
        jwt.sign({ id: token.id, user: token.userId }, key, {
          expiresIn: SEVENDAYS / 7,
        }),
        refresh,
      ];
    } catch (error) {
      return ["", "", -1];
    }
  }
  public verify(token: string) {
    try {
      let verify = jwt.verify(token, key);
      if (typeof verify == "string") return JSON.parse(verify);
      return verify;
    } catch (error) {
      return -1;
    }
  }
  private createRefresh(): string {
    let refresh =
      crypto.randomBytes(32).toString("hex") + Date.now().toString(16);
    return refresh;
  }
}
