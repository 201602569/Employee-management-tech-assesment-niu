import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getDepartments } from '../api/employees';

const PHONE_REGEX = /^\d{7,15}$/;

const EmployeeForm = ({ defaultValues, onSubmit, onCancel, loading }) => {
  const [departments, setDepartments] = useState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues });

  useEffect(() => {
    getDepartments().then((r) => setDepartments(r.data));
  }, []);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="employee-form" noValidate>
      <div className="form-row">
        <div className="form-group">
          <label>First Name <span className="required">*</span></label>
          <input {...register('first_name', { required: 'First name is required' })} />
          {errors.first_name && <span className="error">{errors.first_name.message}</span>}
        </div>
        <div className="form-group">
          <label>Last Name <span className="required">*</span></label>
          <input {...register('last_name', { required: 'Last name is required' })} />
          {errors.last_name && <span className="error">{errors.last_name.message}</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Email <span className="required">*</span></label>
        <input type="email" {...register('email', {
          required: 'Email is required',
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
        })} />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input {...register('phone', {
          pattern: { value: PHONE_REGEX, message: 'Phone must be 7-15 digits only' },
        })} />
        {errors.phone && <span className="error">{errors.phone.message}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Department</label>
          <select {...register('department_id')}>
            <option value="">-- Select --</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select {...register('status')}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Hire Date</label>
        <input type="date" {...register('hire_date')} />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
