const express = require("express");
const UserController = require("./user.controller");

const api = express.Router();

const md_auth = require("../../middlewares/authenticated");

api.post("/register", [ md_auth.ensureAuth ], UserController.register);
api.post("/login", UserController.login);
api.delete("/remove-user/:id", [ md_auth.ensureAuth ], UserController.removeUser)
api.get("/user-list", [ md_auth.ensureAuth ], UserController.userList);

module.exports = api;
