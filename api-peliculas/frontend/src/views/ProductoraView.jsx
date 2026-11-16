import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../helper/axios-config';
import Swal from 'sweetalert2';

export const ProductoraView = () => {
  const [productoras, setProductoras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    estado: 'Activo',
    slogan: '',
    descripcion: ''
  });

  const getProductoras = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/productora');
      setProductoras(data);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudieron cargar las productoras', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductoras();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axiosInstance.put(`/productora/${editingId}`, formData);
        Swal.fire('Éxito', 'Productora actualizada correctamente', 'success');
      } else {
        await axiosInstance.post('/productora', formData);
        Swal.fire('Éxito', 'Productora creada correctamente', 'success');
      }
      setFormData({ nombre: '', estado: 'Activo', slogan: '', descripcion: '' });
      setEditingId(null);
      getProductoras();
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo guardar la productora', 'error');
    }
  };

  const handleEdit = (productora) => {
    setEditingId(productora._id);
    setFormData({
      nombre: productora.nombre || '',
      estado: productora.estado || 'Activo',
      slogan: productora.slogan || '',
      descripcion: productora.descripcion || ''
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ nombre: '', estado: 'Activo', slogan: '', descripcion: '' });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">{editingId ? 'Editar Productora' : 'Crear Productora'}</h5>
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
                  <label className="form-label">Slogan</label>
                  <input
                    type="text"
                    name="slogan"
                    className="form-control"
                    value={formData.slogan}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    name="descripcion"
                    className="form-control"
                    rows="2"
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
              <h5 className="mb-0">Listado de Productoras</h5>
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
                      <th>Slogan</th>
                      <th>Descripción</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productoras.map((p) => (
                      <tr key={p._id}>
                        <td>{p.nombre}</td>
                        <td>
                          <span className={`badge ${p.estado === 'Activo' ? 'bg-success' : 'bg-secondary'}`}>
                            {p.estado}
                          </span>
                        </td>
                        <td>{p.slogan}</td>
                        <td>{p.descripcion}</td>
                        <td>
                          <button className="btn btn-warning btn-sm" onClick={() => handleEdit(p)}>
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
