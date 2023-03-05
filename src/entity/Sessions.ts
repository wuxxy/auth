import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Sessions {
  @PrimaryColumn("varchar")
  id: string;

  @Column()
  userId: string;

  @Column({ type: "timestamp with time zone" })
  expiresAt: Date;

  @Column()
  refresh: string;
}
