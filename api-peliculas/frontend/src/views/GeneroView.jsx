import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../helper/axios-config';
import Swal from 'sweetalert2';

export const GeneroView = () => {
  const [generos, setGeneros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    estado: 'Activo',
    descripcion: ''
  });

  const getGeneros = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/genero');
      setGeneros(data);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudieron cargar los géneros', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGeneros();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axiosInstance.put(`/genero/${editingId}`, formData);
        Swal.fire('Éxito', 'Género actualizado correctamente', 'success');
      } else {
        await axiosInstance.post('/genero', formData);
        Swal.fire('Éxito', 'Género creado correctamente', 'success');
      }
      setFormData({ nombre: '', estado: 'Activo', descripcion: '' });
      setEditingId(null);
      getGeneros();
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo guardar el género', 'error');
    }
  };

  const handleEdit = (genero) => {
    setEditingId(genero._id);
    setFormData({
      nombre: genero.nombre || '',
      estado: genero.estado || 'Activo',
      descripcion: genero.descripcion || ''
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ nombre: '', estado: 'Activo', descripcion: '' });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">{editingId ? 'Editar Género' : 'Crear Género'}</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Estado</label>
                  <select
                    name="estado"
                    className="form-select"
                    value={formData.estado}
                    onChange={handleChange}
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    name="descripcion"
                    className="form-control"
                    rows="3"
                    value={formData.descripcion}
                    onChange={handleChange}
                  ></textarea>
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

        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">Listado de Géneros</h5>
            </div>
            <div className="card-body table-responsive">
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status"></div>
                </div>
              ) : (
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Estado</th>
                      <th>Descripción</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generos.map((g) => (
                      <tr key={g._id}>
                        <td>{g.nombre}</td>
                        <td>
                          <span className={`badge ${g.estado === 'Activo' ? 'bg-success' : 'bg-secondary'}`}>
                            {g.estado}
                          </span>
                        </td>
                        <td>{g.descripcion}</td>
                        <td>
                          <button className="btn btn-warning btn-sm" onClick={() => handleEdit(g)}>
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
