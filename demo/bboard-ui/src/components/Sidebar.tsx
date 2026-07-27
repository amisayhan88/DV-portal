import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Award,
  ShieldCheck,
  Activity,
  History,
  BarChart3,
  User,
  Settings,
  HelpCircle,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/issue', label: 'Issue Credential', icon: Award },
  { href: '/verify', label: 'Verify ZK Proof', icon: ShieldCheck },
  { href: '/activity', label: 'Activity Feed', icon: Activity },
  { href: '/transactions', label: 'Transactions', icon: History },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/profile', label: 'My Vault', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/help', label: 'Help & FAQ', icon: HelpCircle },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-64 shrink-0 bg-white/70 dark:bg-slate-900/70 border-r border-slate-200/80 dark:border-slate-800 p-4 min-h-[calc(100vh-65px)] flex flex-col justify-between backdrop-blur-md">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">Navigation</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href || (location.pathname === '/' && item.href === '/dashboard');
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-amber-100/80 text-amber-900 dark:bg-amber-500/20 dark:text-amber-300 shadow-sm border border-amber-300/40 dark:border-amber-700/40'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-emerald-50 dark:from-slate-800 dark:to-slate-850 border border-amber-200/60 dark:border-slate-700">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Zero-Knowledge Proofs</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
          Selective disclosure enabled via Midnight Compact ZK engine.
        </p>
      </div>
    </aside>
  );
};
