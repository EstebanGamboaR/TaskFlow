# TaskFlow — Kanban Task Manager

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Status](https://img.shields.io/badge/Status-In%20Development-yellow?style=for-the-badge)

**A full-stack Kanban task manager built with React + Node.js + MySQL.**
Manage your projects, track tasks across stages, and collaborate — all in a clean, modern interface.

[Features](#features) · [Tech Stack](#tech-stack) · [Getting Started](#getting-started) · [API](#api-endpoints) · [Roadmap](#roadmap)

</div>

---

## Overview

TaskFlow is a full-stack project management web application inspired by tools like Trello and Linear. It was built from scratch as a portfolio project to demonstrate proficiency in modern full-stack development: REST API design, JWT authentication, React SPA architecture, and Docker containerization.

This project intentionally avoids UI frameworks that "do the heavy lifting" — every piece is built to show understanding of the underlying concepts.

---

## Features

- **User Authentication** — Register and login with JWT-based stateless auth (bcrypt password hashing)
- **Project Management** — Create, edit, and delete projects with custom names and descriptions
- **Kanban Board** — Visualize tasks across three stages: `To Do` / `In Progress` / `Done`
- **Task CRUD** — Create tasks with title, description, priority, and due date
- **Drag & Drop** — Move tasks between columns intuitively
- **Responsive Design** — Works on desktop and mobile browsers
- **Dockerized** — Full environment spins up with a single `docker-compose up` command

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | React 18 + Vite | Modern SPA framework, most in-demand in the industry |
| Styling | Tailwind CSS | Utility-first, fast to iterate, clean output |
| Backend | Node.js + Express | JavaScript on the server, minimal and flexible |
| Database | MySQL 8 | Relational, normalized, familiar to the author |
| Auth | JWT + bcryptjs | Stateless authentication, industry standard |
| DevOps | Docker + Docker Compose | Reproducible environment, one-command setup |
| Version Control | Git + GitHub | Standard professional workflow |

---

## Project Structure

```
TaskFlow/
├── backend/                  # Node.js + Express REST API
│   ├── src/
│   │   ├── app.js            # Express app configuration
│   │   ├── server.js         # Server entry point
│   │   ├── config/
│   │   │   └── db.js         # MySQL connection pool
│   │   ├── routes/           # API route definitions
│   │   ├── controllers/      # Business logic handlers
│   │   ├── models/           # Database query functions
│   │   └── middleware/       # JWT auth middleware
│   ├── package.json
│   └── .env.example
├── frontend/                 # React + Vite SPA
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Route-level views
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API call functions
│   │   └── context/          # Global state (Auth)
│   └── package.json
├── docs/
│   ├── db-schema.sql         # Database schema
│   └── PROJECT_MEMORY.md     # Development log & decisions
├── docker-compose.yml
└── README.md
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Docker](https://www.docker.com/) + Docker Compose
- [Git](https://git-scm.com/)

### Option A — Docker (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/EstebanGamboaR/TaskFlow.git
cd TaskFlow

# 2. Copy environment variables
cp backend/.env.example backend/.env

# 3. Start everything
docker-compose up --build

# App will be available at:
# Frontend → http://localhost:5173
# Backend API → http://localhost:3000
```

### Option B — Manual Setup

```bash
# Backend
cd backend
npm install
cp .env.example .env   # fill in your MySQL credentials
npm run dev

# Frontend (in a new terminal)
cd frontend
npm install
npm run dev
```

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Create a new user account |
| `POST` | `/api/auth/login` | Login and receive JWT token |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/projects` | Get all projects for the logged-in user |
| `POST` | `/api/projects` | Create a new project |
| `PUT` | `/api/projects/:id` | Update a project |
| `DELETE` | `/api/projects/:id` | Delete a project |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/projects/:id/tasks` | Get all tasks for a project |
| `POST` | `/api/projects/:id/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update a task (including status/column) |
| `DELETE` | `/api/tasks/:id` | Delete a task |

> All endpoints except `/auth/*` require `Authorization: Bearer <token>` header.

---

## Roadmap

- [x] Project structure & documentation
- [ ] Backend: Express server + MySQL connection
- [ ] Backend: Auth endpoints (register/login + JWT)
- [ ] Backend: Projects CRUD endpoints
- [ ] Backend: Tasks CRUD endpoints
- [ ] Frontend: Vite + React setup + Tailwind
- [ ] Frontend: Auth pages (Login / Register)
- [ ] Frontend: Dashboard with project list
- [ ] Frontend: Kanban board with drag & drop
- [ ] Docker Compose full setup
- [ ] Deploy to cloud (VPS / Railway / Render)

---

## Author

**Esteban Gamboa Román** — Junior Full Stack Developer
[GitHub](https://github.com/EstebanGamboaR) · [LinkedIn](https://linkedin.com/in/esteban-g-roman) · San José, Costa Rica 🇨🇷

> *"I don't just want to write code — I want to understand why it works, and build things that hold up in production."*

---

## License

MIT License — see [LICENSE](LICENSE) for details.
