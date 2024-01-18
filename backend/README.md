# React Next Archetype: Backend


### Tipos de ficheros

- **DTO**: Data Transfer Objects. Objetos que nos van a ayudar a transferir los datos dentro de nuestra aplicación.
- **ENTITY**: Se trata de una referencia a cómo vamos a grabar los datos (casi de forma idéntica) en nuestra base de datos. Son CASI iguales. Se mapea desde el mapper.
- **DATASOURCE**: Son las reglas de cómo van a lucir nuestras fuentes de datos, qué reglas tienen que cumplis. Obtiene los datos desde BASES DE DATOS.
- **REPOSITORY**: Hace una llamada al DATASOURCE.
- **CASO DE USO**: Son PURAS REGLAS. Utilizando el REPOSITORY hace la función.
- **CONTROLADOR**: Usar el CASO DE USO en el controlador.

### Pasos a seguir para generar un nuevo endpoint

1. Si no hay un modelo creado, creamos el modelo de base de datos dentro de la carpeta `data/mongodb/models`.
2. En caso de que no se tenga una entidad creada, creamos la entidad dentro del directorio `domain/entities`.
3. Hay que crear el DTO dentro del directorio `domain/entities/dtos`. Se insertarán dentro de un módulo concreto para cada DTO.
4. Dentro del **datasource** del módulo (si no existe, hay que crearlo) añadimos el endpoint:
    - Dentro de `domain/datasources/[MODULE_NAME].datasource.ts` creamos el método abstracto.
    - Dentro de `infrastructure/datasources/[MODULE_NAME].datasource.impl.ts` implementamos la lógica del endpoint.
5. Dentro del **repository** del módulo (si no existe, hay que crearlo) añadimos:
      - Dentro de `domain/repository/[MODULE_NAME].repository.ts` creamos el método abstracto.
      - Dentro de `infrastructure/repository/[MODULE_NAME].repository.impl.ts` hacemos el llamamiento al método abstracto del datasource.
6. Creamos el **caso de uso** dentro del directorio `domain/use-cases/[MODULE_NAME]/[USE_CASE_NAME].use-case.ts`. Mirar otros ejemplos para implementar los casos de uso.
7. Exportar la ruta en el fichero de rutas: `presentations[/MODULE_NAME]/routes.ts`.


--------------------------------------------


### File Types

- **DTO**: Data Transfer Objects. Objects that will help us transfer data within our application.
- **ENTITY**: This refers to how we are going to store data (almost identically) in our database. They are ALMOST identical. It is mapped from the mapper.
- **DATASOURCE**: These are the rules of how our data sources will look, what rules they have to follow. It retrieves data from DATABASES.
- **REPOSITORY**: Makes a call to the DATASOURCE.
- **USE CASE**: These are PURE RULES. It uses the REPOSITORY to perform its function.
- **CONTROLLER**: Uses the USE CASE in the controller.

### Steps to Generate a New Endpoint

1. If there is no model created, create the database model within the `data/mongodb/models` folder.
2. If an entity is not created, create the entity within the `domain/entities` directory.
3. Create the DTO within the `domain/entities/dtos` directory. They will be inserted into a specific module for each DTO.
4. In the **datasource** of the module (if it doesn't exist, create it), add the endpoint:
      - Inside `domain/datasources/[MODULE_NAME].datasource.ts`, create the abstract method.
      - Inside `infrastructure/datasources/[MODULE_NAME].datasource.impl.ts`, implement the logic of the endpoint.
5. In the **repository** of the module (if it doesn't exist, create it), add:
      - Inside `infrastructure/datasources/[MODULE_NAME].datasource.impl.ts`, create the abstract method.
      - Inside `infrastructure/repository/[MODULE_NAME].repository.impl.ts`, make the call to the abstract method of the datasource.
6. Create the use case within the `domain/use-cases/[MODULE_NAME]/[USE_CASE_NAME].use-case.ts`. Refer to other examples to implement use cases.
7. Export the route in the routes file: `presentations[/MODULE_NAME]/routes.ts`.
