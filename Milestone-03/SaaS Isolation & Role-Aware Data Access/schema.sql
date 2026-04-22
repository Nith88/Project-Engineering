-- Drop old tables (safe reset order: children first)
DROP TABLE IF EXISTS billing_details;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tenants;

-- =========================
-- TENANTS TABLE
-- =========================
CREATE TABLE tenants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- =========================
-- USERS TABLE
-- =========================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'employee',
    salary DECIMAL(10,2),
    tenant_id INTEGER NOT NULL,

    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- Index for tenant isolation
CREATE INDEX idx_users_tenant ON users(tenant_id);

-- =========================
-- PROJECTS TABLE
-- =========================
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'active',
    budget DECIMAL(12,2),
    tenant_id INTEGER NOT NULL,

    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

CREATE INDEX idx_projects_tenant ON projects(tenant_id);

-- =========================
-- BILLING DETAILS TABLE
-- =========================
CREATE TABLE billing_details (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    card_holder_name VARCHAR(100),
    card_last4 VARCHAR(4),
    expiry_date VARCHAR(5),
    billing_address TEXT,
    tenant_id INTEGER NOT NULL,

    FOREIGN KEY (tenant_id) REFERENCES tenants(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_billing_tenant ON billing_details(tenant_id);

-- =========================
-- SEED DATA
-- =========================
INSERT INTO tenants (name) VALUES
('Pouch'),
('Velocity');

INSERT INTO users (full_name, email, password_hash, role, salary, tenant_id) VALUES
('Alice Johnson', 'alice@pouch.io', 'hash', 'admin', 125000, 1),
('Bob Smith', 'bob@pouch.io', 'hash', 'manager', 95000, 1),
('Charlie Davis', 'charlie@velocity.com', 'hash', 'admin', 140000, 2),
('David Miller', 'david@velocity.com', 'hash', 'employee', 75000, 2);

INSERT INTO projects (name, description, status, budget, tenant_id) VALUES
('Pouch Portal', 'Customer portal for Pouch.io', 'active', 50000, 1),
('Velocity Engine', 'Back-end engine for Velocity', 'active', 120000, 2),
('Secret R&D', NULL, 'inactive', 250000, 2);

INSERT INTO billing_details (user_id, card_holder_name, card_last4, expiry_date, billing_address, tenant_id) VALUES
(1, 'Alice Johnson', '4242', '12/28', '123 Tech Lane, SF', 1),
(3, 'Charlie Davis', '9182', '08/26', '789 Velocity Rd, NY', 2);