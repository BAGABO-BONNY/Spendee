const Expense = require('../models/Expense');
const XLSX = require('xlsx');

exports.addExpense = async (req, res) => {
    const { amount, category, description, date } = req.body;

    if (!amount || !category) {
        return res.status(400).json({ message: 'Amount and category are required' });
    }

    try {
        const expense = await Expense.create({
            userId: req.user.id,
            amount,
            category,
            description,
            date: date || new Date(),
        });

        res.status(201).json({
            message: 'Expense added successfully',
            expense,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error adding expense', error: error.message });
    }
};

exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id })
            .sort({ date: -1 });

        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expenses', error: error.message });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        const expense = await Expense.findOne({ _id: id, userId: req.user.id });

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        await Expense.findByIdAndDelete(id);

        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting expense', error: error.message });
    }
};

exports.downloadExpenseExcel = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id })
            .sort({ date: -1 });

        const data = expenses.map(expense => ({
            'Date': new Date(expense.date).toLocaleDateString(),
            'Category': expense.category,
            'Amount': expense.amount,
            'Description': expense.description || '',
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');

        const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=expenses_${Date.now()}.xlsx`);

        res.send(buffer);
    } catch (error) {
        res.status(500).json({ message: 'Error generating Excel file', error: error.message });
    }
};
