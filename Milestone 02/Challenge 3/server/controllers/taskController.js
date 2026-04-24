const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

// ✅ Calculate score (single source of truth)
const calculateScore = async () => {
  const tasks = await prisma.task.findMany();

  let score = 0;

  tasks.forEach(task => {
    if (task.completed) {
      score += task.important ? 20 : 10;
    }
  });

  return score;
};

// ✅ Get tasks + score
const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const score = await calculateScore();

    res.json({ tasks, score });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// ✅ Create task
const createTask = async (req, res) => {
  const { title, important } = req.body;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        important: important || false
      }
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// ✅ Update task (mark completed)
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { completed }
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// ✅ Delete task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({
      where: { id: parseInt(id) }
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};