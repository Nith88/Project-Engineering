## Variable Renames

| Old Name | New Name            | Why            |
| -------- | ------------------- | -------------- |
| d        | confessionData      | unclear        |
| r        | requestParams       | better meaning |
| x        | confessionIdCounter | purpose        |
| arr      | sortedConfessions   | meaningful     |
| res2     | deletedConfession   | clearer        |

## Function Splits

handleAll() split into:

- validateConfessionInput()
- createConfession()
- getAllConfessions()
- getConfessionById()
- getConfessionsByCategory()
- deleteConfessionById()

Why:
Original function had too many responsibilities.

## Environment Variables

| Hardcoded Value | Replaced With | Why |
|---|---|---|
| 3000 | process.env.PORT | allows flexible deployment |
| supersecret123 | process.env.DELETE_TOKEN | improves security |