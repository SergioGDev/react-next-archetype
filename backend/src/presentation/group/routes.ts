import { Router } from "express";
import { GroupDatasourceImpl } from "../../infrastructure/datasources/group.datasource.impl";
import { GroupRepositoryImpl } from "../../infrastructure/repositories/group.repository.impl";
import { GroupController } from "./controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthRepository } from '../../domain/repositories/auth.repository';
export class GroupRoutes {
  static get routes(): Router {
    const router = Router();

    const groupDatasource = new GroupDatasourceImpl();
    const groupRepository = new GroupRepositoryImpl(groupDatasource);

    const authDatasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(authDatasource);

    const controller = new GroupController(groupRepository, authRepository);

    router.post("/register-group", [AuthMiddleware.validateJwt], controller.registerGroup);
    router.get("/groups", [AuthMiddleware.validateJwt], controller.getGroupList);
    router.get("/groups/:id", [AuthMiddleware.validateJwt], controller.getGroupData);

    return router;
  }
}