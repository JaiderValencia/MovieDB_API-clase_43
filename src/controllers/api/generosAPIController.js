const path = require('path');
const db = require('../../database/models');

const genresAPIController = {
    list: async (req, res) => {
        try {
            const generos = await db.Genero.findAll();

            res.json({
                meta: {
                    status: 200,
                    length: canciones.length,
                    url: req.baseUrl,
                    method: req.method
                },
                data: generos
            })
        } catch (error) {
            res.send(error)
        }
    }
}
module.exports = genresAPIController;