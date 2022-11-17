import { userRepository } from "../../repositories/userRepository";
import { accountRepository } from "../../repositories/accountRepository";
import { transactionRepository } from "../../repositories/transactionRepository";
import { AppDataSource } from "../../AppDataSource";
import bcrypt from "bcrypt";
import User from "../../database/typeorm/entities/User";

interface IUserRequest {
  username: string;
  password: string;
}

export default class CreateUserUseCase {
  execute = async ({ username, password }: IUserRequest) => {
    if (username.length < 3) {
      throw new Error("O nome do usuário deve ter pelo menos 3 caracteres!");
    }

    const regexValidatePassword = /(?=.*\d)(?=.*[A-Z]).{8,}/;

    if (!regexValidatePassword.test(password)) {
      throw new Error(
        "A senha deve conter no minimo 8 caracteres, com um numero e uma letra maiúscula!"
      );
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const existUser = await userRepository.findOne({
      where: {
        username,
      },
    });

    if (existUser) {
      throw new Error("já existe usuário com esse nome!");
    }

    await AppDataSource.transaction(async (transactionalEntityManager) => {
      const account = accountRepository.create({ balance: 100 });

      await transactionalEntityManager.save(account);

      const user = userRepository.create({
        username,
        password: passwordHash,
        account,
      });

      return await transactionalEntityManager.save(user);
    });
  };
}
