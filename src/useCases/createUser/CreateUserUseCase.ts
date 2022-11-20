import { userRepository } from "../../repositories/userRepository";
import { accountRepository } from "../../repositories/accountRepository";
import { AppDataSource } from "../../AppDataSource";
import bcrypt from "bcrypt";

interface ICreateUserRequest {
  username: string;
  password: string;
}

export default class CreateUserUseCase {
  execute = async ({ username, password }: ICreateUserRequest) => {
    if (username.length < 3) {
      throw new Error("O nome do usuário deve ter pelo menos 3 caracteres!");
    }

    /* Validates if password has at least 8 characters,
     * which must contain a capital letter and a number */
    const regexValidatePassword = /(?=.*\d)(?=.*[A-Z]).{8,}/;

    if (!regexValidatePassword.test(password)) {
      throw new Error(
        "A senha deve conter no minimo 8 caracteres, com um numero e uma letra maiúscula!"
      );
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const userAlreadyExists = await userRepository.findOne({
      where: {
        username,
      },
    });

    if (userAlreadyExists) {
      throw new Error("já existe usuário com esse nome!");
    }

    return await AppDataSource.transaction(
      async (transactionalEntityManager) => {
        // The value passed to the balance is multiplied by 100, turning the smallest unit of the real currency (cents) into an integer, avoiding floating point errors in javascript
        const account = accountRepository.create({ balance: 10000 });

        await transactionalEntityManager.save(account);

        const user = userRepository.create({
          username,
          password: passwordHash,
          account,
        });

        return await transactionalEntityManager.save(user);
      }
    );
  };
}
