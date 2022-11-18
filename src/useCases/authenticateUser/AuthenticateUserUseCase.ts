import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { userRepository } from "../../repositories/userRepository";

interface IAuthenticateRequest {
  username: string;
  password: string;
}

export default class AuthenticateUserUseCase {
  execute = async ({ username, password }: IAuthenticateRequest) => {
    const userAlreadyExists = await userRepository.findOne({
      where: {
        username,
      },
    });

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
