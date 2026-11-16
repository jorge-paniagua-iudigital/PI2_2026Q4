import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../helper/axios-config';
import Swal from 'sweetalert2';

export const TipoView = () => {
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });

  const getTipos = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/tipo');
      setTipos(data);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudieron cargar los tipos', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTipos();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axiosInstance.put(`/tipo/${editingId}`, formData);
        Swal.fire('Éxito', 'Tipo actualizado correctamente', 'success');
      } else {
        await axiosInstance.post('/tipo', formData);
        Swal.fire('Éxito', 'Tipo creado correctamente', 'success');
      }
      setFormData({ nombre: '', descripcion: '' });
      setEditingId(null);
      getTipos();
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo guardar el tipo', 'error');
    }
  };

  const handleEdit = (tipo) => {
    setEditingId(tipo._id);
    setFormData({
      nombre: tipo.nombre || '',
      descripcion: tipo.descripcion || ''
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ nombre: '', descripcion: '' });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">{editingId ? 'Editar Tipo' : 'Crear Tipo'}</h5>
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
              <h5 className="mb-0">Listado de Tipos</h5>
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
                      <th>Descripción</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tipos.map((t) => (
                      <tr key={t._id}>
                        <td>{t.nombre}</td>
                        <td>{t.descripcion}</td>
                        <td>
                          <button className="btn btn-warning btn-sm" onClick={() => handleEdit(t)}>
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
