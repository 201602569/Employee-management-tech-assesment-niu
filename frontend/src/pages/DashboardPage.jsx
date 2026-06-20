import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { getStats } from '../api/employees';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import LogoutModal from '../components/LogoutModal';

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#14b8a6'];

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [showLogout, setShowLogout] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => { getStats().then((r) => setStats(r.data)); }, []);

  if (!stats) return <div className="page"><p>Cargando dashboard...</p></div>;

  const statusData = [
    { name: 'Activos', value: stats.active },
    { name: 'Inactivos', value: stats.inactive },
  ];

  return (
    <div className="page">
      <header className="page-header">
        <h1>Dashboard</h1>
        <div className="header-actions">
          <Link to="/employees" className="btn btn-secondary">Gestionar empleados</Link>
          <span className="user-info">Sesión como <strong>{user?.name}</strong></span>
          <button onClick={() => setShowLogout(true)} className="btn btn-ghost">Cerrar sesión</button>
        </div>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total de empleados</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat-card stat-card--green">
          <span className="stat-label">Activos</span>
          <span className="stat-value">{stats.active}</span>
        </div>
        <div className="stat-card stat-card--red">
          <span className="stat-label">Inactivos</span>
          <span className="stat-value">{stats.inactive}</span>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Empleados por departamento</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={stats.byDepartment} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
              <XAxis dataKey="name" angle={-35} textAnchor="end" interval={0} tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Activos vs Inactivos</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {statusData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {showLogout && (
        <LogoutModal onConfirm={logout} onCancel={() => setShowLogout(false)} />
      )}
    </div>
  );
};

export default DashboardPage;
