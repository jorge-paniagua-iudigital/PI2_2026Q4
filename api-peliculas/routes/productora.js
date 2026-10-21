const { Router } = require('express');
const Productora = require('../models/Productora');

const router = Router();

// GET - Obtener todas las productoras
router.get('/', async (req, res) => {
  try {
    const productoras = await Productora.find();
    res.status(200).json(productoras);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocurrió un error al consultar productoras');
  }
});

// POST - Crear una nueva productora
router.post('/', async (req, res) => {
  try {
    const { nombre, slogan, descripcion, estado } = req.body;

    let productora = new Productora();
    productora.nombre = nombre;
    productora.slogan = slogan;
    productora.descripcion = descripcion;
    productora.estado = estado;
    productora.fechaCreacion = new Date();
    productora.fechaActualizacion = new Date();

    productora = await productora.save();
    res.status(201).json(productora);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocurrió un error al guardar la productora');
  }
});

// PUT - Actualizar una productora existente
router.put('/:id', async (req, res) => {
  try {
    const { nombre, slogan, descripcion, estado } = req.body;

    let productora = await Productora.findById(req.params.id);
    if (!productora) {
      return res.status(404).send('La productora no existe');
    }

    productora.nombre = nombre;
    productora.slogan = slogan;
    productora.descripcion = descripcion;
    productora.estado = estado;
    productora.fechaActualizacion = new Date();

    productora = await productora.save();
    res.status(200).json(productora);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocurrió un error al actualizar la productora');
  }
});

module.exports = router;