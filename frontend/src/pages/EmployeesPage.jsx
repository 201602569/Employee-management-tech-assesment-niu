import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getEmployees, getDepartments, createEmployee, updateEmployee, deleteEmployee } from '../api/employees';
import { useAuth } from '../context/AuthContext';
import useDebounce from '../hooks/useDebounce';
import EmployeeForm from '../components/EmployeeForm';
import DeleteModal from '../components/DeleteModal';

const EmployeesPage = () => {
  const { user, logout } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [modal, setModal] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 300);

  const fetchEmployees = useCallback(async () => {
    const params = { page, limit: 10 };
    if (debouncedSearch) params.search = debouncedSearch;
    if (departmentFilter) params.department_id = departmentFilter;
    if (statusFilter) params.status = statusFilter;
    const res = await getEmployees(params);
    setEmployees(res.data.data);
    setPagination({ page: res.data.page, totalPages: res.data.totalPages, total: res.data.total });
  }, [page, debouncedSearch, departmentFilter, statusFilter]);

  useEffect(() => { fetchEmployees(); }, [fetchEmployees]);
  useEffect(() => { getDepartments().then((r) => setDepartments(r.data)); }, []);
  useEffect(() => { setPage(1); }, [debouncedSearch, departmentFilter, statusFilter]);

  const handleCreate = async (data) => {
    setFormLoading(true);
    try {
      await createEmployee(data);
      setModal(null);
      fetchEmployees();
      toast.success('Empleado creado exitosamente');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al crear el empleado');
    } finally { setFormLoading(false); }
  };

  const handleUpdate = async (data) => {
    setFormLoading(true);
    try {
      await updateEmployee(modal.data.id, data);
      setModal(null);
      fetchEmployees();
      toast.success('Empleado actualizado exitosamente');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al actualizar el empleado');
    } finally { setFormLoading(false); }
  };

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) logout();
  };

  const handleDelete = async () => {
    try {
      await deleteEmployee(modal.data.id);
      setModal(null);
      fetchEmployees();
      toast.success('Empleado eliminado');
    } catch {
      toast.error('Error al eliminar el empleado');
    }
  };

  return (
    <div className="page">
      <header className="page-header">
        <h1>Empleados</h1>
        <div className="header-actions">
          <Link to="/" className="btn btn-secondary">← Dashboard</Link>
          <span className="user-info">Sesión como <strong>{user?.name}</strong> · <span className="role-badge">{user?.role}</span></span>
          <button onClick={handleLogout} className="btn btn-ghost">Cerrar sesión</button>
          {user?.role === 'admin' && (
            <button onClick={() => setModal({ type: 'form', data: null })} className="btn btn-primary">
              + Nuevo empleado
            </button>
          )}
        </div>
      </header>

      <div className="filters">
        <input
          placeholder="Buscar por nombre o correo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
          <option value="">Todos los departamentos</option>
          {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Todos los estados</option>
          <option value="active">Activo</option>
          <option value="inactive">Inactivo</option>
        </select>
      </div>

      <p className="results-count">{pagination.total} empleado{pagination.total !== 1 ? 's' : ''} encontrado{pagination.total !== 1 ? 's' : ''}</p>

      {/* Desktop table */}
      <div className="table-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Nombre</th><th>Correo</th><th>Departamento</th><th>Cargo</th><th>Estado</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.first_name} {emp.last_name}</td>
                <td>{emp.email}</td>
                <td>{emp.department?.name || '—'}</td>
                <td>{emp.role?.name || '—'}</td>
                <td><span className={`badge badge-${emp.status}`}>{emp.status === 'active' ? 'Activo' : 'Inactivo'}</span></td>
                <td>
                  {user?.role === 'admin' && <>
                    <button onClick={() => setModal({ type: 'form', data: emp })} className="btn btn-sm btn-secondary">Editar</button>
                    <button onClick={() => setModal({ type: 'delete', data: emp })} className="btn btn-sm btn-danger">Eliminar</button>
                  </>}
                  {user?.role !== 'admin' && <span style={{color:'#9ca3af', fontSize:'13px'}}>Solo lectura</span>}
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr><td colSpan="6" className="empty">No se encontraron empleados</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="employee-cards">
        {employees.map((emp) => (
          <div key={emp.id} className="employee-card">
            <div className="card-header">
              <strong>{emp.first_name} {emp.last_name}</strong>
              <span className={`badge badge-${emp.status}`}>{emp.status === 'active' ? 'Activo' : 'Inactivo'}</span>
            </div>
            <p>{emp.email}</p>
            <p>{emp.department?.name} · {emp.role?.name}</p>
            {user?.role === 'admin' && (
              <div className="card-actions">
                <button onClick={() => setModal({ type: 'form', data: emp })} className="btn btn-sm btn-secondary">Editar</button>
                <button onClick={() => setModal({ type: 'delete', data: emp })} className="btn btn-sm btn-danger">Eliminar</button>
              </div>
            )}
          </div>
        ))}
        {employees.length === 0 && <p className="empty">No se encontraron empleados</p>}
      </div>

      <div className="pagination">
        <button onClick={() => setPage((p) => p - 1)} disabled={page <= 1} className="btn btn-ghost">← Anterior</button>
        <span>Página {pagination.page} de {pagination.totalPages}</span>
        <button onClick={() => setPage((p) => p + 1)} disabled={page >= pagination.totalPages} className="btn btn-ghost">Siguiente →</button>
      </div>

      {modal?.type === 'form' && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{modal.data ? 'Editar empleado' : 'Nuevo empleado'}</h2>
            <EmployeeForm
              defaultValues={modal.data || {}}
              onSubmit={modal.data ? handleUpdate : handleCreate}
              onCancel={() => setModal(null)}
              loading={formLoading}
            />
          </div>
        </div>
      )}

      {modal?.type === 'delete' && (
        <DeleteModal
          name={`${modal.data.first_name} ${modal.data.last_name}`}
          onConfirm={handleDelete}
          onCancel={() => setModal(null)}
        />
      )}
    </div>
  );
};

export default EmployeesPage;
