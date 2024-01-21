import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { GroupRoutes } from "./group/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir todas mis rutas principales
    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/group", GroupRoutes.routes);

    // Otras rutas
    // router.use('/api/users')
    // router.use('/api/products')

    return router;
  }
}
