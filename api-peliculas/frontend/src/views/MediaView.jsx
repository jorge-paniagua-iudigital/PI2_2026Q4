import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../helper/axios-config';
import Swal from 'sweetalert2';

export const MediaView = () => {
  const [medias, setMedias] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialFormState = {
    serial: '',
    titulo: '',
    sinopsis: '',
    url: '',
    foto: '',
    anioEstreno: '',
    genero: '',
    director: '',
    productora: '',
    tipo: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const getSelectOptions = async () => {
    try {
      const [genRes, dirRes, prodRes, tipRes] = await Promise.all([
        axiosInstance.get('/genero'),
        axiosInstance.get('/director'),
        axiosInstance.get('/productora'),
        axiosInstance.get('/tipo')
      ]);

      setGeneros(genRes.data.filter(g => !g.estado || g.estado.toLowerCase() === 'activo'));
      setDirectores(dirRes.data.filter(d => !d.estado || d.estado.toLowerCase() === 'activo'));
      setProductoras(prodRes.data.filter(p => !p.estado || p.estado.toLowerCase() === 'activo'));
      setTipos(tipRes.data);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudieron cargar las opciones para los formularios', 'error');
    }
  };

  const getMedias = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/media');
      setMedias(data);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudieron cargar las películas y series', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSelectOptions();
    getMedias();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatUrl = (link) => {
    if (!link) return '#';
    if (link.startsWith('http://') || link.startsWith('https://')) {
      return link;
    }
    return `https://${link}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const numAnio = Number(formData.anioEstreno) || formData.anioEstreno;

      const payload = {
        serial: formData.serial,
        titulo: formData.titulo,
        sinopsis: formData.sinopsis,
        url: formData.url,
        urlMedia: formData.url,
        urlPelicula: formData.url,
        link: formData.url,
        foto: formData.foto,
        fotoPortada: formData.foto,
        imagen: formData.foto,
        anioEstreno: numAnio,
        anio: numAnio,
        anoEstreno: numAnio,
        fechaEstreno: numAnio,
        year: numAnio,
        genero: formData.genero,
        director: formData.director,
        productora: formData.productora,
        tipo: formData.tipo
      };

      if (editingId) {
        await axiosInstance.put(`/media/${editingId}`, payload);
        Swal.fire('Éxito', 'Película / Serie actualizada correctamente', 'success');
      } else {
        await axiosInstance.post('/media', payload);
        Swal.fire('Éxito', 'Película / Serie creada correctamente', 'success');
      }
      setFormData(initialFormState);
      setEditingId(null);
      getMedias();
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Error al guardar la información. Verifique que el Serial sea único.', 'error');
    }
  };

  const handleEdit = (media) => {
    setEditingId(media._id);
    setFormData({
      serial: media.serial || '',
      titulo: media.titulo || '',
      sinopsis: media.sinopsis || '',
      url: media.url || media.urlMedia || media.urlPelicula || media.link || '',
      foto: media.foto || media.fotoPortada || media.imagen || '',
      anioEstreno: media.anioEstreno || media.anio || media.anoEstreno || media.fechaEstreno || media.year || '',
      genero: media.genero?._id || media.genero || '',
      director: media.director?._id || media.director || '',
      productora: media.productora?._id || media.productora || '',
      tipo: media.tipo?._id || media.tipo || ''
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(initialFormState);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-4 col-md-5 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">{editingId ? 'Editar Película / Serie' : 'Crear Película / Serie'}</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label className="form-label mb-1">Serial</label>
                  <input
                    type="text"
                    name="serial"
                    className="form-control"
                    value={formData.serial}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label mb-1">Título</label>
                  <input
                    type="text"
                    name="titulo"
                    className="form-control"
                    value={formData.titulo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label mb-1">Sinopsis</label>
                  <textarea
                    name="sinopsis"
                    className="form-control"
                    rows="2"
                    value={formData.sinopsis}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="mb-2">
                  <label className="form-label mb-1">URL Multimedia</label>
                  <input
                    type="text"
                    name="url"
                    className="form-control"
                    placeholder="https://..."
                    value={formData.url}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label mb-1">URL Carátula (Poster 1000x1500)</label>
                  <input
                    type="text"
                    name="foto"
                    className="form-control"
                    placeholder="https://..."
                    value={formData.foto}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label mb-1">Año Estreno</label>
                  <input
                    type="number"
                    name="anioEstreno"
                    className="form-control"
                    value={formData.anioEstreno}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label mb-1">Género</label>
                  <select
                    name="genero"
                    className="form-select"
                    value={formData.genero}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione Género...</option>
                    {generos.map((g) => (
                      <option key={g._id} value={g._id}>{g.nombre}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-2">
                  <label className="form-label mb-1">Director</label>
                  <select
                    name="director"
                    className="form-select"
                    value={formData.director}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione Director...</option>
                    {directores.map((d) => (
                      <option key={d._id} value={d._id}>{d.nombres}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-2">
                  <label className="form-label mb-1">Productora</label>
                  <select
                    name="productora"
                    className="form-select"
                    value={formData.productora}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione Productora...</option>
                    {productoras.map((p) => (
                      <option key={p._id} value={p._id}>{p.nombre}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label mb-1">Tipo</label>
                  <select
                    name="tipo"
                    className="form-select"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione Tipo...</option>
                    {tipos.map((t) => (
                      <option key={t._id} value={t._id}>{t.nombre}</option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-2">
                  {editingId ? 'Actualizar' : 'Guardar'}
                </button>
                {editingId && (
                  <button type="button" className="btn btn-secondary w-100" onClick={handleCancelEdit}>
                    Cancelar Edición
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-8 col-md-7">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">Listado de Películas y Series</h5>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                </div>
              ) : medias.length === 0 ? (
                <div className="alert alert-info text-center mb-0">No hay películas o series registradas</div>
              ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
                  {medias.map((m) => {
                    const mediaUrl = m.url || m.urlMedia || m.urlPelicula || m.link || '';
                    const mediaAnio = m.anioEstreno || m.anio || m.anoEstreno || m.fechaEstreno || m.year || 'N/A';
                    return (
                      <div key={m._id} className="col">
                        <div className="card h-100 shadow-sm overflow-hidden">
                          {/* Formato póster vertical 2:3 (1000x1500) */}
                          <img
                            src={m.foto || m.fotoPortada || m.imagen}
                            className="card-img-top"
                            alt={m.titulo}
                            style={{
                              width: '100%',
                              aspectRatio: '2/3',
                              maxHeight: '450px',
                              objectFit: 'cover'
                            }}
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/1000x1500?text=Poster+1000x1500'; }}
                          />
                          <div className="card-body d-flex flex-column justify-content-between">
                            <div>
                              <h6 className="card-title fw-bold mb-1">{m.titulo} ({mediaAnio})</h6>
                              <p className="card-text text-muted small mb-2" style={{ maxHeight: '3.6em', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {m.sinopsis}
                              </p>
                              <ul className="list-unstyled small mb-3">
                                <li><strong>Serial:</strong> {m.serial}</li>
                                <li><strong>Género:</strong> {m.genero?.nombre || 'N/A'}</li>
                                <li><strong>Director:</strong> {m.director?.nombres || 'N/A'}</li>
                                <li><strong>Productora:</strong> {m.productora?.nombre || 'N/A'}</li>
                                <li><strong>Tipo:</strong> {m.tipo?.nombre || 'N/A'}</li>
                              </ul>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-2">
                              {mediaUrl ? (
                                <a
                                  href={formatUrl(mediaUrl)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-outline-info btn-sm"
                                >
                                  Ver Enlace
                                </a>
                              ) : (
                                <span className="text-muted small">Sin URL</span>
                              )}
                              <button className="btn btn-warning btn-sm" onClick={() => handleEdit(m)}>
                                Editar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
