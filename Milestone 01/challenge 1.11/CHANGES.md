# CHANGES.md

## Variable Renames

| Old Name | New Name | Why |
|----------|----------|-----|
| d | requestBody | more descriptive |
| r | requestParams | clearly represents params |
| x | confessionIdCounter | tracks IDs |
| tmp | newConfession | stores new object |
| arr | sortedConfessions | represents sorted data |
| res2 | deletedItem | result of delete |
| i | confessionId | clearer meaning |
| info | confession | represents single confession |
| stuff | filteredConfessions | filtered list |

---

## Function Splits

### handleAll() split into:

- createConfession() → handles creation logic  
- getAllConfessions() → returns all data  
- getConfessionById() → fetch single item  
- getConfessionsByCategory() → filter by category  
- deleteConfession() → deletes item  

### Why:
The original function handled multiple responsibilities.  
Splitting improves readability, maintainability, and testability.