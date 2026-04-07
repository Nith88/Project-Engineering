# Token Audit Report



## Pre-Fix Audit

System Prompt Token Count: 145

Sample User Message Token Count: 55

API Response Token Count: 150


Monthly Cost Calculation

Assumption:

200 users × 15 calls/day × 30 days = 90,000 calls/month

Cost per call:

= (390 × 0.0000025) + (150 × 0.00001)
= 0.000975 + 0.0015
= $0.002475

Monthly cost:

90,000 × 0.002475 = $222.75/month

## Waste Sources

1. Pattern: Filler Preamble / Over-Verbose Role Description

Location :

“Greetings! I am your helpful and dedicated AI assistant, specifically designed to assist developers and engineers with their programming tasks... ensuring that your experience is seamless and productive.”

Explanation:
This is a long introductory paragraph explaining the AI’s role and purpose. The model already understands its role from later instructions, so this adds no new functional value. It increases token usage on every API call without affecting output quality.

2. Pattern: Duplicate Instructions

Location :

“you must only respond to code review requests…”
“please refrain from answering any user questions…”
“please ensure that you stay on the topic of code review only…”

Explanation:
The same constraint (only respond to code review) is repeated multiple times in different wording. This redundancy increases token count unnecessarily since one clear instruction is sufficient for the model to follow the rule.

3. Pattern: Over-Verbose Instruction Formatting

Location :

“Each of these areas should be written in clear, complete sentences that provide enough context for the student to understand the underlying logic of your suggestions and recommendations.”

Explanation:
This instruction is overly long for a simple requirement (write clear, understandable feedback). It can be expressed in far fewer tokens without losing meaning. The extra wording increases cost on every API call.

## Rewritten Prompt

Original token count: 390

New token count: 145

Percentage reduction: 62.82%

Rewritten Prompt:

Role:
Helpful, informative AI assistant for developers and engineers; supports development workflows.

Scope:
Only respond to code review requests. Do not answer unrelated queries.

Function:
Act as a senior engineer performing professional code reviews. Analyse code to identify:
- Critical bugs
- Security vulnerabilities
- Improvement suggestions

Guidelines:
- Be constructive, helpful, and professional.
- Help the student understand mistakes, not just list them.

Response Structure:
Organize output into:
1. Issues Found
2. Suggested Improvements
3. Overall Assessment

Rules:
- Use clear, complete sentences with sufficient context.
- Maintain consistent, readable formatting with proper headings.
- Limit responses to 300 words.
- Stay strictly within code review scope.

Instruction preservation mapping:




Original Instruction                                     Location in Rewrite


Only respond to code review requests	                 Line 1
Do not answer unrelated queries	                         Line 1
Act as a senior engineer code reviewer	                 Line 1
Identify bugs, security issues, and improvements	     Line 2
Provide constructive and professional feedback	         Line 2
Help the student learn from mistakes	                 Line 2
Organize response into three sections	                 Lines 4–8
Include "Issues Found" section	                         Line 5
Include "Suggested Improvements" section	             Line 6
Include "Overall Assessment" section	                 Line 7
Use clear and complete sentences	                     Line 9
Provide enough context for understanding	             Line 9
Maintain consistent formatting and headings	             Line 9
Limit response to 300 words maximum	                     Line 11

## Cost Comparison Table



| Version       | Prompt Tokens| Completion Tokens| Cost Per Call | Monthly Cost |
|---------------|--------------|------------------|---------------|--------------|
| Original      | 390          | 255              | $0.00353      | $317.70      |
| After Rewrite | 145          | 255              | $0.00291      | $262.13      |