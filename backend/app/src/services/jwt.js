const jwt = require('jsonwebtoken');

const SECRET_KEY = 'ansdoin234n23i4n23asf9uasafas9fa823gersio';

function createToken(user, expiresIn) {
    const { id, email } = user;
    const payload = { id, email };

    return jwt.sign(payload, SECRET_KEY, expiresIn ? { expiresIn } : undefined)
}

function decodeToken(token) {
    return jwt.decode(token, SECRET_KEY);
}

module.exports = {
    createToken,
    decodeToken
}