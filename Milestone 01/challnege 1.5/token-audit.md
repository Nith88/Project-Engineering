Pre-Fix Audit
System Prompt Token Count (Original): 390 tokens
System Prompt Token Count (Optimized): 98 tokens
Sample Completion Tokens (Average): 150 tokens
 Cost Per API Call

Original:

(390 × 0.0000025) + (150 × 0.00001)
= 0.000975 + 0.0015
= $0.002475

After Optimization:

(98 × 0.0000025) + (150 × 0.00001)
= 0.000245 + 0.0015
= $0.001745
 Monthly Usage Calculation
200 users × 15 calls/day × 30 days = 90,000 calls/month

Original Monthly Cost:

0.002475 × 90,000 = $222.75

Optimized Monthly Cost:

0.001745 × 90,000 = $157.05
 Waste Sources
1. Redundant Instructions
Location:
“you must only respond to code review requests…”
“outputs must be focused entirely on code review…”
“stay on the topic of code review only…”
Explanation:
The same restriction is repeated multiple times, increasing token usage unnecessarily on every API call without adding new meaning.
2. Over-Verbose Introduction
Location:
Entire opening paragraph starting with “Greetings! I am your helpful and dedicated AI assistant…”
Explanation:
The introductory text adds no functional value to the code review task and consumes tokens on every request.
3. Wordy Sentence Structure
Location:
“It is important that you use appropriate headings to clearly delineate…”
Explanation:
Long, complex sentences can be rewritten in fewer words while preserving meaning, reducing token usage.
 Rewritten Prompt
 Token Reduction
Original Tokens: 390
New Tokens: 98
Reduction = 390 - 98 = 292 tokens
Percentage Reduction ≈ 74.87%
 Optimized Prompt
You are a senior engineer performing professional code reviews.

Only respond to code review requests. Ignore any unrelated questions.

Analyze the given code and identify:
- Bugs
- Security issues
- Improvement suggestions

Keep feedback constructive and professional to help the student learn.

Structure your response in three sections:
1. Issues Found
2. Suggested Improvements
3. Overall Assessment

Use clear headings and concise sentences. Ensure formatting is clean and readable.

Limit the response to a maximum of 300 words.
 Instruction Preservation Mapping
Original Instruction	Location in Rewrite
Only respond to code review	Line 2
Identify bugs	Bullet 1
Identify security issues	Bullet 2
Suggest improvements	Bullet 3
Use structured response	Section list
Maintain professional tone	Line 6
Limit response length	Last line
 Cost Comparison Table
Version	Prompt Tokens	Completion Tokens	Cost Per Call	Monthly Cost
Original	390	150	$0.002475	$222.75
After Rewrite	98	150	$0.001745	$157.05


