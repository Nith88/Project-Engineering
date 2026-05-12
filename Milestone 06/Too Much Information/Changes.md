# Security Audit Findings: Over-Exposed Auth Responses

## Summary
The API currently returns full user rows and oversized JWT payloads that expose sensitive internal data. This allows credential attacks, account enumeration support, internal system mapping, and privacy violations.

## Fields That Must Not Be Exposed

1. `password_hash`
- Where exposed: `POST /auth/signup`, `POST /auth/login`, `GET /auth/me`
- Risk: Even hashed passwords are sensitive secrets. Exposure increases offline cracking risk if attackers obtain response logs or intercepted traffic.

2. `verification_token`
- Where exposed: `POST /auth/signup` (via `RETURNING *`)
- Risk: Account verification bypass and unauthorized account state changes.

3. `reset_password_token`
- Where exposed: `POST /auth/login`, `GET /auth/me` (via `SELECT *`)
- Risk: Password reset takeover if token is active.

4. `stripe_customer_id`
- Where exposed: `POST /auth/login`, `GET /auth/me`, and JWT claims
- Risk: Leaks billing identifiers and third-party integration internals.

5. `salary`
- Where exposed: `POST /auth/login`, `GET /auth/me`
- Risk: Highly sensitive personal/business information; privacy and compliance concern.

6. `last_login_ip`
- Where exposed: `POST /auth/login`, `GET /auth/me`
- Risk: Reveals network/location signals that can aid targeting and social engineering.

7. `feature_flags`
- Where exposed: `POST /auth/login`, `GET /auth/me`, and JWT claims
- Risk: Reveals internal product controls and can help abuse gated functionality.

8. `subscription_plan`
- Where exposed: `POST /auth/login`, `GET /auth/me`, and JWT claims
- Risk: Exposes business metadata and tenancy/commercial intelligence.

9. `is_admin`
- Where exposed: `POST /auth/login`, `GET /auth/me`, and JWT claims
- Risk: Explicit privilege disclosure can assist targeted privilege escalation attempts.

10. Internal timestamps and metadata (`created_at`, `updated_at`)
- Where exposed: `POST /auth/login`, `GET /auth/me`
- Risk: Enables user/account profiling and operational reconnaissance with no auth UX value.

## JWT-Specific Findings
JWT currently contains more claims than necessary (`email`, `role`, `isAdmin`, `stripeCustomerId`, `subscriptionPlan`, `featureFlags`).

Only the minimum identity claim should be present (for this app: `userId`), with role and profile details fetched server-side when needed.

## Remediation Plan
- Replace all `SELECT *` and `RETURNING *` with explicit safe column lists.
- Never return credential or token-secret fields in response bodies.
- Minimize JWT payload to least privilege/least data (`userId` only).
- Return a sanitized user object from signup, login, and profile endpoints.
