const Income = require('../models/Income');
const XLSX = require('xlsx');

exports.addIncome = async (req, res) => {
    const { amount, source, description, date } = req.body;

    if (!amount || !source) {
        return res.status(400).json({ message: 'Amount and source are required' });
    }

    try {
        const income = await Income.create({
            userId: req.user.id,
            amount,
            source,
            description,
            date: date || new Date(),
        });

        res.status(201).json({
            message: 'Income added successfully',
            income,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error adding income', error: error.message });
    }
};

exports.getAllIncome = async (req, res) => {
    try {
        const incomes = await Income.find({ userId: req.user.id })
            .sort({ date: -1 });

        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching income', error: error.message });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;

    try {
        const income = await Income.findOne({ _id: id, userId: req.user.id });

        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }

        await Income.findByIdAndDelete(id);

        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting income', error: error.message });
    }
};

exports.downloadIncomeExcel = async (req, res) => {
    try {
        const incomes = await Income.find({ userId: req.user.id })
            .sort({ date: -1 });

        const data = incomes.map(income => ({
            'Date': new Date(income.date).toLocaleDateString(),
            'Source': income.source,
            'Amount': income.amount,
            'Description': income.description || '',
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Income');

        const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=income_${Date.now()}.xlsx`);

        res.send(buffer);
    } catch (error) {
        res.status(500).json({ message: 'Error generating Excel file', error: error.message });
    }
};
