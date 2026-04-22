'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('sk_live_abcd1234efgh5678');
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="space-y-8 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-slate-400">Manage your account and API keys</p>
      </motion.div>

      {/* Account Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
          <div className="space-y-4">
            <Input label="Business Name" placeholder="Your business name" defaultValue="Demo Seller" />
            <Input label="Email" type="email" placeholder="your@email.com" defaultValue="demo@commerce.os" />
            <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
            <Button variant="primary" className="w-full">
              Save Changes
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* API Keys */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">API Keys</h2>
          <p className="text-slate-400 mb-6">Manage your API keys for programmatic access.</p>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
              <div className="flex-1">
                <p className="text-sm text-slate-400 mb-1">Live API Key</p>
                <code className="font-mono text-sm">
                  {showKey ? apiKey : apiKey.replace(/./g, (_, i) => (i < 8 ? apiKey[i] : '*'))}
                </code>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? 'Hide' : 'Show'}
              </Button>
            </div>

            <Button variant="primary" className="w-full">
              Generate New Key
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-8 border-red-500/20 bg-red-500/5">
          <h2 className="text-2xl font-bold mb-6 text-red-400">Danger Zone</h2>
          <p className="text-slate-400 mb-6">Irreversible actions. Be careful!</p>
          <Button variant="danger" className="w-full">
            Delete Account
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}
