// server.js — Entry point
//
// This file's ONLY job is to start the HTTP server.
// All app configuration lives in app.js.
//
// We also import db.js here to trigger the connection test on startup.

const app = require('./app');
require('./config/db'); // Connect to MySQL on startup
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 TaskFlow API running on http://localhost:${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
});
