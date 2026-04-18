// Mock data for tasks since Prisma is not configured
let mockTasks = [
  { id: 1, title: "Complete project setup", completed: false, createdAt: new Date() },
  { id: 2, title: "Implement Focus Timer", completed: true, createdAt: new Date() }
];

exports.getTasks = async (req, res) => {
  try {
    res.json(mockTasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date()
    };
    mockTasks.unshift(newTask);
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const taskIndex = mockTasks.findIndex(task => task.id == id);
    if (taskIndex !== -1) {
      mockTasks[taskIndex].completed = completed;
      res.json(mockTasks[taskIndex]);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
