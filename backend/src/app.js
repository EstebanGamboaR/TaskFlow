// app.js — Express application setup
//
// This file configures the Express app: middleware, routes, error handling.
// It does NOT start the server — that's server.js's job.
// This separation makes it easier to test the app without starting a real server.

const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const app = express();

// ─── Middleware ────────────────────────────────────────────
// CORS: allows the React frontend (different port) to talk to this API.
// Without this, the browser would block the requests.
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// express.json() parses incoming request bodies as JSON.
// Without this, req.body would be undefined.
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────
// We'll import and register routes here as we build them.
// Example: app.use('/api/auth', require('./routes/auth'));
//
// ✅ Phase 1 — Auth routes activas
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// ✅ Phase 2 — Project routes activas
const projectRoutes = require('./routes/projects');
app.use('/api/projects', projectRoutes);

// TODO (Phase 3): Uncomment when ready
// const taskRoutes = require('./routes/tasks');
// app.use('/api/tasks', taskRoutes);

// ─── Health check ─────────────────────────────────────────
// A simple endpoint to verify the API is running.
// Try: GET http://localhost:3000/api/health
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'TaskFlow API is running',
    timestamp: new Date().toISOString()
  });
});

// ─── 404 Handler ──────────────────────────────────────────
// If no route matched, return a clean 404 JSON response.
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});

// ─── Global Error Handler ─────────────────────────────────
// Express calls this middleware when next(error) is called anywhere.
// The 4-parameter signature (err, req, res, next) is what tells
// Express this is an error handler — do NOT remove the 'next' param.
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
