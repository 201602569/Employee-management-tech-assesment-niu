require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const errorHandler = require('./middlewares/errorHandler');
const swaggerSpec = require('./config/swagger');

const authRoutes = require('./routes/auth.routes');
const employeeRoutes = require('./routes/employee.routes');
const departmentRoutes = require('./routes/department.routes');
const roleRoutes = require('./routes/role.routes');
const statsRoutes = require('./routes/stats.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/stats', statsRoutes);

app.use(errorHandler);

module.exports = app;
