const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Cache with TTL
const cache = new Map();
const TTL = 60 * 1000; // 60 seconds

// Helper functions
const setCache = (key, data) => {
  cache.set(key, {
    data,
    expiry: Date.now() + TTL
  });
};

const getCache = (key) => {
  const entry = cache.get(key);

  if (!entry) return null;

  if (Date.now() > entry.expiry) {
    cache.delete(key);
    return null;
  }

  return entry.data;
};

const deleteCache = (key) => {
  cache.delete(key);
};

// GET /tasks
app.get('/tasks', async (req, res) => {
  const cacheKey = 'tasks:list';

  try {
    const cachedData = getCache(cacheKey);

    if (cachedData) {
      console.log('Serving from cache');
      return res.status(200).json(cachedData);
    }

    const tasks = await prisma.task.findMany();

    setCache(cacheKey, tasks);

    res.status(200).json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /tasks/:id
app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const cacheKey = `task:${id}`;

  try {
    const cachedTask = getCache(cacheKey);

    if (cachedTask) {
      return res.status(200).json(cachedTask);
    }

    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    setCache(cacheKey, task);

    res.status(200).json(task);
  } catch (err) {
    console.error('Error fetching task:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /tasks
app.post('/tasks', async (req, res) => {
  const { title, description, price } = req.body;

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        price: parseFloat(price)
      }
    });

    // Invalidate cache
    deleteCache('tasks:list');

    res.status(201).json(newTask);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /tasks/:id
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({
      where: { id: parseInt(id) }
    });

    // Invalidate cache
    deleteCache('tasks:list');
    deleteCache(`task:${id}`);

    res.status(204).send();
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Fixed Server running on http://localhost:${PORT}`);
});