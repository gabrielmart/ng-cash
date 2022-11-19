import { Request, Response } from "express";

import AuthenticateUserUseCase from "./AuthenticateUserUseCase";

export default class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateUserUseCase = new AuthenticateUserUseCase();

    const token = await authenticateUserUseCase.execute({
      username,
      password,
    });

    response
      .status(200)
      .json({ status: "Login realizado com sucesso!", token });
  }
}
