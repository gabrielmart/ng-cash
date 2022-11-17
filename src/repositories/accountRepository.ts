import { AppDataSource } from "../AppDataSource";
import Account from "../database/typeorm/entities/Account";

export const accountRepository = AppDataSource.getRepository(Account);
