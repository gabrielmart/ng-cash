import { Request, Response } from "express";

import GetTransactionUseCase from "./GetTransactionUseCase";

export default class GetTransactionController {
  async handle(request: Request, response: Response) {
    const { decode } = request;
    const { date, operation } = request.body;

    const getTransactionUseCase = new GetTransactionUseCase();

    const transactions = await getTransactionUseCase.execute({
      decode,
      date,
      operation,
    });

    response.status(200).json({ status: `Todas as transações ${operation} ${date ? "em " + date : ""}`, transactions });
  }
}
