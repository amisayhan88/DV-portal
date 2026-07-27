import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWalletStore } from '../store/useWalletStore';
import { ShieldCheck, Wallet, Lock, Sun, Moon, CheckCircle2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isConnected, isConnecting, walletAddress, balance, connectWallet, disconnectWallet } = useWalletStore();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-6 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-200 via-amber-300 to-emeraldAcc-500 p-0.5 shadow-sm group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[0.65rem] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emeraldAcc-600 dark:text-emeraldAcc-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              VeriCred <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 font-semibold border border-amber-300/60 dark:border-amber-700/60">Midnight ZK</span>
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Confidential Academic Credentials</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Preprod Testnet</span>
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {isConnected ? (
            <div className="flex items-center gap-2">
              <div className="hidden md:flex flex-col items-end px-3 py-1 rounded-xl bg-amber-50 dark:bg-slate-800/80 border border-amber-200/60 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{balance}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Connected
                </span>
              </div>
              <button
                onClick={disconnectWallet}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-semibold hover:bg-slate-800 dark:hover:bg-white shadow-sm transition-all"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{walletAddress?.substring(0, 6)}...{walletAddress?.substring(walletAddress.length - 4)}</span>
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-emeraldAcc-500 text-slate-950 font-bold text-xs hover:opacity-95 shadow-glow hover:shadow-emerald-glow transition-all duration-200 disabled:opacity-50"
            >
              <Wallet className="w-4 h-4" />
              <span>{isConnecting ? 'Connecting Wallet...' : 'Connect Midnight Wallet'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
