const User = require("./user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("../../services/jwt");

async function register(req, res) {
  const user = new User(req.body);
  const { email, password } = req.body;

  try {
    if (!email) throw { msg: "El email es obligatorio" };
    if (!password) throw { msg: "La contraseña es obligatoria" };

    // Revisamos si el email está en uso
    const foundEmail = await User.findOne({ email });
    if (foundEmail) throw { msg: "El email ya está en uso." };

    const salt = bcryptjs.genSaltSync(10);
    user.password = await bcryptjs.hash(password, salt);

    user.save();

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function removeUser(req, res) {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    user
      ? res.status(200).send({ type: "ok", msg: "User removed." })
      : res.status(400).send({ type: "error", msg: "User not found." });
  } catch (error) {
    res.status(500).send({ error, type: "error", msg: "An error happened." });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  const invalidEmailPassResp = {
    type: "error",
    msg: "Invalid email or password.",
    code: "INVALID_EMAIL_OR_PASSWORD",
  };

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res
        .status(400)
        .send(invalidEmailPassResp);
    } else {
      const passwordSuccess = await bcryptjs.compare(password, user.password);
      if (!passwordSuccess) {
        res
          .status(400)
          .send(invalidEmailPassResp);
      } else {
        const {
          _id,
          name,
          surname,
          email: emailLogged,
          roles,
          idCompany,
        } = user;

        const data = {
          _id,
          name,
          surname,
          email: emailLogged,
          roles,
          idCompany,
          token: jwt.createToken(user),
        };

        res.status(200).send({
          type: "ok",
          data,
          refreshToken: jwt.createToken(user, "1h"),
        });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

async function userList(req, res) {
  try {
    const userList = await User.find();

    if (!userList) throw { msg: "Error al obtener el listado de usuarios" };

    res.status(200).send(userList);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  register,
  login,
  userList,
  removeUser,
};
