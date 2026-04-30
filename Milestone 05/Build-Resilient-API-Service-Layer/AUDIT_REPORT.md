1. Products Page Issue
API calls: (write what you observed)
Issue: Infinite API requests loop
Cause: useEffect dependency includes state that is updated inside effect
Impact: Browser freeze due to excessive requests
2. Cart Page Issue
API response: 200 OK
UI update: Not reflected correctly
Issue: State mutation (same reference used)
Cause: Direct mutation instead of immutable update
Impact: Cart shows incorrect values
3. General Architecture Issues
Direct API calls in components
No centralized service layer
No consistent error handling
No token handling standardization