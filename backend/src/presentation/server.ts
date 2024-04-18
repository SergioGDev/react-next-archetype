import express, { Router } from "express";
import swaggerUi from "swagger-ui-express";
import { logger } from "../config/logger";
import path from "path";
import YAML from "yamljs";

interface Options {
  port?: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port = 3100, routes } = options;

    this.port = port;
    this.routes = routes;
  }

  async start() {
    // Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true })); // x-www-formurlencoded

    // Usar las rutas definidas
    this.app.use(this.routes);

    // Swagger
    const swaggerDoc = YAML.load(path.join(__dirname, "swagger.yaml"));
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    logger.info(
      `Version 1 Docs are available at http://localhost:${this.port}/api-docs`
    );
    // this.app.use("/api-docs", (req, res) => {
    //   const swaggerFilePath = path.join(__dirname, "swagger.yaml");
    //   fs.readFile(swaggerFilePath, 'utf8', (err, data) => {
    //     if (err) {
    //       console.error('Error al leer el archivo Swagger:', err);
    //       logger.error('Error serving swagger file...')
    //       res.status(500).send('Error interno del servidor');
    //       return;
    //     }
    //     // Envía la especificación de Swagger como respuesta
    //     res.header('Content-Type', 'text/yaml'); // Cambia el tipo de contenido según el formato de tu especificación
    //     res.send(data);
    //     logger.info(
    //       `Version 1.0.0 Docs are available at http://localhost:${this.port}/api-docs`
    //     );
    //   });
    // });

    // Escuchar el puerto
    this.app.listen(this.port, () => {
      logger.info(`Server running on port ${this.port}`);
    });
  }
}
