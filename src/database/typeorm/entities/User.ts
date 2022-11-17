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

  @Column()
  password: string;

  @OneToOne(() => Account)
  @JoinColumn()
  account: Account;
}
