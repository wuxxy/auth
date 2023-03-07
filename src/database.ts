import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Sessions } from "./entity/Sessions";
// dbUsername dbHost dbPass dbName
import dotenv from "dotenv";
import { Integrations } from "./entity/Integrations";
dotenv.config();
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.dbHost,
  port: 5432,
  username: process.env.dbUsername,
  password: process.env.dbPass,
  database: "central-auth",
  synchronize: true,
  logging: true,
  entities: [User, Sessions, Integrations],
  migrations: [],
  subscribers: [],
});
export const UserDB = AppDataSource.getRepository(User);
export const SessionDB = AppDataSource.getRepository(Sessions);
export const IntegrationsDB = AppDataSource.getRepository(Integrations);