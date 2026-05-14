# Role Gap Audit

| Method | Endpoint | Expected | Actual |
|---|---|---|---|
| GET | /api/expenses | 403 | 200 |
| PUT | /api/expenses/:id/approve | 403 | 200 |
| DELETE | /api/expenses/:id | 403 | 200 |
| GET | /api/users | 403 | 200 |
| PUT | /api/users/:id/role | 403 | 200 |

# Root Cause Analysis

- Sensitive routes used only protect middleware.
- No role-based authorization existed.
- Any authenticated user could approve, reject, delete, and promote users.
- Ownership checks were missing in expense updates.

# Access Model

| Action | Allowed Roles |
|---|---|
| Submit expense | user, manager, admin |
| View own expenses | user, manager, admin |
| View all expenses | manager, admin |
| Approve expense | manager, admin |
| Reject expense | manager, admin |
| Delete expense | admin |
| View all users | admin |
| Change role | admin |

# What I Fixed

- Added roleMiddleware.js
- Added requireRole middleware
- Added role to JWT payload
- Restricted expense routes
- Restricted user routes
- Added ownership check in updateExpense controller

# Verification Results

| Scenario | Expected | Actual |
|---|---|---|
| User approve expense | 403 | 403 |
| User delete expense | 403 | 403 |
| User role change | 403 | 403 |
| Manager approve | 200 | 200 |
| Manager role change | 403 | 403 |
| Admin delete | 200 | 200 |
| Admin role change | 200 | 200 |