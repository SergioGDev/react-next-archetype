const mongoose = require("mongoose");
const app = require("./app");
const logger = require("./logger");
const port = process.env.PORT || 3028;
const urlMongoDB =
  "mongodb://sergiogdev_admin:password64683513830543@db:27017/signing-jociles?authSource=admin";

console.log("Entrando en index.js");

mongoose
  .connect(urlMongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((value) => {
    console.log("Intentando conectar con BBDD.");
    if (value) {
      console.log("--->    La conexión a la base de datos es correcta    <---");
      // logger.info("--->    La conexión a la base de datos es correcta    <---");
      app.listen(port, () => {
        // logger.info("--->    Servidor levantado en puerto", port, "  <---");
        console.log("--->    Servidor levantado en puerto", port, "  <---");
      });
    } else {
      logger.error("Ha ocurrido un error:", err);
      throw err;
    }
  })
  .catch((error) => {
    console.log("--->    ERROR DE CONEXIÓN A LA BASE DE DATOS    <---");
    console.log(error);
  });
