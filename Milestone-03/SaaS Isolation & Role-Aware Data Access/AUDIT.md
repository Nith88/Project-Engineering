# AUDIT REPORT — CorpFlow Schema Security Review

## Move 1 — Pre-Refactor Audit

### Critical Issues Identified

1. **No Tenant Isolation**
   - Original schema had no `tenant_id` in core tables.
   - Users, projects, and billing data were globally accessible.
   - Risk: Cross-company data leakage (any user could access all data).

2. **No Access Control Layer**
   - No role-based restrictions in schema or API design.
   - All users had potential access to all records.

3. **Sensitive Data Stored Without Protection**
   - Fields like `salary`, `password_hash`, and billing information were stored without any access control rules.

4. **Missing Indexing Strategy**
   - No indexes on frequently queried fields like `tenant_id`.
   - Risk: Poor performance and full table scans.

---

## Move 2 — Tenant Identification Fix

### Changes Made
- Added `tenants` table
- Added `tenant_id` to:
  - users
  - projects
  - billing_details

### Impact
- Enables multi-tenant architecture
- Each record is now scoped to a single organization

---

## Move 3 — Tenant Relationship Safety

### Risk Identified
Even with `tenant_id`, relationships between tables can still allow cross-tenant access if not validated in application logic.

Example risk:
- A user from Tenant A could be linked to a project from Tenant B if only IDs are checked.

### Fix Strategy
- All queries must include `tenant_id` filtering
- Cross-tenant joins are forbidden at API level
- Application layer enforces tenant matching

---

## Move 4 — Sensitive Field Identification

### Sensitive Fields

- users.salary → financial information
- users.password_hash → authentication secret
- billing_details.card_last4 → payment information
- billing_details.expiry_date → payment metadata
- billing_details.billing_address → personal financial data

### Access Control Rules

#### Admin
- Full access to all fields within tenant

#### Manager
- Can view:
  - users (basic info only)
  - projects
- Cannot view:
  - salary
  - password_hash
  - billing data

#### User
- Can only view:
  - own profile
  - assigned projects
- No access to sensitive fields

---

## Move 5 — Role-Based Access Enforcement

### Implementation Strategy
- API layer filters all responses before sending data
- Role-based mapping applied in controllers/routes

### Enforcement Rules

- Admin → full data access (within tenant)
- Manager → restricted financial and sensitive data
- User → minimal self-access only

---

## Move 6 — Billing Data Review

### Observation
No dedicated `billing.js` route exists in the codebase.

### Risk Analysis
Although billing table exists in schema, it is not directly exposed via API routes.

### Security Handling

- Billing data MUST NOT be returned as raw database objects
- Only safe fields allowed:
  - id
  - user_id
  - card_last4
  - expiry_date
  - tenant_id

### Enforcement Strategy
- If billing endpoints are added in future, they must:
  - enforce tenant_id filtering
  - apply role-based access control
  - exclude full card and address data

---

## Move 7 — Indexing Strategy

### Indexes Added

- users(tenant_id)
- projects(tenant_id)
- billing_details(tenant_id)

### Purpose

- Improves query performance
- Prevents full table scans
- Ensures efficient tenant-based filtering

---

## Final Security Summary

This system now enforces:

- Multi-tenant isolation via `tenant_id`
- Role-based access control at API layer
- Sensitive field filtering before response
- Indexed queries for performance optimization
- Prevention of cross-tenant data leakage

---