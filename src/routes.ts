import { Router } from "express";
import CreateUserController from "./useCases/createUser/CreateUserController";

const routes = Router();

routes.post("/createUser", new CreateUserController().handle);

export default routes;
