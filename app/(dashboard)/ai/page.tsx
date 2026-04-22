'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const aiFeatures = [
  {
    title: 'Product Description Generator',
    icon: '✨',
    description: 'AI-powered product descriptions that sell',
    status: 'ready',
  },
  {
    title: 'Smart Pricing Suggestions',
    icon: '💹',
    description: 'Optimize prices based on market trends',
    status: 'ready',
  },
  {
    title: 'Sales Forecasting',
    icon: '📈',
    description: 'Predict future sales with machine learning',
    status: 'ready',
  },
  {
    title: 'Product Recommendations',
    icon: '🎯',
    description: 'ML-based recommendations for customers',
    status: 'ready',
  },
  {
    title: 'Fraud Detection',
    icon: '🛡️',
    description: 'Flag suspicious transactions automatically',
    status: 'ready',
  },
  {
    title: 'Customer Segmentation',
    icon: '👥',
    description: 'Group customers by behavior patterns',
    status: 'coming_soon',
  },
];

export default function AIPage() {
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [productTitle, setProductTitle] = useState('Premium Wireless Headphones');

  const handleGenerateDescription = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setGeneratedText(
      `Experience premium audio quality with our ${productTitle}. Featuring advanced noise cancellation technology, 30-hour battery life, and premium build quality. Perfect for music lovers, professionals, and anyone who demands the best in audio. Built with premium materials and engineered for comfort. Seamless connectivity across all your devices with multi-platform support.`
    );
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold mb-2">AI Features</h1>
        <p className="text-slate-400">Automate and optimize your business with AI</p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-3 gap-6"
      >
        {aiFeatures.map((feature, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4 }}
            onClick={() => setSelectedFeature(idx)}
            className="cursor-pointer"
          >
            <Card
              className={`p-6 h-full transition-all ${
                selectedFeature === idx ? 'border-blue-500/50 bg-blue-500/5' : ''
              }`}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm mb-4">{feature.description}</p>
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    feature.status === 'ready'
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-slate-500/10 text-slate-400'
                  }`}
                >
                  {feature.status === 'ready' ? 'Available' : 'Coming Soon'}
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Demo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6">Try AI Features</h2>
        <Card className="p-8">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold mb-6">
              {aiFeatures[selectedFeature].title}
            </h3>

            {selectedFeature === 0 && (
              <div className="space-y-4">
                <p className="text-slate-400 mb-4">
                  Generate compelling product descriptions in seconds
                </p>
                <Input
                  label="Product Title"
                  placeholder="Enter your product title"
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                />
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={handleGenerateDescription}
                  isLoading={loading}
                >
                  Generate Description
                </Button>

                {generatedText && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50"
                  >
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {generatedText}
                    </p>
                  </motion.div>
                )}
              </div>
            )}

            {selectedFeature === 1 && (
              <div className="space-y-4">
                <p className="text-slate-400 mb-4">
                  Get optimal pricing recommendations based on market analysis
                </p>
                <div className="bg-slate-800/30 rounded-lg p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-slate-400 text-sm">Current Price</p>
                      <p className="text-2xl font-bold text-blue-400">$129.99</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Recommended Price</p>
                      <p className="text-2xl font-bold text-green-400">$139.99</p>
                    </div>
                  </div>
                  <div className="text-sm text-slate-400">
                    +7.7% increase based on demand patterns and competitor analysis
                  </div>
                </div>
              </div>
            )}

            {selectedFeature === 2 && (
              <div className="space-y-4">
                <p className="text-slate-400 mb-4">
                  AI-powered sales forecasting for the next 30 days
                </p>
                <div className="bg-slate-800/30 rounded-lg p-6 space-y-3">
                  <div className="flex justify-between">
                    <span>Predicted Sales</span>
                    <span className="font-bold text-blue-400">4,250 units</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Revenue</span>
                    <span className="font-bold text-green-400">$556,875</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Growth vs Last Month</span>
                    <span className="font-bold text-purple-400">+18.3%</span>
                  </div>
                </div>
              </div>
            )}

            {selectedFeature > 2 && selectedFeature < 5 && (
              <div className="text-center py-8">
                <p className="text-slate-400 text-lg">
                  {aiFeatures[selectedFeature].title} - Demo coming soon
                </p>
              </div>
            )}

            {selectedFeature === 5 && (
              <div className="text-center py-8">
                <p className="text-slate-400 text-lg">
                  {aiFeatures[selectedFeature].title} - Coming soon
                </p>
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Usage Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-3 gap-6"
      >
        <Card className="p-6">
          <h3 className="text-slate-400 text-sm font-medium mb-2">AI Calls This Month</h3>
          <p className="text-3xl font-bold">2,340</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-slate-400 text-sm font-medium mb-2">Accuracy Rate</h3>
          <p className="text-3xl font-bold text-green-400">94.8%</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-slate-400 text-sm font-medium mb-2">Time Saved</h3>
          <p className="text-3xl font-bold text-blue-400">156 hrs</p>
        </Card>
      </motion.div>
    </div>
  );
}
