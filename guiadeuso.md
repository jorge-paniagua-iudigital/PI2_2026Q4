# Guia de Uso e Integracion - API REST de Peliculas y Series

## Informacion General

- **URL Base Local:** `http://localhost:3000`
- **Formato de datos:** JSON (`Content-Type: application/json`)
- **Autenticacion:** No requerida.

---

## Flujo Recomendado de Ejecucion

Para registrar un elemento en el modulo **Media**, es necesario haber registrado previamente al menos un **Genero**, un **Director**, una **Productora** y un **Tipo**, puesto que la API valida la existencia y el estado activo de las referencias.

1. Registrar un Genero (`POST /genero`)
2. Registrar un Director (`POST /director`)
3. Registrar una Productora (`POST /productora`)
4. Registrar un Tipo (`POST /tipo`)
5. Registrar la Pelicula o Serie (`POST /media`) utilizando los IDs generados previamente.

---

## Modulo 1: Genero (`/genero`)

### 1. Obtener todos los generos
- **Metodo:** `GET`
- **URL:** `http://localhost:3000/genero`
- **Respuesta exitosa (200 OK):**
```json
[
  {
    "_id": "60c72b2f9b1d8b0015f8a001",
    "nombre": "Accion",
    "descripcion": "Descripcion del genero",
    "estado": "Activo",
    "fechaCreacion": "2026-01-01T00:00:00.000Z",
    "fechaActualizacion": "2026-01-01T00:00:00.000Z"
  }
]
```

### 2. Crear un genero
- **Metodo:** `POST`
- **URL:** `http://localhost:3000/genero`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "nombre": "Accion",
  "descripcion": "Descripcion del genero",
  "estado": "Activo"
}
```
- **Respuesta exitosa (201 Created):**
```json
{
  "_id": "60c72b2f9b1d8b0015f8a001",
  "nombre": "Accion",
  "descripcion": "Descripcion del genero",
  "estado": "Activo",
  "fechaCreacion": "2026-01-01T00:00:00.000Z",
  "fechaActualizacion": "2026-01-01T00:00:00.000Z"
}
```

### 3. Actualizar un genero
- **Metodo:** `PUT`
- **URL:** `http://localhost:3000/genero/:id`
- **Body:**
```json
{
  "nombre": "Accion y Aventura",
  "descripcion": "Nueva descripcion del genero",
  "estado": "Activo"
}
```

---

## Modulo 2: Director (`/director`)

### 1. Obtener todos los directores
- **Metodo:** `GET`
- **URL:** `http://localhost:3000/director`

### 2. Crear un director
- **Metodo:** `POST`
- **URL:** `http://localhost:3000/director`
- **Body:**
```json
{
  "nombres": "Nombre del Director",
  "estado": "Activo"
}
```
- **Respuesta exitosa (201 Created):**
```json
{
  "_id": "60c72b2f9b1d8b0015f8a002",
  "nombres": "Nombre del Director",
  "estado": "Activo",
  "fechaCreacion": "2026-01-01T00:00:00.000Z",
  "fechaActualizacion": "2026-01-01T00:00:00.000Z"
}
```

### 3. Actualizar un director
- **Metodo:** `PUT`
- **URL:** `http://localhost:3000/director/:id`

---

## Modulo 3: Productora (`/productora`)

### 1. Obtener todas las productoras
- **Metodo:** `GET`
- **URL:** `http://localhost:3000/productora`

### 2. Crear una productora
- **Metodo:** `POST`
- **URL:** `http://localhost:3000/productora`
- **Body:**
```json
{
  "nombre": "Nombre Productora",
  "slogan": "Slogan de la productora",
  "descripcion": "Descripcion de la productora",
  "estado": "Activo"
}
```
- **Respuesta exitosa (201 Created):**
```json
{
  "_id": "60c72b2f9b1d8b0015f8a003",
  "nombre": "Nombre Productora",
  "slogan": "Slogan de la productora",
  "descripcion": "Descripcion de la productora",
  "estado": "Activo",
  "fechaCreacion": "2026-01-01T00:00:00.000Z",
  "fechaActualizacion": "2026-01-01T00:00:00.000Z"
}
```

### 3. Actualizar una productora
- **Metodo:** `PUT`
- **URL:** `http://localhost:3000/productora/:id`

---

## Modulo 4: Tipo (`/tipo`)

### 1. Obtener todos los tipos
- **Metodo:** `GET`
- **URL:** `http://localhost:3000/tipo`

### 2. Crear un tipo
- **Metodo:** `POST`
- **URL:** `http://localhost:3000/tipo`
- **Body:**
```json
{
  "nombre": "Pelicula",
  "descripcion": "Descripcion del tipo"
}
```
- **Respuesta exitosa (201 Created):**
```json
{
  "_id": "60c72b2f9b1d8b0015f8a004",
  "nombre": "Pelicula",
  "descripcion": "Descripcion del tipo",
  "fechaCreacion": "2026-01-01T00:00:00.000Z",
  "fechaActualizacion": "2026-01-01T00:00:00.000Z"
}
```

### 3. Actualizar un tipo
- **Metodo:** `PUT`
- **URL:** `http://localhost:3000/tipo/:id`

---

## Modulo 5: Media (`/media`)

### 1. Obtener todas las producciones (con datos poblados)
- **Metodo:** `GET`
- **URL:** `http://localhost:3000/media`
- **Respuesta exitosa (200 OK):**
```json
[
  {
    "_id": "60c72b2f9b1d8b0015f8a005",
    "serial": "SER-001",
    "titulo": "Titulo de Ejemplo",
    "sinopsis": "Sinopsis detallada del contenido...",
    "url": "https://ejemplo.com/media/contenido",
    "imagen": "https://ejemplo.com/imagenes/portada.jpg",
    "anoEstreno": 2026,
    "genero": {
      "_id": "60c72b2f9b1d8b0015f8a001",
      "nombre": "Accion",
      "estado": "Activo"
    },
    "director": {
      "_id": "60c72b2f9b1d8b0015f8a002",
      "nombres": "Nombre del Director",
      "estado": "Activo"
    },
    "productora": {
      "_id": "60c72b2f9b1d8b0015f8a003",
      "nombre": "Nombre Productora",
      "estado": "Activo"
    },
    "tipo": {
      "_id": "60c72b2f9b1d8b0015f8a004",
      "nombre": "Pelicula"
    },
    "fechaCreacion": "2026-01-01T00:00:00.000Z",
    "fechaActualizacion": "2026-01-01T00:00:00.000Z"
  }
]
```

### 2. Crear una nueva produccion (Pelicula / Serie)
- **Metodo:** `POST`
- **URL:** `http://localhost:3000/media`
- **Body:**
```json
{
  "serial": "SER-001",
  "titulo": "Titulo de Ejemplo",
  "sinopsis": "Sinopsis detallada del contenido...",
  "url": "https://ejemplo.com/media/contenido",
  "imagen": "https://ejemplo.com/imagenes/portada.jpg",
  "anoEstreno": 2026,
  "genero": "60c72b2f9b1d8b0015f8a001",
  "director": "60c72b2f9b1d8b0015f8a002",
  "productora": "60c72b2f9b1d8b0015f8a003",
  "tipo": "60c72b2f9b1d8b0015f8a004"
}
```

### 3. Actualizar una produccion
- **Metodo:** `PUT`
- **URL:** `http://localhost:3000/media/:id`

### 4. Eliminar una produccion
- **Metodo:** `DELETE`
- **URL:** `http://localhost:3000/media/:id`
- **Respuesta exitosa (200 OK):**
```json
{
  "mensaje": "Produccion eliminada correctamente"
}
```

---

## Codigos de Respuesta HTTP

- **200 OK:** Peticion procesada con exito.
- **201 Created:** Recurso creado exitosamente.
- **400 Bad Request:** Datos faltantes, repetidos (serial/url) o referencia inactiva.
- **404 Not Found:** Recurso o ruta no encontrada.
- **500 Internal Server Error:** Error interno en la base de datos o servidor.