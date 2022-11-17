import { Request, Response } from "express";

import CreateUserUseCase from "./CreateUserUseCase";

export default class CreateUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const createUserUseCase = new CreateUserUseCase();

    await createUserUseCase.execute({ username, password });

    response.status(201).json("Usuário cadastrado com sucesso!");
  }
}
