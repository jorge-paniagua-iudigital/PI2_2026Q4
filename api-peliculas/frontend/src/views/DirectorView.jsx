import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../helper/axios-config';
import Swal from 'sweetalert2';

export const DirectorView = () => {
  const [directores, setDirectores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombres: '',
    estado: 'Activo'
  });

  const getDirectores = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/director');
      setDirectores(data);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudieron cargar los directores', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDirectores();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axiosInstance.put(`/director/${editingId}`, formData);
        Swal.fire('Éxito', 'Director actualizado correctamente', 'success');
      } else {
        await axiosInstance.post('/director', formData);
        Swal.fire('Éxito', 'Director creado correctamente', 'success');
      }
      setFormData({ nombres: '', estado: 'Activo' });
      setEditingId(null);
      getDirectores();
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo guardar el director', 'error');
    }
  };

  const handleEdit = (director) => {
    setEditingId(director._id);
    setFormData({
      nombres: director.nombres || '',
      estado: director.estado || 'Activo'
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ nombres: '', estado: 'Activo' });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">{editingId ? 'Editar Director' : 'Crear Director'}</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombres</label>
                  <input
                    type="text"
                    name="nombres"
                    className="form-control"
                    value={formData.nombres}
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
              <h5 className="mb-0">Listado de Directores</h5>
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
                      <th>Nombres</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {directores.map((d) => (
                      <tr key={d._id}>
                        <td>{d.nombres}</td>
                        <td>
                          <span className={`badge ${d.estado === 'Activo' ? 'bg-success' : 'bg-secondary'}`}>
                            {d.estado}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-warning btn-sm" onClick={() => handleEdit(d)}>
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
