const path = require('path');
const db = require('../../database/models');

const artistasAPIController = {
    list: async (req, res) => {
        try {
            const artistas = await db.Artista.findAll({ include: "albumes" });

            if (!artistas) {
                return res.stuts(204).json({
                    meta: {
                        status: 204,
                    },
                    data: "none"
                })
            };

            res.json({
                meta: {
                    status: 200,
                    length: artistas.length,
                    url: req.baseUrl,
                    method: req.method
                },
                data: artistas
            });
        } catch (error) {
            res.status(400).send("hubo un error");
        }
    },
    create: (req, res) => {
        const artista = {
            nombre: req.body.nombre
        };

        db.Artista.create(artista)
            .then(response => {
                res.status(201).json({
                    meta: {
                        status: 201,
                        url: req.baseUrl,
                        method: req.method
                    },
                    data: response
                })
            })
            .catch(error => {
                res.status(400).send(error)
            })
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;

            await db.Artista.update({
                nombre: req.body.nombre
            }, {
                where: {
                    id
                }
            });

            const artista = await db.Artista.findOne({ where: { id } })

            res.json({
                meta: {
                    status: 200,
                    url: req.baseUrl,
                    method: req.method
                },
                data: artista
            })
        } catch (error) {
            res.send(error);
        }
    },
    destroy: async (req, res) => {
        try {
            const { id } = req.params;

            const artista = await db.Artista.findAll({ where: { id } });

            await db.Artista.destroy({ where: { id } });

            res.json({
                meta: {
                    status: 200,
                    url: req.baseUrl,
                    method: req.method
                },
                data: artista
            })
        } catch (error) {
            res.send(error);
        }
    }
}
module.exports = artistasAPIController;