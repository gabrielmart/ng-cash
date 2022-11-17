import "express-async-errors";
import express from "express";
import { AppDataSource } from "./AppDataSource";
import routes from "./routes";
import { HandlerErrors } from "./middlewares/HandlerErrors";

const PORT = process.env.PORT;

AppDataSource.initialize().then(() => {
  const app = express();
  app.use(express.json());
  app.use(routes);
  app.use(HandlerErrors);

  return app.listen(PORT, () => {
    console.log(`Servidor iniciado em http://localhost:${PORT}`);
  });
});
