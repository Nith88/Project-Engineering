require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

// In-memory storage for confessions
let confessions = [];
let confessionIdCounter = 0;

// Allowed categories (centralized to avoid duplication)
const VALID_CATEGORIES = ["bug", "deadline", "imposter", "vibe-code"];

/**
 * Validate confession input before processing
 * Ensures only valid data is stored in the system
 */
function validateConfessionInput(data) {
  if (!data || !data.text) return "need text";
  if (data.text.length === 0) return "too short";
  if (data.text.length >= 500) return "text too big";
  if (!VALID_CATEGORIES.includes(data.category)) return "invalid category";
  return null;
}

/**
 * Create a new confession
 * Validates input and stores data safely
 */
app.post('/api/v1/confessions', (req, res) => {
  const error = validateConfessionInput(req.body);

  if (error) {
    return res.status(400).json({ msg: error });
  }

  const newConfession = {
    id: ++confessionIdCounter,
    text: req.body.text,
    category: req.body.category,
    created_at: new Date()
  };

  confessions.push(newConfession);

  console.log(`Added confession with ID ${newConfession.id}`);
  res.status(201).json(newConfession);
});

/**
 * Get all confessions
 * Sorted by latest first for better readability
 */
app.get('/api/v1/confessions', (req, res) => {
  const sortedConfessions = [...confessions].sort(
    (a, b) => b.created_at - a.created_at
  );

  res.json({
    data: sortedConfessions,
    count: sortedConfessions.length
  });
});

/**
 * Get a single confession by ID
 * Returns 404 if not found
 */
app.get('/api/v1/confessions/:id', (req, res) => {
  const id = Number(req.params.id);

  const confession = confessions.find(c => c.id === id);

  if (!confession) {
    return res.status(404).json({ msg: 'not found' });
  }

  res.json(confession);
});

/**
 * Get confessions by category
 * Validates category before filtering
 */
app.get('/api/v1/confessions/category/:cat', (req, res) => {
  const category = req.params.cat;

  if (!VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({ msg: 'invalid category' });
  }

  const filteredConfessions = confessions
    .filter(c => c.category === category)
    .reverse();

  res.json(filteredConfessions);
});

/**
 * Delete a confession by ID
 * Protected using a secret token for basic authorization
 */
app.delete('/api/v1/confessions/:id', (req, res) => {
  if (req.headers['x-delete-token'] !== process.env.DELETE_TOKEN) {
    return res.status(403).json({ msg: 'no permission' });
  }

  const id = Number(req.params.id);

  const index = confessions.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ msg: 'not found' });
  }

  const deletedConfession = confessions.splice(index, 1);

  console.log(`Deleted confession with ID ${id}`);

  res.json({
    msg: "ok",
    item: deletedConfession[0]
  });
});

/**
 * Start server using environment variable
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});