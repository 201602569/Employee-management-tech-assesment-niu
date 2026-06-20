import api from './axios';

export const getEmployees = (params) => api.get('/employees', { params });
export const getEmployee = (id) => api.get(`/employees/${id}`);
export const createEmployee = (data) => api.post('/employees', data);
export const updateEmployee = (id, data) => api.put(`/employees/${id}`, data);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);
export const getDepartments = () => api.get('/departments');
export const getStats = () => api.get('/stats');
export const login = (data) => api.post('/auth/login', data);
