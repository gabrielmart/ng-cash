import { Router } from "express";
import CreateUserController from "./useCases/createUser/CreateUserController";
import AuthenticateUserController from "./useCases/authenticateUser/AuthenticateUserController";

const routes = Router();

routes.post("/users", new CreateUserController().handle);
routes.post("/login", new AuthenticateUserController().handle);

export default routes;
