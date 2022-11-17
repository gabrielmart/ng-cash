import { AppDataSource } from "../AppDataSource";

export const transactionRepository = AppDataSource.manager.transaction;
