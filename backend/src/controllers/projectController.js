// projectController.js — Lógica CRUD de proyectos
//
// CONCEPTO CLAVE: req.user
// Recordás el authMiddleware que escribimos? Cuando llega un request
// con un JWT válido, el middleware decodifica el token y hace:
//   req.user = { id: 1, email: "test@test.com" }
//
// Entonces en ESTE controller, req.user.id es el ID del usuario autenticado.
// No necesitamos que el usuario mande su ID en el body — lo sacamos del token.
// Eso es más seguro: el usuario no puede falsificar su propio ID.

const Project = require('../models/projectModel');

// GET /api/projects — Listar todos los proyectos del usuario
const getAll = async (req, res) => {
  try {
    const projects = await Project.getByUserId(req.user.id);
    res.json({ projects });
  } catch (error) {
    console.error('GetAll projects error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /api/projects/:id — Obtener un proyecto específico
const getOne = async (req, res) => {
  try {
    const project = await Project.getByIdAndUser(req.params.id, req.user.id);
    if (!project) {
      // 404 si no existe, o si existe pero es de otro usuario
      // No revelamos cuál de los dos casos — ambos se ven igual
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ project });
  } catch (error) {
    console.error('GetOne project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /api/projects — Crear un nuevo proyecto
// Body: { name, description?, color? }
const create = async (req, res) => {
  try {
    const { name, description, color } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Project name is required' });
    }

    const projectId = await Project.create(req.user.id, name.trim(), description, color);

    // Recuperamos el proyecto recién creado para retornarlo completo
    const project = await Project.getByIdAndUser(projectId, req.user.id);

    res.status(201).json({
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PUT /api/projects/:id — Actualizar un proyecto
// Body: { name, description?, color? }
const update = async (req, res) => {
  try {
    const { name, description, color } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Project name is required' });
    }

    // update() en el modelo verifica que el proyecto pertenece al usuario
    const updated = await Project.update(req.params.id, req.user.id, name.trim(), description, color);

    if (!updated) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const project = await Project.getByIdAndUser(req.params.id, req.user.id);
    res.json({ message: 'Project updated successfully', project });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE /api/projects/:id — Eliminar un proyecto (soft delete)
const remove = async (req, res) => {
  try {
    const deleted = await Project.softDelete(req.params.id, req.user.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAll, getOne, create, update, remove };
