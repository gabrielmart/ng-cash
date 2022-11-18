import { AppDataSource } from "../AppDataSource";
import Transaction from "../database/typeorm/entities/Transaction";

export const transactionRepository = AppDataSource.getRepository(Transaction);
