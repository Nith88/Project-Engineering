# AUTH BUGS

## Observed Behaviours

- The app contains a login page and a fake token, but the router does not protect private pages.
- In `src/App.jsx`, `/dashboard`, `/settings`, and `/profile` are rendered directly with no auth guard.
- `src/main.jsx` imports `AuthProvider` but never uses it, so auth context is not available to route or navbar components.
- `src/context/AuthContext.jsx` stores `user` and `token` in React state, but does not persist them to `localStorage` or restore them on page reload.
- `src/components/Navbar.jsx` does not use auth state and always shows a hardcoded `Login` link.
- The login page calls `auth.login()`, but if the provider is missing, it reports an auth system failure.

## Root Cause Analysis

### Bug 1 — No Route Protection
- `App.jsx` routes are all public.
- `ProtectedRoute` is missing and private page routes are not wrapped.

### Bug 2 — Token Does Not Persist
- `AuthContext.jsx` uses `useState` for `token` only, without `localStorage.setItem` in `login()`.
- There is no `useEffect` to read stored auth state on mount.
- Refreshing the page would clear auth, causing logout.

### Bug 3 — Context Not Wired Up
- `main.jsx` renders `<App />` inside `<BrowserRouter>` without `<AuthProvider>`.
- `AuthProvider` must wrap the router/app so `useAuth()` works across pages.

### Bug 4 — Navbar Does Not Respond
- `Navbar.jsx` never calls `useAuth()` and is hardcoded to show `Login`.
- It cannot update dynamically based on `isAuthenticated` or the current user.

## Fixes Applied

- Added `AuthProvider` wrapping around `<BrowserRouter>` in `src/main.jsx`.
- Enhanced `AuthContext.jsx` to persist token/user to `localStorage`, restore state on mount, and expose `isAuthenticated`.
- Created `src/components/ProtectedRoute.jsx` to redirect unauthenticated users to `/login`.
- Wrapped the dashboard, settings, and profile routes with `ProtectedRoute` in `src/App.jsx`.
- Updated `Navbar.jsx` to render auth-aware links and logout behavior.
