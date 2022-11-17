import { AppDataSource } from "../AppDataSource";
import User from "../database/typeorm/entities/User";

export const userRepository = AppDataSource.getRepository(User);
