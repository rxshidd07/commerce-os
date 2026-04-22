'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useOrderStore } from '@/hooks/useOrders';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

const statusColors = {
  pending: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30',
  completed: 'bg-green-500/10 text-green-300 border-green-500/30',
  failed: 'bg-red-500/10 text-red-300 border-red-500/30',
  refunded: 'bg-slate-500/10 text-slate-300 border-slate-500/30',
  shipped: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
  delivered: 'bg-green-500/10 text-green-300 border-green-500/30',
  cancelled: 'bg-red-500/10 text-red-300 border-red-500/30',
};

export default function OrdersPage() {
  const { orders, loading, fetchOrders, updateOrder } = useOrderStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.payment_status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">Orders</h1>
        <p className="text-slate-400">Manage and track all your orders</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="flex-1">
          <Input
            placeholder="Search by customer name, email, or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon="🔍"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>
      </motion.div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin h-8 w-8 border-4 border-slate-700 border-t-blue-500 rounded-full mx-auto mb-4" />
              <p className="text-slate-400">Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-slate-400 text-lg">No orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50 bg-slate-800/30">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Payment</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Shipping</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {filteredOrders.map((order, idx) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm text-blue-400">{order.id.slice(0, 8)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-white">{order.customer_name}</p>
                          <p className="text-xs text-slate-400">{order.customer_email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-green-400">${order.total.toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${
                            statusColors[order.payment_status as keyof typeof statusColors] ||
                            statusColors.pending
                          }`}
                        >
                          {order.payment_status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${
                            statusColors[order.shipping_status as keyof typeof statusColors] ||
                            statusColors.pending
                          }`}
                        >
                          {order.shipping_status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-3 gap-6"
      >
        <Card className="p-6">
          <h3 className="text-slate-400 text-sm font-medium mb-2">Total Orders</h3>
          <p className="text-3xl font-bold">{orders.length}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-slate-400 text-sm font-medium mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-400">
            ${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-slate-400 text-sm font-medium mb-2">Pending Orders</h3>
          <p className="text-3xl font-bold text-yellow-400">
            {orders.filter((o) => o.payment_status === 'pending').length}
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
