import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
// dbUsername dbHost dbPass dbName
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.dbHost,
  port: 5432,
  username: process.env.dbUsername,
  password: process.env.dbPass,
  database: "central-auth",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
