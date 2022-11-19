import { JwtPayload } from "jsonwebtoken";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { transactionRepository } from "../../repositories/transactionRepository";
import { userRepository } from "../../repositories/userRepository";
import Account from "../../database/typeorm/entities/Account";

interface IGetTransactionRequest {
  decode: JwtPayload | string;
  date: string;
  operation: string;
}

interface IFilter {
  createdAt?: Date;
  debitedAccount?: Account;
  creditedAccount?: Account;
}

export default class GetBalanceUseCase {
  execute = async ({ decode, date = '', operation }: IGetTransactionRequest) => {
    const filters = {} as IFilter;

    dayjs.extend(customParseFormat);

    const dateIsValid = dayjs(
      date,
      "DD-MM-YYYY",
      true
    ).isValid();

    if (date && !dateIsValid) {
      throw new Error(
        'Data invalida! Formatação esperada: "21-09-1999"'
      );
    }

    if (dateIsValid) {
      filters.createdAt = dayjs(date, "DD-MM-YYYY").toDate();
    }

    if (operation !== "cash-out" && operation !== "cash-in") {
      throw new Error(
        'Operação Invalida! Opções validas: "cash-in" ou "cash-out"'
      );
    }

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
      throw new Error("Erro ao obter as transações");
    }

    if (operation === "cash-out") {
      filters.debitedAccount = user.account;
    }

    if (operation === "cash-in") {
      filters.creditedAccount = user.account;
    }

    const transctions = await transactionRepository.find({
      where: filters,
    });

    return transctions;
  };
}
