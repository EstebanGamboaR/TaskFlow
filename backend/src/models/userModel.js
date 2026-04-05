// userModel.js — Capa de datos para usuarios
//
// CONCEPTO CLAVE: en Express no existe un ORM obligatorio como Hibernate en Java.
// Podemos escribir SQL directo con mysql2, lo cual es más transparente y
// te enseña exactamente qué pasa en la base de datos.
//
// Este archivo exporta funciones que el controller va a llamar.
// El controller no sabe cómo se hace la query — solo llama findByEmail() y
// recibe el resultado. Eso es separación de responsabilidades.

const db = require('../config/db');

// Buscar un usuario por su email
// Retorna el usuario completo (con password hash) o undefined si no existe.
// El controller lo usa para verificar si el email ya está registrado.
const findByEmail = async (email) => {
  const [rows] = await db.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0]; // rows es un array — tomamos el primer resultado
};

// Crear un nuevo usuario en la base de datos
// Recibe el nombre, email y la contraseña YA hasheada (nunca texto plano).
// Retorna el ID del usuario recién creado.
const createUser = async (name, email, hashedPassword) => {
  const [result] = await db.execute(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  );
  return result.insertId; // MySQL retorna el ID autogenerado aquí
};

// Buscar un usuario por ID
// Lo usamos para obtener los datos del usuario sin exponer el password.
const findById = async (id) => {
  const [rows] = await db.execute(
    'SELECT id, name, email, created_at FROM users WHERE id = ?',
    [id]
  );
  return rows[0];
};

module.exports = { findByEmail, createUser, findById };
