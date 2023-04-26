const path = require('path');
const db = require('../../database/models');

const cancionesAPIController = {
    list: async (req, res) => {
        try {
            const canciones = await db.Cancion.findAll({ include: ["album", "medio", "genero"] });

            res.json({
                meta: {
                    status: 200,
                    length: canciones.length,
                    url: req.baseUrl,
                    method: req.method
                },
                data: canciones
            });
        } catch (error) {
            res.send(error);
        }
    }
}
module.exports = cancionesAPIController;