# Pre-Refactor Audit

1. Function handleAll() handles multiple responsibilities:
   - input validation
   - data creation
   - filtering
   - deletion
   - response formatting

2. Variable names are unclear:
   - d (request body)
   - r (request params)
   - x (id counter)
   - arr (array of confessions)
   - res2 (deleted result)

3. Hardcoded values:
   - Port 3000
   - Delete token 'supersecret123'
   - Categories array repeated multiple times

4. No separation of concerns:
   - Everything in one file
   - No MVC structure

5. No reusable functions:
   - Validation logic deeply nested instead of reusable

6. Deep nested if-else blocks:
   - Makes code hard to read and maintain

7. No environment variable usage

8. No comments explaining logic

9. Sorting and filtering logic mixed with response handling

10. Global mutable state:

- confessions array and id counter directly modified
