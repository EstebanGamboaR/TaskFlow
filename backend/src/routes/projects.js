// routes/projects.js — Rutas de proyectos (PROTEGIDAS con JWT)
//
// CONCEPTO CLAVE: middleware en cadena
// En Express podés pasar múltiples funciones a una ruta:
//   router.get('/', auth, getAll)
//
// Express las ejecuta en orden: primero auth(), luego getAll().
// Si auth() llama next() → sigue a getAll().
// Si auth() responde con 401 → getAll() nunca se ejecuta.
//
// Eso es exactamente el "guardia de seguridad" antes de entrar al controller.
// En Java sería como un Filter en Servlet que llama chain.doFilter().

const express    = require('express');
const router     = express.Router();
const auth       = require('../middleware/auth');
const { getAll, getOne, create, update, remove } = require('../controllers/projectController');

// Todas las rutas de proyectos requieren JWT válido
// El 'auth' middleware va ANTES del controller en cada ruta

router.get('/',     auth, getAll);   // GET    /api/projects
router.get('/:id',  auth, getOne);   // GET    /api/projects/1
router.post('/',    auth, create);   // POST   /api/projects
router.put('/:id',  auth, update);   // PUT    /api/projects/1
router.delete('/:id', auth, remove); // DELETE /api/projects/1

module.exports = router;
