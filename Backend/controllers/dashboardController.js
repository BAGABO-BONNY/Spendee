const Income = require('../models/Income');
const Expense = require('../models/Expense');

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;

        const [incomes, expenses] = await Promise.all([
            Income.find({ userId }),
            Expense.find({ userId }),
        ]);

        const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
        const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const balance = totalIncome - totalExpense;

        const recentTransactions = [
            ...incomes.slice(0, 5).map(income => ({
                id: income._id,
                type: 'income',
                amount: income.amount,
                source: income.source,
                date: income.date,
                description: income.description,
            })),
            ...expenses.slice(0, 5).map(expense => ({
                id: expense._id,
                type: 'expense',
                amount: expense.amount,
                category: expense.category,
                date: expense.date,
                description: expense.description,
            })),
        ]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 10);

        const now = new Date();
        const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const last60Days = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

        const last30DaysExpenses = expenses
            .filter(expense => new Date(expense.date) >= last30Days)
            .reduce((acc, expense) => {
                acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
                return acc;
            }, {});

        const last60DaysIncome = incomes
            .filter(income => new Date(income.date) >= last60Days)
            .reduce((acc, income) => {
                acc[income.source] = (acc[income.source] || 0) + income.amount;
                return acc;
            }, {});

        const expenseByCategory = expenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {});

        const incomeBySource = incomes.reduce((acc, income) => {
            acc[income.source] = (acc[income.source] || 0) + income.amount;
            return acc;
        }, {});

        const last30DaysExpenseData = Object.entries(last30DaysExpenses).map(([category, amount]) => ({
            category,
            amount,
        }));

        const last60DaysIncomeData = Object.entries(last60DaysIncome).map(([source, amount]) => ({
            source,
            amount,
        }));

        const expenseDetails = Object.entries(expenseByCategory).map(([category, amount]) => ({
            category,
            amount,
        }));

        const incomeDetails = Object.entries(incomeBySource).map(([source, amount]) => ({
            source,
            amount,
        }));

        res.status(200).json({
            summary: {
                balance,
                totalIncome,
                totalExpense,
            },
            recentTransactions,
            last30DaysExpenses: last30DaysExpenseData,
            last60DaysIncome: last60DaysIncomeData,
            expenseDetails,
            incomeDetails,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
    }
};
