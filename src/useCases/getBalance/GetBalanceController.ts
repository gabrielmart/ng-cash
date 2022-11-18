import { Request, Response } from "express";

import GetBalanceUseCase from "../getBalance/GetBalanceUseCase"

export default class GetBalanceController {
  async handle(request: Request, response: Response) {
    const decode = request.decode;

    const getBalanceUseCaseUseCase = new GetBalanceUseCase();

    const balance = await getBalanceUseCaseUseCase.execute({ decode });

    response
      .status(201)
      .json({ status: "Valor atual do balance!", balance });
  }
}
