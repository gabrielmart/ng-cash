import { JwtPayload } from "jsonwebtoken";
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
      relations: {
        account: true,
      },
    });

    if (!user) {
      throw new Error("Erro ao obter balance");
    }

    const balance = user.account.balance;

    return balance;
  };
}
