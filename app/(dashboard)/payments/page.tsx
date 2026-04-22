'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const paymentMethods = [
  {
    icon: '💳',
    name: 'Credit/Debit Card',
    providers: ['Visa', 'Mastercard', 'Amex'],
    enabled: true,
    status: 'Active',
  },
  {
    icon: '🏦',
    name: 'UPI',
    providers: ['Google Pay', 'PhonePe', 'Paytm'],
    enabled: true,
    status: 'Active',
  },
  {
    icon: '💰',
    name: 'Digital Wallet',
    providers: ['Apple Pay', 'Google Wallet', 'Samsung Pay'],
    enabled: true,
    status: 'Active',
  },
  {
    icon: '🏧',
    name: 'Bank Transfer',
    providers: ['Direct Transfer', 'Net Banking'],
    enabled: false,
    status: 'Inactive',
  },
];

const recentTransactions = [
  { id: 'TXN001', customer: 'John Doe', amount: 299.99, method: 'Card', status: 'completed', date: '2026-04-23' },
  { id: 'TXN002', customer: 'Jane Smith', amount: 149.99, method: 'UPI', status: 'completed', date: '2026-04-23' },
  { id: 'TXN003', customer: 'Mike Johnson', amount: 599.99, method: 'Card', status: 'failed', date: '2026-04-22' },
  { id: 'TXN004', customer: 'Sarah Williams', amount: 99.99, method: 'Wallet', status: 'completed', date: '2026-04-22' },
];

export default function PaymentsPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold mb-2">Payments</h1>
        <p className="text-slate-400">Manage your payment methods and transactions</p>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-3 gap-6"
      >
        <Card className="p-6">
          <h3 className="text-slate-400 text-sm font-medium mb-2">Total Transactions</h3>
          <p className="text-3xl font-bold">1,284</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-slate-400 text-sm font-medium mb-2">Success Rate</h3>
          <p className="text-3xl font-bold text-green-400">98.5%</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-slate-400 text-sm font-medium mb-2">Total Volume</h3>
          <p className="text-3xl font-bold text-blue-400">$182,453</p>
        </Card>
      </motion.div>

      {/* Payment Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6">Payment Methods</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {paymentMethods.map((method, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
            >
              <Card className={`p-6 ${method.enabled ? '' : 'opacity-60'}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{method.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold">{method.name}</h3>
                      <p className="text-sm text-slate-400">{method.providers.join(', ')}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      method.enabled
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-slate-500/10 text-slate-400'
                    }`}
                  >
                    {method.status}
                  </span>
                </div>
                <Button
                  variant={method.enabled ? 'secondary' : 'primary'}
                  className="w-full"
                >
                  {method.enabled ? 'Manage' : 'Enable'}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-6">Recent Transactions</h2>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50 bg-slate-800/30">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Transaction ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Method</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {recentTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-blue-400">{txn.id}</td>
                    <td className="px-6 py-4 text-white">{txn.customer}</td>
                    <td className="px-6 py-4 text-slate-300">{txn.method}</td>
                    <td className="px-6 py-4 font-bold text-green-400">${txn.amount}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          txn.status === 'completed'
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-red-500/10 text-red-400'
                        }`}
                      >
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{txn.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
