# TaskFlow — Project Memory & Development Log

> This file tracks every decision, milestone, and learning in the project.
> Updated at the end of each work session.

---

## Project Identity

| Field | Value |
|-------|-------|
| **Name** | TaskFlow |
| **Type** | Full Stack Web App — Kanban Task Manager |
| **GitHub** | https://github.com/EstebanGamboaR/TaskFlow *(pending creation)* |
| **Started** | April 4, 2026 |
| **Goal** | Portfolio project demonstrating React + Node.js + REST API + JWT + Docker |
| **Target** | Stand out among junior developers in job applications |

---

## Tech Stack

| Layer | Technology | Status |
|-------|-----------|--------|
| Frontend | React 18 + Vite + Tailwind CSS | ⏳ Not started |
| Backend | Node.js 22 + Express 4 | ✅ Structure created |
| Database | MySQL 8.0 | ✅ Schema designed |
| Auth | JWT + bcryptjs | ✅ Middleware written |
| DevOps | Docker + Docker Compose | ✅ docker-compose.yml created |

---

## Development Phases

### Phase 0 — Project Setup ✅ COMPLETE
**Date:** April 4, 2026

What was done:
- Defined project scope, name, and tech stack
- Created full folder structure: `backend/`, `frontend/`, `docs/`
- Written `README.md` with badges and full documentation
- Written `.gitignore` for Node.js + React
- Created `backend/package.json` with all dependencies
- Created `backend/src/app.js` — Express app configuration
- Created `backend/src/server.js` — Server entry point
- Created `backend/src/config/db.js` — MySQL connection pool
- Created `backend/src/middleware/auth.js` — JWT middleware
- Created `docker-compose.yml` — Full stack container setup
- Created `docs/db-schema.sql` — Database schema with 3 tables

Key decisions made:
- **Node.js over PHP** for backend — forces learning the JS ecosystem, more marketable with React
- **Tailwind CSS** for styling — faster iteration, no CSS files to manage
- **Soft deletes** (`deleted_at`) for tasks and projects — good practice, recoverable
- **ENUM for task status** — enforced at DB level, not just application level

---

### Phase 1 — Backend Auth (Next) ⏳ PENDING
**Goal:** Working register + login endpoints with JWT

Tasks:
- [ ] Run `npm install` in `backend/`
- [ ] Create `routes/auth.js` — POST /register, POST /login
- [ ] Create `controllers/authController.js` — business logic
- [ ] Create `models/userModel.js` — DB queries
- [ ] Test with Postman or curl

Concepts to learn:
- How `bcryptjs` hashes passwords
- How `jsonwebtoken` creates and verifies tokens
- The request → route → controller → model flow in Express

---

### Phase 2 — Projects CRUD ⏳ PENDING
Tasks:
- [ ] Create `routes/projects.js`
- [ ] Create `controllers/projectController.js`
- [ ] Create `models/projectModel.js`
- [ ] Apply `authMiddleware` to all project routes

---

### Phase 3 — Tasks CRUD ⏳ PENDING
Tasks:
- [ ] Create `routes/tasks.js`
- [ ] Create `controllers/taskController.js`
- [ ] Create `models/taskModel.js`
- [ ] Implement status update (move task between columns)

---

### Phase 4 — React Frontend ⏳ PENDING
Tasks:
- [ ] Scaffold with `npm create vite@latest frontend -- --template react`
- [ ] Install Tailwind CSS
- [ ] Create `services/api.js` — axios/fetch wrapper
- [ ] Create Auth context + Login + Register pages
- [ ] Create Dashboard (project list)
- [ ] Create Kanban board view
- [ ] Implement drag & drop

---

### Phase 5 — Polish & Deploy ⏳ PENDING
Tasks:
- [ ] Complete Docker Compose setup (frontend Dockerfile)
- [ ] Write API documentation
- [ ] Add screenshots to README
- [ ] Deploy to Railway / Render / VPS

---

## Concepts Learned

*(Add entries here as you learn new things while building)*

| Date | Concept | Notes |
|------|---------|-------|
| 2026-04-04 | Express middleware chain | `app.use()` registers middleware that runs on every request. Order matters. |
| 2026-04-04 | MySQL connection pooling | Pool keeps connections open and reuses them. Faster than open/close per request. |
| 2026-04-04 | JWT stateless auth | Token carries the user data. Server doesn't store sessions. |
| 2026-04-04 | Docker layer caching | Copying `package.json` before source code means `npm install` only reruns when dependencies change. |

---

## Blockers & Solutions

*(Log any problems encountered and how they were solved)*

| Date | Problem | Solution |
|------|---------|----------|
| — | — | — |

---

## Resources

- [Express.js Docs](https://expressjs.com/)
- [React Docs (Beta)](https://react.dev/)
- [JWT.io — Debugger](https://jwt.io/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Docker Compose Docs](https://docs.docker.com/compose/)
