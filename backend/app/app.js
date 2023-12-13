const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Cargar rutas
const user_routes = require("./src/modules/User/user.routes");
const datos_fichajes_routes = require("./src/modules/DatosFichajes/datosFichajes.routes");

// Add here your routes
app.use("/api", user_routes);
app.use("/api", datos_fichajes_routes);

module.exports = app;
