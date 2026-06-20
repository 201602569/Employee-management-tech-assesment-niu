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
      const msg = err.response?.data?.message || 'Login failed';
      setServerError(err.response?.status === 401 ? 'Invalid email or password' : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Employee Management</h1>
        <p className="login-subtitle">Sign in to your account</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-group">
            <label>Email <span className="required">*</span></label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
              })}
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label>Password <span className="required">*</span></label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <span className="error">{errors.password.message}</span>}
          </div>

          {serverError && <div className="alert alert-error">{serverError}</div>}

          <button type="submit" disabled={loading} className="btn btn-primary btn-full">
            {loading ? 'Signing in...' : 'Sign In'}
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
