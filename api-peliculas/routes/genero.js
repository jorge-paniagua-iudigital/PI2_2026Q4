const { Router } = require('express');
const Genero = require('../models/Genero');

const router = Router();

// GET - Obtener todos los géneros
router.get('/', async (req, res) => {
  try {
    const generos = await Genero.find();
    res.status(200).json(generos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocurrió un error al consultar géneros');
  }
});

// POST - Crear un nuevo género
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, estado } = req.body;

    let genero = new Genero();
    genero.nombre = nombre;
    genero.descripcion = descripcion;
    genero.estado = estado;
    genero.fechaCreacion = new Date();
    genero.fechaActualizacion = new Date();

    genero = await genero.save();
    res.status(201).json(genero);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocurrió un error al guardar el género');
  }
});

// PUT - Actualizar un género existente
router.put('/:id', async (req, res) => {
  try {
    const { nombre, descripcion, estado } = req.body;

    let genero = await Genero.findById(req.params.id);
    if (!genero) {
      return res.status(404).send('El género no existe');
    }

    genero.nombre = nombre;
    genero.descripcion = descripcion;
    genero.estado = estado;
    genero.fechaActualizacion = new Date();

    genero = await genero.save();
    res.status(200).json(genero);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocurrió un error al actualizar el género');
  }
});

module.exports = router;