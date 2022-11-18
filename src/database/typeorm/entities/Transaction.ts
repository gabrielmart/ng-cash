import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Account from "./Account";

@Entity("Transactions")
export default class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @ManyToOne(() => Account, (account) => account.transactions)
  debitedAccount: Account;

  @ManyToOne(() => Account, (account) => account.transactions)
  creditedAccount: Account;

  @Column()
  value: number;

  @CreateDateColumn()
  createdAt: Date;
}
