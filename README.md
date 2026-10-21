# API REST de Películas y Series

API REST desarrollada con **Node.js**, **Express** y **MongoDB Atlas** para la gestión de un catálogo de producciones audiovisuales (películas y series), que abarca la administración de Géneros, Directores, Productoras, Tipos y Medias.

## Tecnologías Utilizadas

* **Node.js** - Entorno de ejecución para JavaScript en el servidor.

* **Express.js** - Framework web para la gestión de rutas y middleware.

* **MongoDB Atlas** - Base de datos NoSQL alojada en la nube.

* **Mongoose** - Modelado de objetos para MongoDB y manejo de esquemas.

* **Dotenv** - Gestión segura de variables de entorno.

* **CORS** - Habilitación de peticiones cruzadas para integración con Frontend.

## Estructura del Proyecto

```
api-peliculas/
├── db/
│   └── connect.js         # Configuración y conexión a MongoDB Atlas
├── models/
│   ├── Director.js        # Modelo de datos para Director
│   ├── Genero.js          # Modelo de datos para Género
│   ├── Media.js           # Modelo principal de Películas / Series
│   ├── Productora.js      # Modelo de datos para Productora
│   └── Tipo.js            # Modelo de datos para Tipo (Película/Serie)
├── routes/
│   ├── director.js        # Endpoints CRUD de Director
│   ├── genero.js          # Endpoints CRUD de Género
│   ├── media.js           # Endpoints CRUD de Media (Película/Serie)
│   ├── productora.js      # Endpoints CRUD de Productora
│   └── tipo.js            # Endpoints CRUD de Tipo
├── .env                   # Variables de entorno (local)
├── .gitignore             # Archivos excluidos del control de versiones
├── index.js               # Servidor principal de Express
└── package.json           # Archivo de configuración del proyecto y dependencias

```

## Instalación y Configuración

### 1. Clonar el repositorio

```
git clone https://github.com/TU_USUARIO/api-peliculas.git
cd api-peliculas

```

### 2. Instalar dependencias

```
npm install

```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con la siguiente estructura:

```
PORT=3000
MONGO_URI=mongodb+srv://<tu_usuario>:<tu_contrasena>@cluster0.tqagvqv.mongodb.net/peliculas-db?retryWrites=true&w=majority

```

### 4. Iniciar el servidor

```
node index.js

```

El servidor estará corriendo en `http://localhost:3000`.

## Endpoints de la API

| Módulo | Método | Endpoint | Descripción | 
| ----- | ----- | ----- | ----- | 
| **Género** | `GET` | `/genero` | Listar todos los géneros | 
|  | `POST` | `/genero` | Crear un nuevo género | 
|  | `PUT` | `/genero/:id` | Actualizar un género por ID | 
| **Director** | `GET` | `/director` | Listar todos los directores | 
|  | `POST` | `/director` | Crear un nuevo director | 
|  | `PUT` | `/director/:id` | Actualizar un director por ID | 
| **Productora** | `GET` | `/productora` | Listar todas las productoras | 
|  | `POST` | `/productora` | Crear una nueva productora | 
|  | `PUT` | `/productora/:id` | Actualizar una productora por ID | 
| **Tipo** | `GET` | `/tipo` | Listar todos los tipos | 
|  | `POST` | `/tipo` | Crear un nuevo tipo | 
|  | `PUT` | `/tipo/:id` | Actualizar un tipo por ID | 
| **Media** | `GET` | `/media` | Listar todas las producciones (con datos poblados) | 
|  | `POST` | `/media` | Crear una nueva película o serie | 
|  | `PUT` | `/media/:id` | Actualizar una película o serie por ID | 
|  | `DELETE` | `/media/:id` | Eliminar una producción por ID | 

## Reglas de Negocio Implementadas

1. **Unicidad:** Los campos `serial` y `url` en el módulo **Media** son únicos.

2. **Validación de Estado Activo:** Para asociar un *Género*, *Director* o *Productora* a una película o serie, estos deben existir previamente en la base de datos y su estado debe ser **"Activo"**.

3. **Cruce de Datos (`populate`):** La consulta `GET /media` expone los datos completos de los modelos referenciados (`genero`, `director`, `productora`, `tipo`).

## Ejemplo de Payload (`POST /media`)

```
{
  "serial": "SER-001",
  "titulo": "Oppenheimer",
  "sinopsis": "La historia del físico J. Robert Oppenheimer...",
  "url": "https://cuevana3.nu/pelicula/oppenheimer",
  "imagen": "https://imagen-de-portada.jpg",
  "anoEstreno": 2023,
  "genero": "6ad8321d1896ab2dec8cab55",
  "director": "6ad832571896ab2dec8cab56",
  "productora": "6ad832811896ab2dec8cab57",
  "tipo": "6ad8329c1896ab2dec8cab58"
}

```

## Desarrollado por

* **Jorge Paniagua**
