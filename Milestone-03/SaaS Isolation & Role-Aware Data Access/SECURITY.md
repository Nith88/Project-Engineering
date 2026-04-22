# SECURITY DOCUMENTATION — CorpFlow

## 1. Multi-Tenant Isolation

All core tables include `tenant_id` to ensure data is isolated per organization:
- users
- projects
- billing_details

Every database query MUST filter by tenant_id to prevent cross-tenant access.

---

## 2. Role-Based Access Control (RBAC)

### Roles:
- Admin → full access within tenant
- Manager → limited access, no sensitive data
- User → only own data

All API responses are filtered based on role before being sent.

---

## 3. Sensitive Data Protection

Sensitive fields:
- password_hash
- salary
- card_last4
- expiry_date
- billing_address

These fields are NEVER returned directly from database queries.

They are removed or filtered in API layer before response.

---

## 4. Cross-Tenant Protection

- All queries must include tenant_id condition
- No cross-tenant joins allowed
- Application layer enforces tenant isolation

---

## 5. Indexing Strategy

Indexes added on:
- users(tenant_id)
- projects(tenant_id)
- billing_details(tenant_id)

This improves query performance and enforces tenant filtering efficiency.

---

## 6. Security Summary

The system ensures:
- Strong tenant isolation
- Role-based access control
- Sensitive field filtering
- Prevention of cross-tenant data leakage