// routes/tasks.js — Rutas de tareas (protegidas con JWT)
//
// Fijate en la estructura de las URLs:
//   /api/projects/:projectId/tasks  → tareas de un proyecto específico
//   /api/tasks/:id                  → operaciones sobre una tarea específica
//
// Esta jerarquía en las URLs es un principio de diseño REST:
// los recursos anidados (tareas dentro de proyectos) se reflejan en la ruta.

const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/auth');
const { getAll, create, update, updateStatus, remove } = require('../controllers/taskController');

// Rutas anidadas bajo proyectos
router.get('/projects/:projectId/tasks',  auth, getAll);  // GET  /api/projects/1/tasks
router.post('/projects/:projectId/tasks', auth, create);  // POST /api/projects/1/tasks

// Rutas de tarea individual
router.put('/tasks/:id',          auth, update);        // PUT   /api/tasks/1
router.patch('/tasks/:id/status', auth, updateStatus);  // PATCH /api/tasks/1/status
router.delete('/tasks/:id',       auth, remove);        // DELETE /api/tasks/1

module.exports = router;
