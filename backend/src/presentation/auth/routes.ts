import { Router } from "express";
import { AuthController } from "./controller";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middleware/auth.middleware";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);

    const controller = new AuthController(authRepository);

    // Definir todas mis rutas principales
    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);

    router.get("/", [AuthMiddleware.validateJwt], controller.getUsers);

    return router;
  }
}
