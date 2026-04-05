// routes/auth.js — Definición de rutas de autenticación
//
// CONCEPTO CLAVE: en Express, las rutas son el punto de entrada.
// Cuando llega un request HTTP, Express revisa la lista de rutas
// y llama la función que corresponde al método + URL.
//
// Este archivo solo CONECTA URLs con funciones del controller.
// No tiene lógica de negocio — eso es responsabilidad del controller.
//
// Analogía con PHP: es como el router que mapea /register → función register().

const express    = require('express');
const router     = express.Router();
const { register, login } = require('../controllers/authController');

// POST /api/auth/register → llama register() del controller
router.post('/register', register);

// POST /api/auth/login → llama login() del controller
router.post('/login', login);

module.exports = router;
