# Employee Management System
### Prueba Técnica Full Stack — NIU Solutions

Sistema web para la gestión de empleados con autenticación JWT, CRUD completo, búsqueda avanzada y panel de métricas.

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite + React Hook Form |
| Backend | Express.js + Sequelize ORM |
| Base de datos | MySQL 8 |
| Infraestructura | Docker + Docker Compose |
| CI/CD | GitHub Actions → Docker Hub |

---

## Inicio rápido (recomendado)

> Requisito: tener **Docker Desktop** instalado y corriendo.

```bash
# 1. Clonar el repositorio
git clone https://github.com/201602569/Employee-management-tech-assesment-niu.git
cd Employee-management-tech-assesment-niu

# 2. Configurar variables de entorno
cp .env.example .env

# 3. Levantar todo con un solo comando
docker compose up --build -d
```

El sistema ejecuta automáticamente las migraciones y seeds al iniciar.

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| API REST | http://localhost:3000 |
| Swagger UI | http://localhost:3000/api-docs |

---

## Credenciales demo

| Rol | Correo | Contraseña |
|-----|--------|-----------|
| Admin | admin@demo.com | Admin1234! |
| Viewer | viewer@demo.com | Viewer1234! |

---

## Estructura del proyecto

```
├── backend/                  # API Express.js
│   ├── src/
│   │   ├── config/           # Swagger + DB config
│   │   ├── helpers/          # JWT, paginación
│   │   ├── middlewares/      # Auth, validación, errores
│   │   ├── routes/           # Endpoints
│   │   └── services/         # Lógica de negocio
│   ├── migrations/           # Esquema de BD
│   ├── seeders/              # Datos demo
│   ├── models/               # Modelos Sequelize
│   ├── Dockerfile
│   └── .env.example
├── frontend/                 # SPA React
│   └── src/
│       ├── api/              # Cliente HTTP (axios)
│       ├── components/       # Componentes reutilizables
│       ├── context/          # AuthContext
│       ├── hooks/            # useDebounce
│       └── pages/            # Login, Employees, Dashboard
├── docs/
│   └── ER-diagram.md         # Diagrama entidad-relación
├── .github/
│   └── workflows/ci.yml      # Pipeline CI/CD
├── docker-compose.yml
└── .env.example
```

---

## Setup manual (sin Docker)

### Requisitos
- Node.js 18+
- MySQL 8 corriendo localmente

### Backend

```bash
cd backend
cp .env.example .env
# Editar .env con tus credenciales de MySQL

npm install
npm run migrate     # Crea las tablas
npm run seed        # Inserta datos demo
npm run dev         # Puerto 3000
```

### Frontend

```bash
cd frontend
npm install
npm run dev         # Puerto 5173
```

---

## API Endpoints

La documentación completa con ejemplos está disponible en **Swagger UI**: `http://localhost:3000/api-docs`

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/login | Iniciar sesión (JWT 15min) | — |
| GET | /api/employees | Listar con paginación y filtros | ✅ |
| POST | /api/employees | Crear empleado | ✅ |
| PUT | /api/employees/:id | Actualizar empleado | ✅ |
| DELETE | /api/employees/:id | Soft delete | ✅ |
| GET | /api/departments | Listar departamentos | ✅ |
| GET | /api/stats | Métricas del dashboard | ✅ |

### Ejemplo de autenticación

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@demo.com","password":"Admin1234!"}'

# Usar el token en peticiones protegidas
curl http://localhost:3000/api/employees \
  -H "Authorization: Bearer <token>"
```

---

## Funcionalidades implementadas

### Módulo 1 — Base de datos (20 pts)
- ✅ 4 tablas relacionadas: `employees`, `departments`, `roles`, `users`
- ✅ Soft delete con columna `deleted_at` (Sequelize `paranoid: true`)
- ✅ Índices en `email` y `department_id`
- ✅ Esquema en 3FN — diagrama ER en `/docs`
- ✅ `.env.example` con todas las variables

### Módulo 2 — API REST (25 pts)
- ✅ CRUD completo con códigos HTTP correctos
- ✅ Paginación: `?page=1&limit=10` → `{ data, total, page, totalPages }`
- ✅ Filtros por nombre, departamento y estado
- ✅ JWT con expiración de 15 minutos — 401/403 según corresponde
- ✅ Validación de body con `express-validator` → `{ error, message }`
- ✅ Rate limiting en `/auth/login`: 5 intentos/min/IP → 429

### Módulo 3 — Frontend React (25 pts)
- ✅ Login con validación cliente y manejo de error 401
- ✅ Rutas protegidas — redirige a `/login` si token expirado
- ✅ Tabla de empleados con paginación server-side
- ✅ Búsqueda con debounce 300ms + filtro por departamento
- ✅ Formulario con React Hook Form — email único, teléfono numérico
- ✅ Modal de confirmación para eliminar (foco atrapado — accesible)
- ✅ Diseño responsivo mobile-first (tabla → cards en móvil)
- ✅ Dashboard con gráficas (Recharts) — datos desde la API

### Módulo 4 — Calidad de código (15 pts)
- ✅ Helpers reutilizables: `pagination.js`, `jwt.js`
- ✅ `try/catch` con `throw` en todos los servicios
- ✅ `.env.example` incluido — ningún secreto en el repositorio

### Módulo 5 — Docker y CI/CD (15 pts)
- ✅ `docker-compose.yml` con servicios `api` + `db` + volumen persistente
- ✅ Dockerfile multi-stage (`builder` → `production`) — sin devDependencies
- ✅ GitHub Actions: push a `main` → build → push a Docker Hub
- ✅ Swagger UI en `/api-docs` con todos los endpoints documentados

---

## Librerías utilizadas y justificación

| Librería | Justificación |
|----------|--------------|
| `sequelize` | ORM que facilita migraciones, seeds y soft delete (`paranoid`) sin SQL manual |
| `express-rate-limit` | Rate limiting en auth sin infraestructura externa (Redis) |
| `express-validator` | Validación declarativa del body — errores en formato consistente |
| `jsonwebtoken` | Estándar de facto para JWT; control total sobre el payload y expiración |
| `bcryptjs` | Hash de contraseñas con salt — versión pura JS sin dependencias nativas |
| `react-hook-form` | Menos re-renders que Formik; API simple con validación integrada |
| `recharts` | Gráficas declarativas en React sin configuración compleja |
| `axios` | Interceptores para inyectar token y manejar 401 globalmente |

---

## CI/CD

Imagen pública disponible en Docker Hub:

```bash
docker pull christophersoto97/employee-management-api:latest
```

El pipeline se dispara automáticamente en cada push a `main`.

---

## Diagrama ER

![ER Diagram](./docs/ER-diagram.png)
