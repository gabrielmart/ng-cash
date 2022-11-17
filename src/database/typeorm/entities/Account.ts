import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity("Accounts")
export default class Account {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  balance: number;
}
