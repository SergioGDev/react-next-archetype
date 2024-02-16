import { Router } from "express";
import { GroupDatasourceImpl } from "../../infrastructure/datasources/group.datasource.impl";
import { GroupRepositoryImpl } from "../../infrastructure/repositories/group.repository.impl";
import { GroupController } from "./controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
export class GroupRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new GroupDatasourceImpl();
    const groupRepository = new GroupRepositoryImpl(datasource);
    const controller = new GroupController(groupRepository);

    router.post("/register-group", [AuthMiddleware.validateJwt], controller.registerGroup);
    router.get("/groups", [AuthMiddleware.validateJwt], controller.getGroupList);
    router.get("/groups/:id", [AuthMiddleware.validateJwt], controller.getGroupData);

    return router;
  }
}