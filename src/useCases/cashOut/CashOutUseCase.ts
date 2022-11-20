import { JwtPayload } from "jsonwebtoken";
import { userRepository } from "../../repositories/userRepository";
import { transactionRepository } from "../../repositories/transactionRepository";
import { AppDataSource } from "../../AppDataSource";

interface ICashOutRequest {
  recipientUsername: string;
  decode: JwtPayload | string;
  value: number;
}

export default class CreateUserUseCase {
  execute = async ({ decode, recipientUsername, value }: ICashOutRequest) => {
    const { sub } = decode;
    const username = sub as string;

    if (!value) {
      throw new Error("Por favor informar o valor para realizar transação!");
    }

    if (value <= 0) {
      throw new Error(
        "Por favor informar valor valido para realizar transação!"
      );
    }

    if (value.toString().includes(",")) {
      throw new Error(
        'Por favor informar valor usando ponto (".") ao invés de virgula (",")'
      );
    }

    // Checks if is number and the number has at most two decimal places - MONETARY VALUE
    const validateTwoPlaceDecimal = /^\d+(\.\d{1,2})?$/;

    if (!validateTwoPlaceDecimal.test(value.toString())) {
      throw new Error(
        'Por favor informar valor valido com no maximo duas casas decimais. Formatos esperados: "10", "10.1", "10.01"'
      );
    }

    // Multiplying the number by 100, facilitates operations, avoiding errors requiring javascript - MONETARY VALUE
    const convertedValue = parseInt((value * 100).toFixed(0));

    const payerUser = await userRepository.findOne({
      where: { username },
      relations: { account: true },
    });

    if (!payerUser) {
      throw new Error("Não foi possível encontrar o usuário pagador!");
    }

    if (payerUser.account.balance < convertedValue) {
      throw new Error(
        "Usuário pagador não possui saldo disponível para realizar transação!"
      );
    }

    const recipientUser = await userRepository.findOne({
      where: { username: recipientUsername },
      relations: { account: true },
    });

    if (!recipientUser) {
      throw new Error("Não foi possível encontrar o usuário recebedor!");
    }

    if (payerUser.id === recipientUser.id) {
      throw new Error(
        "Não é possui realizar uma transação de cash-out para propria conta!"
      );
    }

    payerUser.account.balance -= convertedValue;
    recipientUser.account.balance += convertedValue;

    return await AppDataSource.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(payerUser.account);
        await transactionalEntityManager.save(recipientUser.account);

        const transaction = transactionRepository.create({
          debitedAccount: payerUser.account,
          creditedAccount: recipientUser.account,
          value: convertedValue,
        });

        return await transactionalEntityManager.save(transaction);
      }
    );
  };
}
