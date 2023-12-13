const moment = require('moment');
const jwt = require('../services/jwt');

const SECRET_KEY = 'ansdoin234n23i4n23asf9uasafas9fa823gersio';

function ensureAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res
            .status(403)
            .send({ msg: 'La petición no tiene la cabecera de autenticación.' })
    }

    // Obtenemos el token y le quitamos el entrecomillado
    const token = req.headers.authorization.replace(/['"]+/g, "");

    // Decodificamos el token
    const payload = jwt.decodeToken(token, SECRET_KEY);

    try {
        // Si la fecha de expedición del token es menor que la fecha actual, el token ha expirado
        if (payload.exp <= moment().unix()) {
            return res.status(400).send({ msg: 'El token ha expirado.' })
        }
    } catch (error) {
        return res.status(400).send({ msg: 'Token inválido.' })
    }

    req.user = payload;
    next();
}

module.exports = {
    ensureAuth
}