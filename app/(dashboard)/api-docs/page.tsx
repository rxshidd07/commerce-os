'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const apiEndpoints = [
  {
    method: 'POST',
    path: '/api/products',
    description: 'Create a new product',
    example: { title: 'Product Name', price: 99.99, sku: 'PROD-001' },
  },
  {
    method: 'GET',
    path: '/api/products',
    description: 'List all products',
    example: { limit: 50, offset: 0 },
  },
  {
    method: 'PUT',
    path: '/api/products/:id',
    description: 'Update a product',
    example: { title: 'Updated Name' },
  },
  {
    method: 'DELETE',
    path: '/api/products/:id',
    description: 'Delete a product',
  },
  {
    method: 'POST',
    path: '/api/orders',
    description: 'Create a new order',
    example: { customer_email: 'user@example.com', total: 99.99 },
  },
  {
    method: 'GET',
    path: '/api/orders',
    description: 'List all orders',
  },
];

const methodColors = {
  GET: 'text-blue-400 bg-blue-500/10',
  POST: 'text-green-400 bg-green-500/10',
  PUT: 'text-yellow-400 bg-yellow-500/10',
  DELETE: 'text-red-400 bg-red-500/10',
  PATCH: 'text-purple-400 bg-purple-500/10',
};

export default function APIDocsPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold mb-2">API Documentation</h1>
        <p className="text-slate-400">Build with Commerce OS APIs</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Getting Started</h2>
          <p className="text-slate-300 mb-4">
            All API requests require authentication via Bearer token in the Authorization header.
          </p>
          <div className="bg-slate-800/50 rounded-lg p-4 font-mono text-sm text-slate-300 mb-4">
            Authorization: Bearer YOUR_API_KEY
          </div>
          <Button variant="primary">Generate API Key</Button>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold">Endpoints</h2>
        {apiEndpoints.map((endpoint, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.05 }}
          >
            <Card className="p-6">
              <div className="flex flex-col md:flex-row gap-4 md:items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`px-3 py-1 rounded font-bold text-xs ${
                        methodColors[endpoint.method as keyof typeof methodColors]
                      }`}
                    >
                      {endpoint.method}
                    </span>
                    <span className="font-mono text-slate-300">{endpoint.path}</span>
                  </div>
                  <p className="text-slate-400">{endpoint.description}</p>
                  {endpoint.example && (
                    <div className="mt-3 bg-slate-800/50 rounded p-3 font-mono text-xs text-slate-400">
                      {JSON.stringify(endpoint.example, null, 2)}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6 bg-blue-500/5 border-blue-500/20">
          <h3 className="text-lg font-bold mb-2 text-blue-300">Rate Limits</h3>
          <p className="text-slate-300">
            Free tier: 10,000 requests/month | Pro tier: 1,000,000 requests/month
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
