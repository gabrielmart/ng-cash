import { Router } from "express";
import CreateUserController from "./useCases/createUser/CreateUserController";
import AuthenticateUserController from "./useCases/authenticateUser/AuthenticateUserController";
import GetBalanceController from "./useCases/getBalance/GetBalanceController";
import { ValidateToken } from "./middlewares/ValidateToken";

const routes = Router();

routes.post("/users", new CreateUserController().handle);
routes.post("/login", new AuthenticateUserController().handle);
routes.get("/getBalance", ValidateToken, new GetBalanceController().handle)

export default routes;
