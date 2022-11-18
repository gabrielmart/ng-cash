import { Request, Response } from "express";

import CashOutUseCase from "../cashOut/CashOutUseCase";

export default class CashOutController {
  async handle(request: Request, response: Response) {
    const decode = request.decode;
    const { recipientUsername, value } = request.body;

    const cashOutUseCase = new CashOutUseCase();

    const transaction = await cashOutUseCase.execute({
      decode,
      recipientUsername,
      value,
    });

    response
      .status(201)
      .json({ status: "Transação realizada com sucesso!", user: transaction });
  }
}
