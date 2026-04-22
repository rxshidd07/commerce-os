import React from 'react';
import { motion } from 'framer-motion';

interface MetricProps {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function Metric({ label, value, icon, trend, className = '' }: MetricProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`bg-gradient-to-br from-slate-800/50 to-slate-900/30 border border-slate-700/50 rounded-xl p-6 ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-slate-400 text-sm font-medium">{label}</p>
        </div>
        {icon && <div className="text-2xl opacity-60">{icon}</div>}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-white mb-2">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {trend && (
            <span className={`text-xs font-medium ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% vs last month
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
