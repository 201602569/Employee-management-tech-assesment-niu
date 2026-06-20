const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Employee Management API',
      version: '1.0.0',
      description: 'API REST para gestión de empleados — NIU Solutions',
    },
    servers: [{ url: 'http://localhost:3000/api', description: 'Local' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Employee: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            status: { type: 'string', enum: ['active', 'inactive'] },
            department_id: { type: 'integer' },
            role_id: { type: 'integer' },
            hire_date: { type: 'string', format: 'date' },
            department: { type: 'object', properties: { id: { type: 'integer' }, name: { type: 'string' } } },
            role: { type: 'object', properties: { id: { type: 'integer' }, name: { type: 'string' } } },
          },
        },
        PaginatedEmployees: {
          type: 'object',
          properties: {
            data: { type: 'array', items: { $ref: '#/components/schemas/Employee' } },
            total: { type: 'integer' },
            page: { type: 'integer' },
            totalPages: { type: 'integer' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'boolean', example: true },
            message: { type: 'string' },
          },
        },
      },
    },
    paths: {
      '/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Iniciar sesión',
          description: 'Retorna un JWT con expiración de 15 minutos. Máximo 5 intentos por minuto por IP.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: { type: 'string', format: 'email', example: 'admin@demo.com' },
                    password: { type: 'string', example: 'Admin1234!' },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Login exitoso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      token: { type: 'string' },
                      user: { type: 'object', properties: { id: { type: 'integer' }, name: { type: 'string' }, email: { type: 'string' }, role: { type: 'string' } } },
                    },
                  },
                },
              },
            },
            401: { description: 'Credenciales inválidas', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
            429: { description: 'Demasiados intentos', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
      },
      '/employees': {
        get: {
          tags: ['Employees'],
          summary: 'Listar empleados',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
            { name: 'search', in: 'query', schema: { type: 'string' }, description: 'Buscar por nombre o correo' },
            { name: 'department_id', in: 'query', schema: { type: 'integer' } },
            { name: 'status', in: 'query', schema: { type: 'string', enum: ['active', 'inactive'] } },
          ],
          responses: {
            200: { description: 'Lista paginada de empleados', content: { 'application/json': { schema: { $ref: '#/components/schemas/PaginatedEmployees' } } } },
            401: { description: 'No autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
        post: {
          tags: ['Employees'],
          summary: 'Crear empleado',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['first_name', 'last_name', 'email'],
                  properties: {
                    first_name: { type: 'string', example: 'Carlos' },
                    last_name: { type: 'string', example: 'Mendoza' },
                    email: { type: 'string', format: 'email', example: 'carlos@empresa.com' },
                    phone: { type: 'string', example: '50240001234' },
                    status: { type: 'string', enum: ['active', 'inactive'], default: 'active' },
                    department_id: { type: 'integer', example: 1 },
                    role_id: { type: 'integer', example: 1 },
                    hire_date: { type: 'string', format: 'date', example: '2024-01-15' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Empleado creado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Employee' } } } },
            400: { description: 'Validación fallida', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
            409: { description: 'Email ya en uso', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
      },
      '/employees/{id}': {
        get: {
          tags: ['Employees'],
          summary: 'Obtener empleado por ID',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: {
            200: { description: 'Empleado encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Employee' } } } },
            404: { description: 'No encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
        put: {
          tags: ['Employees'],
          summary: 'Actualizar empleado',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Employee' } } },
          },
          responses: {
            200: { description: 'Empleado actualizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Employee' } } } },
            404: { description: 'No encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
        delete: {
          tags: ['Employees'],
          summary: 'Eliminar empleado (soft delete)',
          description: 'Marca el registro con deleted_at, no lo elimina físicamente.',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: {
            204: { description: 'Eliminado exitosamente' },
            404: { description: 'No encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
      },
      '/departments': {
        get: {
          tags: ['Departments'],
          summary: 'Listar departamentos',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Lista de departamentos', content: { 'application/json': { schema: { type: 'array', items: { type: 'object', properties: { id: { type: 'integer' }, name: { type: 'string' } } } } } } },
          },
        },
      },
      '/stats': {
        get: {
          tags: ['Stats'],
          summary: 'Métricas del dashboard',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'Estadísticas generales',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      total: { type: 'integer' },
                      active: { type: 'integer' },
                      inactive: { type: 'integer' },
                      byDepartment: { type: 'array', items: { type: 'object', properties: { id: { type: 'integer' }, name: { type: 'string' }, count: { type: 'integer' } } } },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

module.exports = swaggerJsdoc(options);
