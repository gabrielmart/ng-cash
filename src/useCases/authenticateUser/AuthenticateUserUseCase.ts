import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import User from "../../database/typeorm/entities/User";
import { userRepository } from "../../repositories/userRepository";

interface IAuthenticateRequest {
  username: string;
  password: string;
}

export default class AuthenticateUserUseCase {
  execute = async ({ username, password }: IAuthenticateRequest) => {
    const userAlreadyExists = await userRepository
      .createQueryBuilder("user")
      .where("user.username = :username", { username })
      .addSelect("user.password")
      .getOne()

      console.log(userAlreadyExists)

    if (!userAlreadyExists) {
      throw new Error("Usuário ou senha incorreta!");
    }

    const passwordMatch = await compare(password, userAlreadyExists.password);

    if (!passwordMatch) {
      throw new Error("Usuário ou senha incorreta!");
    }

    const SECRET = process.env.SECRET as string;

    const token = sign({}, SECRET, {
      subject: userAlreadyExists.username,
      expiresIn: "24h",
    });

    return token;
  };
}
