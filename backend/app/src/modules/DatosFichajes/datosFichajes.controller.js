const DatosFichaje = require('./datosFichajes.model')

async function test(req, res) {
    res.status(200).send({
        type: 'ok',
        msg: 'Test datosFichaje controller'
    })
}

async function registrarFichaje(req, res) {
    const params = req.body

    if (!params || Object.keys(params).length === 0) {
        res.status(400).send({
            type: 'error',
            msg: 'No se han recibido los datos'
        })
    } else {
        const { fecha, idUsuario, turnos } = params;
        try {
            const registroExistente = await DatosFichaje.find({ fecha, idUsuario })
            console.log(registroExistente)
            
        } catch (error) {
            res.status(500).send({
                type: 'error',
                msg: 'Ha ocurrido un error al registrar los datos.',
                error
            })
        }


        res.status(200).send({
            params
        })
    }
}

async function getAll(req, res) {
    const params = req.body

    if (!params) {
        res.status(400).send({
            type: 'error',
            msg: 'Error sending data.'
        })
    } else {
        try {
            const datosFichaje = await DatosFichaje.find()

            if (datosFichaje) {
                res.status(200).send({ 
                    type: 'ok',
                    length: datosFichaje.length,
                    data: datosFichaje,
                 })
            } else {
                res.status(400).send({
                    type: 'error',
                    msg: 'Can\'t find registers of datosFichajes',
                })
            }

        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = {
    test,
    getAll,
    registrarFichaje
}