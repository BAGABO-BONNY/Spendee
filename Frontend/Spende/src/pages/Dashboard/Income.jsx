import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuTrendingUp, LuTrash2, LuDownload, LuPlus } from 'react-icons/lu';
import moment from 'moment';
import toast from 'react-hot-toast';

const Income = () => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    source: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.income.getAll);
      setIncomes(response.data);
    } catch (error) {
      console.error('Error fetching incomes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.source) {
      toast.error('Amount and source are required');
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.income.add, formData);
      toast.success('Income added successfully');
      setFormData({
        amount: '',
        source: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
      setShowForm(false);
      fetchIncomes();
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this income?')) {
      return;
    }

    try {
      await axiosInstance.delete(API_PATHS.income.delete(id));
      toast.success('Income deleted successfully');
      fetchIncomes();
    } catch (error) {
      console.error('Error deleting income:', error);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.income.download, {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `income_${Date.now()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('Income data downloaded successfully');
    } catch (error) {
      console.error('Error downloading income:', error);
      toast.error('Failed to download income data');
    }
  };

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const thisMonthIncome = incomes
    .filter(income => moment(income.date).isSame(moment(), 'month'))
    .reduce((sum, income) => sum + income.amount, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-6 text-gray-600 font-medium">Loading income data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Income</h1>
          <p className="text-gray-600 text-lg">Manage your income sources</p>
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
            <span>Add Income</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">Total Income</p>
              <p className="text-4xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-200">
                ${totalIncome.toLocaleString()}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-5 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-200">
              <LuTrendingUp size={28} className="text-white" />
            </div>
          </div>
        </div>
        <div className="card p-6 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">This Month</p>
              <p className="text-4xl font-bold text-green-600 group-hover:scale-105 transition-transform duration-200">
                ${thisMonthIncome.toLocaleString()}
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-5 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-200">
              <LuTrendingUp size={28} className="text-white" />
            </div>
          </div>
        </div>
        <div className="card p-6 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">Total Records</p>
              <p className="text-4xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-200">{incomes.length}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-5 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-200">
              <LuTrendingUp size={28} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Add New Income</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
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
                  Source *
                </label>
                <input
                  type="text"
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., Salary, Freelance"
                  required
                />
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
                Add Income
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
            <h2 className="text-2xl font-bold text-gray-900">Income List</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
          </div>
        </div>
        <div className="p-6">
          {incomes.length > 0 ? (
            <div className="space-y-4">
              {incomes.map((income) => (
                <IncomeCard
                  key={income._id}
                  income={income}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <LuTrendingUp size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">No income records yet</p>
              <p className="text-gray-400 text-sm mt-2">Add your first income to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const IncomeCard = ({ income, onDelete }) => {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div
      className="flex items-center justify-between p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md transition-all duration-200 group"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <div className="flex-1">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-xl shadow-md">
            <LuTrendingUp size={22} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-lg">{income.source}</p>
            <p className="text-sm text-gray-500 mt-0.5">
              {moment(income.date).format('MMM DD, YYYY')}
            </p>
            {income.description && (
              <p className="text-xs text-gray-400 mt-1 line-clamp-1">{income.description}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-2xl font-bold text-green-600">
          ${income.amount.toLocaleString()}
        </span>
        {showDelete && (
          <button
            onClick={() => onDelete(income._id)}
            className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all duration-200 hover:scale-110"
          >
            <LuTrash2 size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Income;
