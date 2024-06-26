import { Router } from "express";
import { AuthController } from "./controller";
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
    router.post("/renew-token", controller.renewToken);
    router.post(
      "/update-user-data",
      [AuthMiddleware.validateJwt],
      controller.updateUserData
    );
    router.get("/user-list", [AuthMiddleware.validateJwt], controller.getUsers);

    return router;
  }
}
