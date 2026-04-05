// taskModel.js — Capa de datos para tareas
//
// CONCEPTO NUEVO: seguridad por asociación
// Una tarea pertenece a un proyecto, que pertenece a un usuario.
// Para verificar que el usuario tiene acceso a una tarea, hacemos un JOIN
// con la tabla projects y verificamos el user_id ahí.
// Así un usuario nunca puede tocar tareas de proyectos ajenos.

const db = require('../config/db');

// Obtener todas las tareas de un proyecto
// Verifica que el proyecto pertenezca al usuario mediante JOIN
const getByProject = async (projectId, userId) => {
  const [rows] = await db.execute(
    `SELECT t.id, t.title, t.description, t.status, t.priority, t.due_date, t.position, t.created_at
     FROM tasks t
     INNER JOIN projects p ON t.project_id = p.id
     WHERE t.project_id = ?
       AND p.user_id = ?
       AND t.deleted_at IS NULL
       AND p.deleted_at IS NULL
     ORDER BY t.position ASC, t.created_at ASC`,
    [projectId, userId]
  );
  return rows;
};

// Obtener una tarea específica verificando acceso del usuario
const getByIdAndUser = async (taskId, userId) => {
  const [rows] = await db.execute(
    `SELECT t.id, t.title, t.description, t.status, t.priority, t.due_date, t.position, t.project_id, t.created_at
     FROM tasks t
     INNER JOIN projects p ON t.project_id = p.id
     WHERE t.id = ?
       AND p.user_id = ?
       AND t.deleted_at IS NULL`,
    [taskId, userId]
  );
  return rows[0];
};

// Crear una nueva tarea en un proyecto
const create = async (projectId, title, description, priority, dueDate) => {
  const [result] = await db.execute(
    `INSERT INTO tasks (project_id, title, description, priority, due_date)
     VALUES (?, ?, ?, ?, ?)`,
    [projectId, title, description || null, priority || 'medium', dueDate || null]
  );
  return result.insertId;
};

// Actualizar datos de una tarea
const update = async (taskId, userId, title, description, priority, dueDate) => {
  const [result] = await db.execute(
    `UPDATE tasks t
     INNER JOIN projects p ON t.project_id = p.id
     SET t.title = ?, t.description = ?, t.priority = ?, t.due_date = ?
     WHERE t.id = ? AND p.user_id = ? AND t.deleted_at IS NULL`,
    [title, description || null, priority || 'medium', dueDate || null, taskId, userId]
  );
  return result.affectedRows > 0;
};

// Cambiar el status de una tarea (mover entre columnas del Kanban)
// Este es el endpoint más usado en la UI — drag & drop llama a esto
const updateStatus = async (taskId, userId, status) => {
  const validStatuses = ['todo', 'in_progress', 'done'];
  if (!validStatuses.includes(status)) return false;

  const [result] = await db.execute(
    `UPDATE tasks t
     INNER JOIN projects p ON t.project_id = p.id
     SET t.status = ?
     WHERE t.id = ? AND p.user_id = ? AND t.deleted_at IS NULL`,
    [status, taskId, userId]
  );
  return result.affectedRows > 0;
};

// Soft delete de una tarea
const softDelete = async (taskId, userId) => {
  const [result] = await db.execute(
    `UPDATE tasks t
     INNER JOIN projects p ON t.project_id = p.id
     SET t.deleted_at = NOW()
     WHERE t.id = ? AND p.user_id = ? AND t.deleted_at IS NULL`,
    [taskId, userId]
  );
  return result.affectedRows > 0;
};

module.exports = { getByProject, getByIdAndUser, create, update, updateStatus, softDelete };
