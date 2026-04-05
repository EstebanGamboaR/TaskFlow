// taskController.js — Lógica CRUD de tareas
//
// Las tareas viven dentro de proyectos.
// Antes de crear o listar tareas, verificamos que el proyecto
// exista Y pertenezca al usuario autenticado.

const Task    = require('../models/taskModel');
const Project = require('../models/projectModel');

// GET /api/projects/:projectId/tasks — Listar tareas de un proyecto
const getAll = async (req, res) => {
  try {
    // Verificar que el proyecto pertenece al usuario
    const project = await Project.getByIdAndUser(req.params.projectId, req.user.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const tasks = await Task.getByProject(req.params.projectId, req.user.id);
    res.json({ tasks });
  } catch (error) {
    console.error('GetAll tasks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /api/projects/:projectId/tasks — Crear una tarea
// Body: { title, description?, priority?, due_date? }
const create = async (req, res) => {
  try {
    const project = await Project.getByIdAndUser(req.params.projectId, req.user.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const { title, description, priority, due_date } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Task title is required' });
    }

    const taskId = await Task.create(req.params.projectId, title.trim(), description, priority, due_date);
    const task   = await Task.getByIdAndUser(taskId, req.user.id);

    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PUT /api/tasks/:id — Actualizar título, descripción o prioridad
const update = async (req, res) => {
  try {
    const { title, description, priority, due_date } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Task title is required' });
    }

    const updated = await Task.update(req.params.id, req.user.id, title.trim(), description, priority, due_date);
    if (!updated) return res.status(404).json({ error: 'Task not found' });

    const task = await Task.getByIdAndUser(req.params.id, req.user.id);
    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PATCH /api/tasks/:id/status — Mover tarea entre columnas del Kanban
// Body: { status: "todo" | "in_progress" | "done" }
//
// Usamos PATCH en lugar de PUT porque solo actualizamos UN campo.
// PUT = reemplazar el recurso completo. PATCH = actualizar parcialmente.
// Esta distinción es importante en diseño REST profesional.
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: 'Status is required' });

    const updated = await Task.updateStatus(req.params.id, req.user.id, status);
    if (!updated) {
      return res.status(400).json({ error: 'Task not found or invalid status' });
    }

    const task = await Task.getByIdAndUser(req.params.id, req.user.id);
    res.json({ message: 'Task status updated', task });
  } catch (error) {
    console.error('UpdateStatus error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE /api/tasks/:id — Eliminar tarea (soft delete)
const remove = async (req, res) => {
  try {
    const deleted = await Task.softDelete(req.params.id, req.user.id);
    if (!deleted) return res.status(404).json({ error: 'Task not found' });

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAll, create, update, updateStatus, remove };
