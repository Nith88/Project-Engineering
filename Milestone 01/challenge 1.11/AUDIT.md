# Pre-Refactor Audit

## 1. Poor Variable Naming
- `d`, `r`, `x`, `tmp`, `arr`, `res2`, `i`, `info`, `stuff`
- These names do not describe what the data represents

## 2. Monolithic Function (handleAll)
- `handleAll()` handles multiple responsibilities:
  - input validation
  - business logic
  - data storage
  - filtering
  - response formatting
  - error handling
- Violates Single Responsibility Principle

## 3. Hardcoded Values
- Categories array repeated multiple times
- Delete token (`supersecret123`) hardcoded
- Port `3000` hardcoded

## 4. No MVC Structure
- Routes, logic, and data handling all in one file (`app.js`)
- No separation of concerns

## 5. Deep Nested Conditionals
- Multiple nested `if` statements in create logic
- Reduces readability and maintainability

## 6. No Environment Variables
- Sensitive values (delete token, port) not stored in `.env`

## 7. No Reusable Functions
- Validation logic not reusable
- Filtering logic repeated

## 8. No Comments
- Complex logic has no explanation

## 9. Inconsistent Response Formats
- Sometimes `res.json()`, sometimes `res.send()`
- Error messages inconsistent

## 10. In-Memory Data Storage
- `confessions` stored in array (no DB abstraction)

## 11. Sorting Mutates Original Array
- `.sort()` modifies original `confessions` array

## 12. Redundant Checks
- `if (info.text)` after already validating earlier

## 13. Inline Business Logic in Routes
- Routes directly call `handleAll()` with flags (`'create'`, `'getAll'`, etc.)

## 14. Magic Strings for Actions
- `'create'`, `'getAll'`, `'getOne'`, `'getCat'`, `'del'`
- Should be separate functions instead

## 15. Unclear Logging
- Logs like `"added one info"` not meaningful