const express = require('express')
const DatosFichajesController = require('./datosFichajes.controller')

const api = express.Router()

// const md_auth = require('../..//middlewares/authenticated')

api.get('/fichajes', DatosFichajesController.getAll)
api.get('/fichajes/test', DatosFichajesController.test)
api.post('/fichajes/registrar-fichaje', DatosFichajesController.registrarFichaje)
// api.get('/datos-fichaje', [md_auth.ensureAuth], DatosFichajesController.getAll)

module.exports = api