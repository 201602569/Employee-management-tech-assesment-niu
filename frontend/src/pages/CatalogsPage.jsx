import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import LogoutModal from '../components/LogoutModal';
import DeleteModal from '../components/DeleteModal';
import {
  getDepartments, createDepartment, updateDepartment, deleteDepartment,
  getRoles, createRole, updateRole, deleteRole,
} from '../api/employees';

const NameModal = ({ title, defaultValue, onSave, onCancel, loading }) => {
  const [name, setName] = useState(defaultValue || '');
  const handleKey = (e) => { if (e.key === 'Enter') onSave(name); };
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <h2>{title}</h2>
        <div className="form-group">
          <label>Nombre <span className="required">*</span></label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKey}
            autoFocus
          />
        </div>
        <div className="modal-actions">
          <button onClick={onCancel} className="btn btn-secondary">Cancelar</button>
          <button
            onClick={() => onSave(name)}
            disabled={loading || !name.trim()}
            className="btn btn-primary"
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  );
};

const CatalogSection = ({ title, items, onAdd, onEdit, onDelete, isAdmin }) => (
  <div className="catalog-section">
    <div className="catalog-section-header">
      <h2>{title}</h2>
      {isAdmin && (
        <button onClick={onAdd} className="btn btn-primary">+ Agregar</button>
      )}
    </div>
    <div className="table-wrapper">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Nombre</th>
            {isAdmin && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              {isAdmin && (
                <td>
                  <button onClick={() => onEdit(item)} className="btn btn-sm btn-secondary">Editar</button>
                  <button onClick={() => onDelete(item)} className="btn btn-sm btn-danger">Eliminar</button>
                </td>
              )}
            </tr>
          ))}
          {items.length === 0 && (
            <tr><td colSpan={isAdmin ? 2 : 1} className="empty">Sin registros</td></tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const CatalogsPage = () => {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchAll = () => {
    getDepartments().then((r) => setDepartments(r.data));
    getRoles().then((r) => setRoles(r.data));
  };

  useEffect(() => { fetchAll(); }, []);

  const handleSaveDept = async (name) => {
    setSaving(true);
    try {
      if (modal.item) {
        await updateDepartment(modal.item.id, { name });
        toast.success('Departamento actualizado');
      } else {
        await createDepartment({ name });
        toast.success('Departamento creado');
      }
      setModal(null);
      fetchAll();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al guardar departamento');
    } finally { setSaving(false); }
  };

  const handleDeleteDept = async () => {
    try {
      await deleteDepartment(modal.item.id);
      toast.success('Departamento eliminado');
      setModal(null);
      fetchAll();
    } catch (err) {
      toast.error(err.response?.data?.message || 'No se puede eliminar, tiene empleados asignados');
      setModal(null);
    }
  };

  const handleSaveRole = async (name) => {
    setSaving(true);
    try {
      if (modal.item) {
        await updateRole(modal.item.id, { name });
        toast.success('Puesto actualizado');
      } else {
        await createRole({ name });
        toast.success('Puesto creado');
      }
      setModal(null);
      fetchAll();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al guardar puesto');
    } finally { setSaving(false); }
  };

  const handleDeleteRole = async () => {
    try {
      await deleteRole(modal.item.id);
      toast.success('Puesto eliminado');
      setModal(null);
      fetchAll();
    } catch (err) {
      toast.error(err.response?.data?.message || 'No se puede eliminar, tiene empleados asignados');
      setModal(null);
    }
  };

  return (
    <div className="page">
      <header className="page-header">
        <h1>Catálogos</h1>
        <div className="header-actions">
          <Link to="/" className="btn btn-secondary">← Dashboard</Link>
          <Link to="/employees" className="btn btn-secondary">Empleados</Link>
          <span className="user-info">
            Sesión como <strong>{user?.name}</strong> · <span className="role-badge">{user?.role}</span>
          </span>
          <button onClick={() => setModal({ type: 'logout' })} className="btn btn-ghost">Cerrar sesión</button>
        </div>
      </header>

      {!isAdmin && (
        <p style={{ color: '#9ca3af', marginBottom: '1rem', fontSize: '14px' }}>
          Modo solo lectura — solo los administradores pueden crear, editar o eliminar catálogos.
        </p>
      )}

      <div className="catalogs-grid">
        <CatalogSection
          title="Departamentos"
          items={departments}
          isAdmin={isAdmin}
          onAdd={() => setModal({ type: 'dept', item: null })}
          onEdit={(item) => setModal({ type: 'dept', item })}
          onDelete={(item) => setModal({ type: 'delete-dept', item })}
        />
        <CatalogSection
          title="Puestos"
          items={roles}
          isAdmin={isAdmin}
          onAdd={() => setModal({ type: 'role', item: null })}
          onEdit={(item) => setModal({ type: 'role', item })}
          onDelete={(item) => setModal({ type: 'delete-role', item })}
        />
      </div>

      {modal?.type === 'dept' && (
        <NameModal
          title={modal.item ? 'Editar departamento' : 'Nuevo departamento'}
          defaultValue={modal.item?.name}
          onSave={handleSaveDept}
          onCancel={() => setModal(null)}
          loading={saving}
        />
      )}

      {modal?.type === 'role' && (
        <NameModal
          title={modal.item ? 'Editar puesto' : 'Nuevo puesto'}
          defaultValue={modal.item?.name}
          onSave={handleSaveRole}
          onCancel={() => setModal(null)}
          loading={saving}
        />
      )}

      {modal?.type === 'delete-dept' && (
        <DeleteModal
          name={modal.item.name}
          onConfirm={handleDeleteDept}
          onCancel={() => setModal(null)}
        />
      )}

      {modal?.type === 'delete-role' && (
        <DeleteModal
          name={modal.item.name}
          onConfirm={handleDeleteRole}
          onCancel={() => setModal(null)}
        />
      )}

      {modal?.type === 'logout' && (
        <LogoutModal onConfirm={logout} onCancel={() => setModal(null)} />
      )}
    </div>
  );
};

export default CatalogsPage;
