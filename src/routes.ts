import { Router } from "express";
import { ValidateToken } from "./middlewares/ValidateToken";
import AuthenticateUserController from "./useCases/authenticateUser/AuthenticateUserController";
import CashOutController from "./useCases/cashOut/CashOutController";
import CreateUserController from "./useCases/createUser/CreateUserController";
import GetBalanceController from "./useCases/getBalance/GetBalanceController";
import GetTransactionController from "./useCases/getTransaction/GetTransactionController";

const routes = Router();

routes.post("/users", new CreateUserController().handle);
routes.post("/login", new AuthenticateUserController().handle);
routes.get("/balance", ValidateToken, new GetBalanceController().handle);
routes.post("/cashOut", ValidateToken, new CashOutController().handle);
routes.get(
  "/transaction",
  ValidateToken,
  new GetTransactionController().handle
);

export default routes;
