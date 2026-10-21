const { Router } = require('express');
const Media = require('../models/Media');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');

const router = Router();

// GET - Obtener todas las producciones (con la información completa de sus relaciones)
router.get('/', async (req, res) => {
  try {
    const medias = await Media.find()
      .populate('genero')
      .populate('director')
      .populate('productora')
      .populate('tipo');
    res.status(200).json(medias);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocurrió un error al consultar las producciones');
  }
});

// POST - Crear una nueva película o serie
router.post('/', async (req, res) => {
  try {
    const { serial, titulo, sinopsis, url, imagen, anoEstreno, genero, director, productora, tipo } = req.body;

    // 1. Validar que el serial y url no estén duplicados
    const existeSerial = await Media.findOne({ serial });
    if (existeSerial) {
      return res.status(400).send('El serial ya existe');
    }

    const existeUrl = await Media.findOne({ url });
    if (existeUrl) {
      return res.status(400).send('La URL ya existe');
    }

    // 2. Validar que el género exista y esté Activo
    const generoDB = await Genero.findById(genero);
    if (!generoDB || generoDB.estado !== 'Activo') {
      return res.status(400).send('El género seleccionado no existe o no se encuentra Activo');
    }

    // 3. Validar que el director exista y esté Activo
    const directorDB = await Director.findById(director);
    if (!directorDB || directorDB.estado !== 'Activo') {
      return res.status(400).send('El director seleccionado no existe o no se encuentra Activo');
    }

    // 4. Validar que la productora exista y esté Activa
    const productoraDB = await Productora.findById(productora);
    if (!productoraDB || productoraDB.estado !== 'Activo') {
      return res.status(400).send('La productora seleccionada no existe o no se encuentra Activa');
    }

    // 5. Validar que el tipo exista
    const tipoDB = await Tipo.findById(tipo);
    if (!tipoDB) {
      return res.status(400).send('El tipo seleccionado no existe');
    }

    // Guardar la nueva media
    let media = new Media();
    media.serial = serial;
    media.titulo = titulo;
    media.sinopsis = sinopsis;
    media.url = url;
    media.imagen = imagen;
    media.anoEstreno = anoEstreno;
    media.genero = genero;
    media.director = director;
    media.productora = productora;
    media.tipo = tipo;
    media.fechaCreacion = new Date();
    media.fechaActualizacion = new Date();

    media = await media.save();
    res.status(201).json(media);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocurrió un error al guardar la producción');
  }
});

// PUT - Actualizar una producción existente
router.put('/:id', async (req, res) => {
  try {
    const { serial, titulo, sinopsis, url, imagen, anoEstreno, genero, director, productora, tipo } = req.body;

    let media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).send('La producción no existe');
    }

    // Validar Género Activo
    const generoDB = await Genero.findById(genero);
    if (!generoDB || generoDB.estado !== 'Activo') {
      return res.status(400).send('El género seleccionado no existe o no se encuentra Activo');
    }

    // Validar Director Activo
    const directorDB = await Director.findById(director);
    if (!directorDB || directorDB.estado !== 'Activo') {
      return res.status(400).send('El director seleccionado no existe o no se encuentra Activo');
    }

    // Validar Productora Activa
    const productoraDB = await Productora.findById(productora);
    if (!productoraDB || productoraDB.estado !== 'Activo') {
      return res.status(400).send('La productora seleccionada no existe o no se encuentra Activa');
    }

    // Validar Tipo
    const tipoDB = await Tipo.findById(tipo);
    if (!tipoDB) {
      return res.status(400).send('El tipo seleccionado no existe');
    }

    media.serial = serial;
    media.titulo = titulo;
    media.sinopsis = sinopsis;
    media.url = url;
    media.imagen = imagen;
    media.anoEstreno = anoEstreno;
    media.genero = genero;
    media.director = director;
    media.productora = productora;
    media.tipo = tipo;
    media.fechaActualizacion = new Date();

    media = await media.save();
    res.status(200).json(media);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocurrió un error al actualizar la producción');
  }
});

// DELETE - Eliminar una producción
router.delete('/:id', async (req, res) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    if (!media) {
      return res.status(404).send('La producción no existe');
    }
    res.status(200).json({ mensaje: 'Producción eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocurrió un error al eliminar la producción');
  }
});

module.exports = router;