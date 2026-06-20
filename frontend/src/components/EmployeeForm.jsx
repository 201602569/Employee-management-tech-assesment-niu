import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getDepartments, getRoles } from '../api/employees';

const PHONE_REGEX = /^\d{7,15}$/;

const EmployeeForm = ({ defaultValues, onSubmit, onCancel, loading }) => {
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues });

  useEffect(() => {
    getDepartments().then((r) => setDepartments(r.data));
    getRoles().then((r) => setRoles(r.data));
  }, []);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="employee-form" noValidate>
      <div className="form-row">
        <div className="form-group">
          <label>Nombre <span className="required">*</span></label>
          <input {...register('first_name', { required: 'El nombre es requerido' })} />
          {errors.first_name && <span className="error">{errors.first_name.message}</span>}
        </div>
        <div className="form-group">
          <label>Apellido <span className="required">*</span></label>
          <input {...register('last_name', { required: 'El apellido es requerido' })} />
          {errors.last_name && <span className="error">{errors.last_name.message}</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Correo electrónico <span className="required">*</span></label>
        <input type="email" {...register('email', {
          required: 'El correo es requerido',
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Ingresa un correo válido' },
        })} />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label>Teléfono</label>
        <input {...register('phone', {
          pattern: { value: PHONE_REGEX, message: 'El teléfono debe ser numérico (7-15 dígitos)' },
        })} />
        {errors.phone && <span className="error">{errors.phone.message}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Departamento</label>
          <select {...register('department_id')}>
            <option value="">-- Seleccionar --</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Cargo</label>
          <select {...register('role_id')}>
            <option value="">-- Seleccionar --</option>
            {roles.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Estado</label>
          <select {...register('status')}>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </select>
        </div>
        <div className="form-group">
          <label>Fecha de contratación</label>
          <input type="date" {...register('hire_date')} />
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-secondary">Cancelar</button>
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
