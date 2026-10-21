const { Router } = require('express');
const Tipo = require('../models/Tipo');

const router = Router();

// GET - Obtener todos los tipos
router.get('/', async (req, res) => {
  try {
    const tipos = await Tipo.find();
    res.status(200).json(tipos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocurrió un error al consultar tipos');
  }
});

// POST - Crear un nuevo tipo
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    let tipo = new Tipo();
    tipo.nombre = nombre;
    tipo.descripcion = descripcion;
    tipo.fechaCreacion = new Date();
    tipo.fechaActualizacion = new Date();

    tipo = await tipo.save();
    res.status(201).json(tipo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocurrió un error al guardar el tipo');
  }
});

// PUT - Actualizar un tipo existente
router.put('/:id', async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    let tipo = await Tipo.findById(req.params.id);
    if (!tipo) {
      return res.status(404).send('El tipo no existe');
    }

    tipo.nombre = nombre;
    tipo.descripcion = descripcion;
    tipo.fechaActualizacion = new Date();

    tipo = await tipo.save();
    res.status(200).json(tipo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocurrió un error al actualizar el tipo');
  }
});

module.exports = router;