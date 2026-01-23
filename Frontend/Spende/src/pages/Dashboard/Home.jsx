import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { LuTrendingUp, LuTrendingDown, LuWallet } from 'react-icons/lu';
import moment from 'moment';

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899'];

const Home = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.dashboard.data);
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-6 text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
  return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="text-center">
          <p className="text-gray-600 font-medium text-lg">Failed to load dashboard data</p>
          <button
            onClick={fetchDashboardData}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { summary, recentTransactions, last30DaysExpenses, last60DaysIncome, expenseDetails, incomeDetails } = dashboardData;

  return (
    <div className="space-y-8">
      <div className="mb-2">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600 text-lg">Welcome back! Here's your financial overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Balance"
          value={summary.balance}
          icon={LuWallet}
          color="bg-blue-500"
          prefix="$"
        />
        <SummaryCard
          title="Total Income"
          value={summary.totalIncome}
          icon={LuTrendingUp}
          color="bg-green-500"
          prefix="$"
        />
        <SummaryCard
          title="Total Expenses"
          value={summary.totalExpense}
          icon={LuTrendingDown}
          color="bg-red-500"
          prefix="$"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full"></div>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No transactions yet</p>
                <p className="text-gray-300 text-sm mt-2">Start adding income or expenses to see them here</p>
              </div>
            )}
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Financial Overview</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>
          {expenseDetails.length > 0 || incomeDetails.length > 0 ? (
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={[
                    ...incomeDetails.map(item => ({ name: item.source, value: item.amount, type: 'income' })),
                    ...expenseDetails.map(item => ({ name: item.category, value: item.amount, type: 'expense' })),
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  outerRadius={90}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {[...incomeDetails, ...expenseDetails].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `$${value.toLocaleString()}`}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No data available</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Last 30 Days Expenses</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
          </div>
          {last30DaysExpenses.length > 0 ? (
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={last30DaysExpenses} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="category" 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  stroke="#9ca3af"
                />
                <YAxis 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  stroke="#9ca3af"
                />
                <Tooltip 
                  formatter={(value) => `$${value.toLocaleString()}`}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'white'
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                  iconType="line"
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  dot={{ fill: '#ef4444', r: 5 }}
                  activeDot={{ r: 7, fill: '#dc2626' }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No expenses in the last 30 days</p>
            </div>
          )}
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Last 60 Days Income</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
          </div>
          {last60DaysIncome.length > 0 ? (
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={last60DaysIncome}
                  dataKey="amount"
                  nameKey="source"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={40}
                  label
                >
                  {last60DaysIncome.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `$${value.toLocaleString()}`}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No income in the last 60 days</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Expense Details</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></div>
          </div>
          <div className="space-y-3">
            {expenseDetails.length > 0 ? (
              expenseDetails.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-100 hover:shadow-md transition-all duration-200"
                >
                  <span className="font-semibold text-gray-800">{item.category}</span>
                  <span className="text-red-600 font-bold text-lg">${item.amount.toLocaleString()}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">No expenses yet</p>
              </div>
            )}
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Income Details</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
          </div>
          <div className="space-y-3">
            {incomeDetails.length > 0 ? (
              incomeDetails.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md transition-all duration-200"
                >
                  <span className="font-semibold text-gray-800">{item.source}</span>
                  <span className="text-green-600 font-bold text-lg">${item.amount.toLocaleString()}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">No income yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value, icon: Icon, color, prefix = '' }) => {
  const isNegative = value < 0;
  const displayValue = Math.abs(value).toLocaleString();
  
  const colorClasses = {
    'bg-blue-500': 'from-blue-500 to-blue-600',
    'bg-green-500': 'from-green-500 to-green-600',
    'bg-red-500': 'from-red-500 to-red-600',
  };
  
  const gradientClass = colorClasses[color] || 'from-gray-500 to-gray-600';
  
  return (
    <div className="card p-6 hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">{title}</p>
          <p className={`text-4xl font-bold ${isNegative ? 'text-red-600' : 'text-gray-900'} group-hover:scale-105 transition-transform duration-200`}>
            {isNegative ? '-' : ''}{prefix}{displayValue}
          </p>
        </div>
        <div className={`bg-gradient-to-br ${gradientClass} p-5 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-200`}>
          <Icon size={28} className="text-white" />
        </div>
      </div>
    </div>
  );
};

const TransactionItem = ({ transaction }) => {
  const isIncome = transaction.type === 'income';
  
  return (
    <div className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
      isIncome 
        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-100' 
        : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-100'
    }`}>
      <div className="flex items-center gap-4 flex-1">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          isIncome 
            ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
            : 'bg-gradient-to-br from-red-500 to-pink-600'
        } shadow-md`}>
          {isIncome ? (
            <LuTrendingUp size={20} className="text-white" />
          ) : (
            <LuTrendingDown size={20} className="text-white" />
          )}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-900 text-base">
            {isIncome ? transaction.source : transaction.category}
          </p>
          <p className="text-sm text-gray-500 mt-0.5">
            {moment(transaction.date).format('MMM DD, YYYY')}
          </p>
          {transaction.description && (
            <p className="text-xs text-gray-400 mt-1 line-clamp-1">{transaction.description}</p>
          )}
        </div>
      </div>
      <div className={`font-bold text-lg ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
        {isIncome ? '+' : '-'}${transaction.amount.toLocaleString()}
      </div>
    </div>
  );
};

export default Home;
