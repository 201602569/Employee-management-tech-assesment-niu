# Employee Management System

Full Stack employee management application built with React, Express.js, MySQL 8, and Docker.

## Stack

- **Frontend:** React + Vite + React Hook Form + Tailwind CSS
- **Backend:** Express.js + Sequelize ORM
- **Database:** MySQL 8
- **Infrastructure:** Docker + Docker Compose
- **CI/CD:** GitHub Actions → Docker Hub

## Quick Start

```bash
cp backend/.env.example backend/.env
# Fill in your values in backend/.env

docker compose up -d
```

App will be available at `http://localhost:5173`  
API runs at `http://localhost:3000`

## Demo credentials

| Role  | Email               | Password   |
|-------|---------------------|------------|
| Admin | admin@demo.com      | Admin1234! |

## Project structure

```
├── backend/        # Express.js API
├── frontend/       # React SPA
├── docs/           # ER diagram, UML diagrams
└── docker-compose.yml
```

## Libraries used

- **express-rate-limit** — rate limiting on auth endpoints (5 req/min)
- **jsonwebtoken** — JWT access tokens (15min expiry)
- **sequelize** — ORM for MySQL, migrations and seeds
- **react-hook-form** — form state and client-side validation
- **recharts** — dashboard charts (data from API, not hardcoded)
- **dotenv** — environment variable loading

## Setup (without Docker)

```bash
# Backend
cd backend
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```
