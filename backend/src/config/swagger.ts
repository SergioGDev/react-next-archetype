import path from "path";
import swaggerJsDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "React Next Archetype API documentation",
    version: "1.0.0",
    description:
      "API documentation to the backend of the React Next Archetype.",
  },
  basePath: "/",
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [
    `${path.join(
      __dirname,
      "../infrastructure/datasources/**.datasource.impl.ts"
    )}`,
  ],
};
export const swaggerSpec = swaggerJsDoc(options);
