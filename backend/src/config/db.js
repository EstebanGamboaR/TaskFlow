// db.js — MySQL connection pool
//
// WHY A POOL and not a single connection?
// A "pool" keeps several connections open and reuses them.
// This is faster than opening a new connection on every request.
// Think of it like a pool of workers waiting to do database work.
//
// mysql2/promise gives us async/await support — no more callback hell.

const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT || 3306,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,   // Queue queries if all connections are busy
  connectionLimit: 10,        // Max simultaneous connections
  queueLimit: 0               // No limit on queued queries
});

// Test the connection when the server starts
pool.getConnection()
  .then(conn => {
    console.log('✅ MySQL connected successfully');
    conn.release(); // Always release connections back to the pool
  })
  .catch(err => {
    console.error('❌ MySQL connection failed:', err.message);
    process.exit(1); // Kill the server if DB is unreachable
  });

module.exports = pool;
