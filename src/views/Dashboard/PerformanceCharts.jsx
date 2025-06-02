import React from 'react';
import { 
  LineChart as RechartsLineChart, Line, AreaChart, Area, BarChart as RechartsBarChart, 
  Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, ComposedChart 
} from 'recharts';
import { PERFORMANCE_DATA, PACKAGE_DATA } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';

export default function PerformanceCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
      {/* Sales Performance Chart */}
      <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6">
        <h3 className="text-base lg:text-xl font-bold text-gray-800 mb-4">ביצועי מכירות</h3>
        <div className="h-64 lg:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={PERFORMANCE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" tick={{ fontSize: 12 }} />
              <YAxis stroke="#666" tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="sales" fill="#8B5CF6" name="מכירות" />
              <Line type="monotone" dataKey="conversion" stroke="#F59E0B" name="אחוז המרה" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Package Distribution Pie Chart */}
      <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6">
        <h3 className="text-base lg:text-xl font-bold text-gray-800 mb-4">התפלגות חבילות נמכרות</h3>
        <div className="h-64 lg:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={PACKAGE_DATA}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius="80%"
                fill="#8884d8"
                dataKey="value"
              >
                {PACKAGE_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}