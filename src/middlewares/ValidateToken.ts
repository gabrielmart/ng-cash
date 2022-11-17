import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const HandlerErrors = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).send("Token não informado!");
  }

  const [, token] = authToken.split(" ");
  const SECRET = process.env.SECRET as string;

  try {
    verify(token, SECRET);

    return next();
  } catch (error) {
    return response.status(401).send("Token inválido!");
  }
};
