const path = require('path');
const db = require('../../database/models');

const albumesAPIController = {
    list: async (req, res) => {
        try {
            const albumes = await db.Album.findAll({ include: "artista" });

            res.json({
                meta: {
                    status: 200,
                    length: albumes.length,
                    url: req.baseUrl,
                    method: req.method
                },
                data: albumes
            });
        } catch (error) {
            res.send(error);
        }
    },

    detail: async (req, res) => {
        try {
            const { id } = req.params

            const album = await db.Album.findAll({ where: { id }, include: "artista" });

            res.json({
                meta: {
                    status: 200,
                    url: req.baseUrl,
                    method: req.method
                },
                data: album
            });
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = albumesAPIController;