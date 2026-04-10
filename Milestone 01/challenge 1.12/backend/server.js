const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize dotenv at the top
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Health check route to verify server status
app.get('/health', (req, res) => {
  res.json({ status: "ok" });
});

// Chat route
app.post('/chat', async (req, res) => {
  try {
    // 1. Extract messages from request body
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({ error: "Messages are required" });
    }

    // 2. Read API key from environment
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "API key not configured" });
    }

    // 3. Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: messages,
      }),
    });

    const data = await response.json();

    // Handle API errors
    if (!response.ok) {
      console.error("OpenRouter Error:", data);
      return res.status(500).json({ error: "Error from OpenRouter API" });
    }

    // 4. Extract AI reply
    const reply = data.choices?.[0]?.message?.content;

    res.json({ reply });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🚀 START SERVER (THIS WAS MISSING)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});