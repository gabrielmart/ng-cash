import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Transaction from "./Transaction";

@Entity("Accounts")
export default class Account {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  balance: number;

  @OneToMany(
    () => Transaction,
    (transaction) => [transaction.creditedAccount, transaction.debitedAccount]
  )
  transactions: Transaction[];
}
