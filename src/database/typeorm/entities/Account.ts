import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Transaction from "./Transaction";
import User from "./User";

@Entity("Accounts")
export default class Account {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  balance: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(
    () => Transaction,
    (transaction) => [transaction.creditedAccount, transaction.debitedAccount]
  )
  transactions: Transaction[];
}
