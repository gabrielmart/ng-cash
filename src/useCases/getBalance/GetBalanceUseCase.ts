import { JwtPayload } from "jsonwebtoken";
import { accountRepository } from "../../repositories/accountRepository";
import { userRepository } from "../../repositories/userRepository";

interface IGetBalanceRequest {
  decode: JwtPayload | string;
}

export default class GetBalanceUseCase {
  execute = async ({ decode }: IGetBalanceRequest) => {
    const { sub } = decode;
    const username = sub as string;

    const user = await userRepository.findOne({
      where: {
        username,
      },
      loadRelationIds: true,
    });

    if (!user) {
      throw new Error("Erro ao obter o usuário");
    }

    console.log(user);

    const account = await accountRepository
      .createQueryBuilder("account")
      .addSelect("account.balance")
      .where({ id: user.account })
      .getOne();

    if (!account) {
      throw new Error("Erro ao obter a conta");
    }

    const balance = account.balance;

    return balance / 100;
  };
}
