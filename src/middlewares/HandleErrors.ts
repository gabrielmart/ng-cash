import { NextFunction, Request, Response } from "express";

export const HandleErrors = (
  error: Error,
  request: Request,
  respose: Response,
  next: NextFunction
) => {
  respose.status(400).send(error.message);
};
