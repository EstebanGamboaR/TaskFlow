// projectModel.js — Capa de datos para proyectos
//
// CONCEPTO NUEVO: "ownership" (pertenencia)
// Cada proyecto pertenece a un usuario (user_id).
// Todas las queries filtran por user_id para que un usuario
// NUNCA pueda ver o modificar proyectos de otro usuario.
// Esta es la base de la seguridad en aplicaciones multi-usuario.

const db = require('../config/db');

// Obtener todos los proyectos de un usuario
// Solo retorna proyectos donde deleted_at IS NULL (soft delete)
const getByUserId = async (userId) => {
  const [rows] = await db.execute(
    `SELECT id, name, description, color, created_at
     FROM projects
     WHERE user_id = ? AND deleted_at IS NULL
     ORDER BY created_at DESC`,
    [userId]
  );
  return rows;
};

// Obtener un proyecto por ID — verificando que pertenece al usuario
// Si el proyecto existe pero es de otro usuario, retorna undefined (como si no existiera)
const getByIdAndUser = async (projectId, userId) => {
  const [rows] = await db.execute(
    `SELECT id, name, description, color, created_at
     FROM projects
     WHERE id = ? AND user_id = ? AND deleted_at IS NULL`,
    [projectId, userId]
  );
  return rows[0];
};

// Crear un nuevo proyecto
const create = async (userId, name, description, color) => {
  const [result] = await db.execute(
    'INSERT INTO projects (user_id, name, description, color) VALUES (?, ?, ?, ?)',
    [userId, name, description || null, color || '#6366f1']
  );
  return result.insertId;
};

// Actualizar nombre, descripción o color de un proyecto
const update = async (projectId, userId, name, description, color) => {
  const [result] = await db.execute(
    `UPDATE projects
     SET name = ?, description = ?, color = ?
     WHERE id = ? AND user_id = ? AND deleted_at IS NULL`,
    [name, description || null, color || '#6366f1', projectId, userId]
  );
  // affectedRows nos dice si realmente se actualizó algo
  return result.affectedRows > 0;
};

// Soft delete — no borramos el registro, solo marcamos la fecha de eliminación
// Esto es una buena práctica: los datos son recuperables y queda registro de auditoría
const softDelete = async (projectId, userId) => {
  const [result] = await db.execute(
    `UPDATE projects
     SET deleted_at = NOW()
     WHERE id = ? AND user_id = ? AND deleted_at IS NULL`,
    [projectId, userId]
  );
  return result.affectedRows > 0;
};

module.exports = { getByUserId, getByIdAndUser, create, update, softDelete };
