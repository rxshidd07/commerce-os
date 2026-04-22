import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const steps = 60;
    const stepValue = end / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += stepValue;
      if (current >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, (duration * 1000) / steps);

    return () => clearInterval(interval);
  }, [end, duration]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  );
}
