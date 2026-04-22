'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Commerce OS
          </h1>
          <div className="flex gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="primary">Start Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Build commerce without <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                rebuilding infrastructure
              </span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              CommerceOS gives startups and sellers the APIs, automation, and intelligence needed to launch e-commerce faster.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button variant="primary" size="lg" className="min-w-[200px]">
                  Start Free →
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="secondary" size="lg" className="min-w-[200px]">
                  View Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16"
          >
            Powerful Features
          </motion.h3>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: '🛍️',
                title: 'Product Management',
                desc: 'Create, manage, and organize unlimited products with powerful inventory tracking.',
              },
              {
                icon: '📦',
                title: 'Order Management',
                desc: 'Process orders seamlessly with real-time tracking and customer notifications.',
              },
              {
                icon: '💳',
                title: 'Payment Gateway',
                desc: 'Accept UPI, cards, and wallet payments with fraud detection.',
              },
              {
                icon: '🚚',
                title: 'Logistics Integration',
                desc: 'Connect with shipping partners for real-time delivery tracking.',
              },
              {
                icon: '🤖',
                title: 'AI Automation',
                desc: 'Generate descriptions, optimize pricing, and predict sales with AI.',
              },
              {
                icon: '📊',
                title: 'Analytics Dashboard',
                desc: 'Track revenue, customer insights, and business metrics in real-time.',
              },
            ].map((feature, idx) => (
              <motion.div key={idx} variants={item}>
                <Card className="p-6 h-full">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                  <p className="text-slate-400">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-4"
          >
            Simple Pricing
          </motion.h3>
          <p className="text-center text-slate-400 mb-16">
            Start free. Scale as you grow.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Starter',
                price: 'Free',
                requests: '10K requests/month',
                features: ['Up to 100 products', 'Basic analytics', 'Email support'],
              },
              {
                name: 'Growth',
                price: '$49',
                period: '/month',
                requests: '1M requests/month',
                features: ['Unlimited products', 'Advanced analytics', 'AI features', 'Priority support', '2% transaction fee'],
                highlight: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                requests: 'Custom limits',
                features: ['Everything in Growth', 'Dedicated support', 'Custom integrations', 'SLA guarantee'],
              },
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`p-8 h-full flex flex-col ${
                    plan.highlight ? 'border-blue-500/50 bg-blue-500/5' : ''
                  }`}
                >
                  <h4 className="text-xl font-bold mb-2">{plan.name}</h4>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-slate-400">{plan.period}</span>}
                  </div>
                  <p className="text-sm text-slate-400 mb-6">{plan.requests}</p>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2 text-slate-300">
                        <span className="text-blue-400">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.highlight ? 'primary' : 'secondary'}
                    size="lg"
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to launch your commerce?</h3>
            <p className="text-slate-400 mb-8">
              Join thousands of sellers already using CommerceOS to power their business.
            </p>
            <Link href="/auth/signup">
              <Button variant="primary" size="lg">
                Start Free Today
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-12 px-4 sm:px-6 lg:px-8 text-center text-slate-400">
        <p>© 2026 Commerce OS. The invisible infrastructure powering modern commerce.</p>
      </footer>
    </div>
  );
}
