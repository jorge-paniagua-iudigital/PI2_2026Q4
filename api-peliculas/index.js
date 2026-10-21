const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { getConnection } = require('./db/connect');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Iniciar conexión con la base de datos
getConnection();

// Cargar Rutas de la API
app.use('/genero', require('./routes/genero'));
app.use('/director', require('./routes/director'));
app.use('/productora', require('./routes/productora'));
app.use('/tipo', require('./routes/tipo'));
app.use('/media', require('./routes/media'));

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('API REST de Películas funcionando');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});