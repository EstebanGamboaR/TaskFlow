// authController.js — Lógica de autenticación
//
// CONCEPTO CLAVE: el controller es el cerebro. Recibe el request HTTP,
// coordina el trabajo (validar datos → consultar DB → crear token → responder)
// y delega a los modelos para tocar la base de datos.
//
// En Java/MVC esto sería tu clase Controller o Servlet.
// Aquí son funciones async que Express llama cuando llega un request.

const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/userModel');

// ─── REGISTRO ─────────────────────────────────────────────
// POST /api/auth/register
// Recibe: { name, email, password }
// Retorna: { token, user: { id, name, email } }

const register = async (req, res) => {
  try {
    // 1. Extraer datos del body del request
    const { name, email, password } = req.body;

    // 2. Validación básica — todos los campos son requeridos
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // 3. Verificar que el email no esté registrado
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // 4. Hashear la contraseña con bcrypt
    // El número 10 es el "salt rounds" — cuántas veces aplica el algoritmo.
    // Más alto = más seguro pero más lento. 10 es el estándar de la industria.
    // NUNCA guardamos la contraseña en texto plano en la base de datos.
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Crear el usuario en la base de datos
    const userId = await User.createUser(name, email, hashedPassword);

    // 6. Crear el JWT token
    // jwt.sign(payload, secret, options)
    // El payload es lo que se codifica dentro del token.
    // Incluimos solo el ID y email — nunca el password.
    const token = jwt.sign(
      { id: userId, email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // 7. Responder con el token y datos del usuario (sin password)
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: userId, name, email }
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ─── LOGIN ────────────────────────────────────────────────
// POST /api/auth/login
// Recibe: { email, password }
// Retorna: { token, user: { id, name, email } }

const login = async (req, res) => {
  try {
    // 1. Extraer datos del body
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // 2. Buscar el usuario en la base de datos
    const user = await User.findByEmail(email);
    if (!user) {
      // Importante: no digas "el email no existe" — eso le da info a atacantes.
      // Siempre el mismo mensaje genérico para email o password incorrectos.
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 3. Comparar la contraseña con el hash guardado en DB
    // bcrypt.compare() hashea el password recibido y lo compara con el hash.
    // Nunca "desencripta" — el hash es de una sola vía.
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 4. Crear el JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // 5. Responder (sin incluir el password en la respuesta)
    res.json({
      message: 'Login successful',
      token,
      user: {
        id:    user.id,
        name:  user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { register, login };
