'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/products', label: 'Products', icon: '🛍️' },
    { href: '/orders', label: 'Orders', icon: '📦' },
    { href: '/payments', label: 'Payments', icon: '💳' },
    { href: '/ai', label: 'AI Tools', icon: '🤖' },
    { href: '/analytics', label: 'Analytics', icon: '📈' },
    { href: '/api-docs', label: 'API Docs', icon: '🔌' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-700/50 p-6 flex flex-col">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8"
      >
        <Link href="/dashboard">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            CommerceOS
          </h1>
        </Link>
      </motion.div>

      {/* Nav Items */}
      <div className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.button
                whileHover={{ x: 4 }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                    : 'text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                <span>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </motion.button>
            </Link>
          );
        })}
      </div>

      {/* User Profile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border-t border-slate-700/50 pt-4 space-y-4"
      >
        <div className="px-4">
          <p className="text-xs text-slate-400">Logged in as</p>
          <p className="text-sm font-medium text-white truncate">{user?.email}</p>
        </div>
        <Button
          variant="ghost"
          className="w-full"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </motion.div>
    </nav>
  );
}
