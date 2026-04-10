# AI Chat Application

## Live Deployment

(Add your deployed URL here)
Example: https://your-app-name.onrender.com

---

## Overview

This is a full-stack AI chat application that maintains conversation context across multiple messages. The frontend sends the full message history to a backend server, which securely communicates with an AI API to generate responses.

---

## Question 1 — API and Model

I used the **OpenRouter API** with the model:
**openai/gpt-4o-mini**

---

## Question 2 — Why Backend Instead of Frontend

The API call is made from the backend to protect the API key from being exposed in the browser.
If the key were placed in the frontend, anyone could inspect the code and steal it, leading to unauthorized usage and potential billing abuse.

---

## Question 3 — Fallback Provider

If OpenRouter runs out of credits, I would switch to **OpenAI API** directly.

Two changes required in the code:

1. Replace the API URL from:

   ```
   https://openrouter.ai/api/v1/chat/completions
   ```

   to:

   ```
   https://api.openai.com/v1/chat/completions
   ```

2. Update the request headers and model name:

   * Change the API key variable to `OPENAI_API_KEY`
   * Use a model like `gpt-4o-mini` instead of `openai/gpt-4o-mini`

---

## Features

* Context-aware conversations
* Full message history tracking
* Backend-secured API calls
* Simple chat UI
* Error handling

---

## Tech Stack

* Frontend: HTML, CSS, JavaScript
* Backend: Node.js, Express
* API: OpenRouter

---

## How It Works

1. User sends a message from the frontend
2. Message is added to a `messages` array
3. Full conversation history is sent to the backend
4. Backend calls the AI API
5. AI response is returned and displayed
6. Conversation continues with preserved context

---
