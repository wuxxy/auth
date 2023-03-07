import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Integrations {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  redirect: string;

  @Column()
  link: string;

  @ManyToMany(() => User, (user) => user.integrations)
  users: User[];
}
