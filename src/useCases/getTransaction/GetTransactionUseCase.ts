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
interface IRelation {
  debitedAccount?: { user: boolean };
  creditedAccount?: { user: boolean };
}

export default class GetBalanceUseCase {
  execute = async ({
    decode,
    date = "",
    operation,
  }: IGetTransactionRequest) => {
    const filters = {} as IFilter;
    const relations = {} as IRelation;
    const filterWithAllOperations = [];

    if (!date && !operation) {
      throw new Error(
        'Adicione pelo um filtro para obter as transações. Filtros disponíveis: "operation" e "date"'
      );
    }

    dayjs.extend(customParseFormat);

    const dateIsValid = dayjs(date, "DD-MM-YYYY", true).isValid();

    if (date && !dateIsValid) {
      throw new Error('Data invalida! Formatação esperada: "21-09-1999"');
    }

    if (dateIsValid) {
      filters.createdAt = dayjs(date, "DD-MM-YYYY").toDate();
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

    if (!date && operation !== "cash-out" && operation !== "cash-in") {
      throw new Error(
        'Operação Invalida! Opções validas: "cash-in" ou "cash-out"'
      );
    }

    switch (operation) {
      case "cash-out":
        filters.debitedAccount = user.account;
        relations.debitedAccount = { user: true };
        break;

      case "cash-in":
        filters.creditedAccount = user.account;
        relations.creditedAccount = { user: true };
        break;

      default:
        filterWithAllOperations.push(
          { creditedAccount: user.account },
          { debitedAccount: user.account }
        );

        relations.creditedAccount = { user: true };
        relations.debitedAccount = { user: true };
        break;
    }

    const transactions = await transactionRepository.find({
      where: filters ? filters : filterWithAllOperations,
      relations: relations,
    });

    return transactions;
  };
}
