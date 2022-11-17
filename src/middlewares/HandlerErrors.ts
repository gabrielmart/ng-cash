import { NextFunction, Request, Response } from "express";

export const HandlerErrors = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.status(400).send(error.message);
};
