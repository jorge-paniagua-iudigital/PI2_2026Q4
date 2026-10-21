const { Router } = require('express');
const Director = require('../models/Director');

const router = Router();

// GET - Obtener todos los directores
router.get('/', async (req, res) => {
  try {
    const directores = await Director.find();
    res.status(200).json(directores);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocurrió un error al consultar directores');
  }
});

// POST - Crear un nuevo director
router.post('/', async (req, res) => {
  try {
    const { nombres, estado } = req.body;

    let director = new Director();
    director.nombres = nombres;
    director.estado = estado;
    director.fechaCreacion = new Date();
    director.fechaActualizacion = new Date();

    director = await director.save();
    res.status(201).json(director);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocurrió un error al guardar el director');
  }
});

// PUT - Actualizar un director existente
router.put('/:id', async (req, res) => {
  try {
    const { nombres, estado } = req.body;

    let director = await Director.findById(req.params.id);
    if (!director) {
      return res.status(404).send('El director no existe');
    }

    director.nombres = nombres;
    director.estado = estado;
    director.fechaActualizacion = new Date();

    director = await director.save();
    res.status(200).json(director);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocurrió un error al actualizar el director');
  }
});

module.exports = router;