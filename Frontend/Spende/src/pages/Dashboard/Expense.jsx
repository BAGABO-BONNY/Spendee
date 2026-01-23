import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuTrendingDown, LuTrash2, LuDownload, LuPlus } from 'react-icons/lu';
import moment from 'moment';
import toast from 'react-hot-toast';

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const categories = [
    'Food',
    'Transport',
    'Shopping',
    'Bills',
    'Entertainment',
    'Healthcare',
    'Education',
    'Other',
  ];

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.expense.getAll);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.category) {
      toast.error('Amount and category are required');
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.expense.add, formData);
      toast.success('Expense added successfully');
      setFormData({
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
      setShowForm(false);
      fetchExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) {
      return;
    }

    try {
      await axiosInstance.delete(API_PATHS.expense.delete(id));
      toast.success('Expense deleted successfully');
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.expense.download, {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `expenses_${Date.now()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('Expense data downloaded successfully');
    } catch (error) {
      console.error('Error downloading expenses:', error);
      toast.error('Failed to download expense data');
    }
  };

  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const thisMonthExpense = expenses
    .filter(expense => moment(expense.date).isSame(moment(), 'month'))
    .reduce((sum, expense) => sum + expense.amount, 0);

  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-6 text-gray-600 font-medium">Loading expense data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Expense</h1>
          <p className="text-gray-600 text-lg">Manage your expenses</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
          >
            <LuDownload size={20} />
            <span>Export</span>
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 font-semibold"
          >
            <LuPlus size={20} />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">Total Expenses</p>
              <p className="text-4xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-200">
                ${totalExpense.toLocaleString()}
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-5 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-200">
              <LuTrendingDown size={28} className="text-white" />
            </div>
          </div>
        </div>
        <div className="card p-6 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">This Month</p>
              <p className="text-4xl font-bold text-red-600 group-hover:scale-105 transition-transform duration-200">
                ${thisMonthExpense.toLocaleString()}
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-5 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-200">
              <LuTrendingDown size={28} className="text-white" />
            </div>
          </div>
        </div>
        <div className="card p-6 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">Total Records</p>
              <p className="text-4xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-200">{expenses.length}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-5 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-200">
              <LuTrendingDown size={28} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {Object.keys(expensesByCategory).length > 0 && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Expenses by Category</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(expensesByCategory).map(([category, amount]) => (
              <div key={category} className="p-5 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-100 hover:shadow-md transition-all duration-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">{category}</p>
                <p className="text-2xl font-bold text-red-600">
                  ${amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {showForm && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Add New Expense</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Optional description"
                  rows="3"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 font-semibold"
              >
                Add Expense
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Expense List</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></div>
          </div>
        </div>
        <div className="p-6">
          {expenses.length > 0 ? (
            <div className="space-y-4">
              {expenses.map((expense) => (
                <ExpenseCard
                  key={expense._id}
                  expense={expense}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <LuTrendingDown size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">No expense records yet</p>
              <p className="text-gray-400 text-sm mt-2">Add your first expense to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ExpenseCard = ({ expense, onDelete }) => {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div
      className="flex items-center justify-between p-5 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-100 hover:shadow-md transition-all duration-200 group"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <div className="flex-1">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-red-500 to-pink-600 p-4 rounded-xl shadow-md">
            <LuTrendingDown size={22} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-lg">{expense.category}</p>
            <p className="text-sm text-gray-500 mt-0.5">
              {moment(expense.date).format('MMM DD, YYYY')}
            </p>
            {expense.description && (
              <p className="text-xs text-gray-400 mt-1 line-clamp-1">{expense.description}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-2xl font-bold text-red-600">
          ${expense.amount.toLocaleString()}
        </span>
        {showDelete && (
          <button
            onClick={() => onDelete(expense._id)}
            className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all duration-200 hover:scale-110"
          >
            <LuTrash2 size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Expense;
