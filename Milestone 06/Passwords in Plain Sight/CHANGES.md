# What I Found

Password field value:
"password123"

Category:
Plain Text Storage

---

# Checkpoint 1 — Signup

Password is stored directly without hashing.

# Checkpoint 2 — Database Record

The database stores:
"password": "password123"

This is plain text storage.

# Checkpoint 3 — Login Comparison

Login uses direct string comparison:

if (user.password !== password)

This is unsafe because it requires storing the original password in plain text instead of a secure hash.

# Checkpoint 4 — User Model

The User model does not contain:
- a pre-save hook for hashing passwords
- bcrypt integration
- select: false for password protection
- password validation rules

Passwords are stored exactly as received from the client.

# Root Cause

The signup controller stored req.body.password directly into MongoDB without hashing it first. The login controller then compared passwords using direct string comparison instead of secure hashing verification.

# Why This Is Dangerous

If attackers gain access to the database, they can immediately read every user's password in plain text. Since many users reuse passwords across websites, attackers could use the leaked credentials to access email accounts, banking apps, GitHub, and other services through credential stuffing attacks.

# What I Fixed

## Before

```js
password,
```

```js
if (user.password !== password)
```

## After

```js
const hashedPassword = await bcrypt.hash(password, 10)
```

```js
const isMatch = await bcrypt.compare(password, user.password)
```

# Verification

- Signup now stores bcrypt hashed passwords
- Login succeeds with correct password
- Login fails with incorrect password
- Database no longer stores plain text passwords

