import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../api/employees';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { saveAuth } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setServerError('');
    setLoading(true);
    try {
      const res = await login(data);
      saveAuth(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al iniciar sesión';
      setServerError(err.response?.status === 401 ? 'Correo o contraseña incorrectos' : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Prueba Tecnica 2026</h1>
        <p className="login-subtitle">Inicia sesión en tu cuenta</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-group">
            <label>Correo electrónico <span className="required">*</span></label>
            <input
              type="email"
              {...register('email', {
                required: 'El correo es requerido',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Ingresa un correo válido' },
              })}
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label>Contraseña <span className="required">*</span></label>
            <input
              type="password"
              {...register('password', { required: 'La contraseña es requerida' })}
            />
            {errors.password && <span className="error">{errors.password.message}</span>}
          </div>

          {serverError && <div className="alert alert-error">{serverError}</div>}

          <button type="submit" disabled={loading} className="btn btn-primary btn-full">
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="login-demo">
          Demo: <code>admin@demo.com</code> / <code>Admin1234!</code>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
