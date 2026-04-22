'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Metric } from '@/components/ui/Metric';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Card } from '@/components/ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const revenueData = [
  { date: 'Mon', revenue: 4200 },
  { date: 'Tue', revenue: 3800 },
  { date: 'Wed', revenue: 5200 },
  { date: 'Thu', revenue: 4800 },
  { date: 'Fri', revenue: 6200 },
  { date: 'Sat', revenue: 7100 },
  { date: 'Sun', revenue: 8200 },
];

const activityData = [
  { time: '12 AM', orders: 12 },
  { time: '2 AM', orders: 8 },
  { time: '4 AM', orders: 5 },
  { time: '6 AM', orders: 18 },
  { time: '8 AM', orders: 24 },
  { time: '10 AM', orders: 32 },
  { time: '12 PM', orders: 28 },
  { time: '2 PM', orders: 35 },
  { time: '4 PM', orders: 42 },
  { time: '6 PM', orders: 38 },
  { time: '8 PM', orders: 45 },
  { time: '10 PM', orders: 36 },
];

const recentActivity = [
  { id: 1, type: 'Order', message: 'New order #1234 received', time: '2 min ago', status: 'success' },
  { id: 2, type: 'Product', message: 'Product "Wireless Headphones" added', time: '15 min ago', status: 'success' },
  { id: 3, type: 'Payment', message: 'Payment of $299.99 received', time: '32 min ago', status: 'success' },
  { id: 4, type: 'Shipment', message: 'Order shipped to customer', time: '1 hour ago', status: 'success' },
  { id: 5, type: 'Review', message: 'New product review received', time: '2 hours ago', status: 'success' },
];

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-slate-400">Welcome back to your commerce infrastructure</p>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Metric
            label="Total Revenue"
            value="$45,620"
            icon="💰"
            trend={{ value: 12, isPositive: true }}
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Metric
            label="Total Orders"
            value="1,284"
            icon="📦"
            trend={{ value: 8, isPositive: true }}
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Metric
            label="Total Products"
            value="342"
            icon="🛍️"
            trend={{ value: 5, isPositive: true }}
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Metric
            label="API Calls (This Month)"
            value="8,923"
            icon="🔌"
            trend={{ value: 23, isPositive: true }}
          />
        </motion.div>
      </motion.div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-6">Revenue This Week</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                  }}
                  formatter={(value: any) => `$${(value || 0).toLocaleString()}`}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Top Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 h-full">
            <h3 className="text-lg font-bold mb-6">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                <span className="text-slate-300">Conversion Rate</span>
                <span className="text-blue-400 font-bold">3.8%</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                <span className="text-slate-300">Avg Order Value</span>
                <span className="text-blue-400 font-bold">$142</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                <span className="text-slate-300">Return Rate</span>
                <span className="text-green-400 font-bold">2.1%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Customers</span>
                <span className="text-blue-400 font-bold">842</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Activity Chart + Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-6">Orders Today</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 h-full">
            <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {recentActivity.map((activity) => (
                <motion.div
                  key={activity.id}
                  whileHover={{ x: 4 }}
                  className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:border-slate-600/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-xs font-bold text-blue-400">{activity.type}</span>
                    <span className="text-xs text-slate-500">{activity.time}</span>
                  </div>
                  <p className="text-sm text-slate-300">{activity.message}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
