-- ─────────────────────────────────────────────────────────
-- TaskFlow — Database Schema
-- MySQL 8.0
-- Author: Esteban Gamboa Román
-- ─────────────────────────────────────────────────────────
--
-- DESIGN DECISIONS:
-- 1. UUIDs vs AUTO_INCREMENT: We use BIGINT AUTO_INCREMENT for simplicity.
--    In a production system, UUIDs prevent enumeration attacks.
-- 2. Soft deletes: We use deleted_at timestamps instead of hard DELETE.
--    This means data is never truly lost — useful for audit trails.
-- 3. Task status as ENUM: Enforces valid states at the DB level,
--    not just application level. Faster than a separate status table.
-- ─────────────────────────────────────────────────────────

CREATE DATABASE IF NOT EXISTS taskflow_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE taskflow_db;

-- ─── Users ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100)  NOT NULL,
  email       VARCHAR(255)  NOT NULL UNIQUE,
  password    VARCHAR(255)  NOT NULL,  -- bcrypt hash, NEVER plaintext
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Projects ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id     BIGINT UNSIGNED NOT NULL,
  name        VARCHAR(150)   NOT NULL,
  description TEXT,
  color       VARCHAR(7)     DEFAULT '#6366f1',  -- Hex color for UI
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at  TIMESTAMP NULL DEFAULT NULL,        -- Soft delete

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);

-- ─── Tasks ────────────────────────────────────────────────
-- Status maps to Kanban columns:
--   todo        → "To Do" column
--   in_progress → "In Progress" column
--   done        → "Done" column

CREATE TABLE IF NOT EXISTS tasks (
  id           BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  project_id   BIGINT UNSIGNED NOT NULL,
  title        VARCHAR(255)   NOT NULL,
  description  TEXT,
  status       ENUM('todo', 'in_progress', 'done') DEFAULT 'todo',
  priority     ENUM('low', 'medium', 'high')       DEFAULT 'medium',
  due_date     DATE NULL,
  position     INT UNSIGNED DEFAULT 0,  -- Order within a column (for drag & drop)
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at   TIMESTAMP NULL DEFAULT NULL,

  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  INDEX idx_project_id (project_id),
  INDEX idx_status (status)
);
