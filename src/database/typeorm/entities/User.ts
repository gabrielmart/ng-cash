import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import Account from "./Account";

@Entity("Users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @PrimaryColumn()
  username: string;

  @Column({select: false})
  password: string;

  @OneToOne(() => Account)
  @JoinColumn()
  account: Account;
}
