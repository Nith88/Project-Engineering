import Expense from '../models/Expense.js';

// Get all expenses (manager/admin)
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate(
      'submittedBy',
      'name email role'
    );

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get logged-in user's expenses
export const getMyExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      submittedBy: req.user.userId,
    });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create expense
export const createExpense = async (req, res) => {
  try {
    const expense = await Expense.create({
      ...req.body,
      submittedBy: req.user.userId,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update expense
export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: 'Expense not found.',
      });
    }

    // Ownership check
    const isOwner =
      expense.submittedBy.toString() === req.user.userId;

    const isPrivileged =
      ['manager', 'admin'].includes(req.user.role);

    if (!isOwner && !isPrivileged) {
      return res.status(403).json({
        message: 'You can only modify your own expenses.',
      });
    }

    Object.assign(expense, req.body);

    await expense.save();

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Approve expense
export const approveExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: 'Expense not found.',
      });
    }

    expense.status = 'approved';

    await expense.save();

    res.status(200).json({
      message: 'Expense approved successfully.',
      expense,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Reject expense
export const rejectExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: 'Expense not found.',
      });
    }

    expense.status = 'rejected';

    await expense.save();

    res.status(200).json({
      message: 'Expense rejected successfully.',
      expense,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete expense (admin only)
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: 'Expense not found.',
      });
    }

    await expense.deleteOne();

    res.status(200).json({
      message: 'Expense deleted successfully.',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};