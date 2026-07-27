import React, { useState } from 'react';
import { useWalletStore } from '../store/useWalletStore';
import { X, Wallet, CheckCircle2, AlertCircle, Copy, Check, Lock, Shield, RefreshCw } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { isConnected, isConnecting, walletAddress, balance, connectWallet, disconnectWallet, selectWalletProvider, activeWalletType } = useWalletStore();
  const [manualAddr, setManualAddr] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'1am' | 'lace' | 'manual'>('1am');

  if (!isOpen) return null;

  const handleCopy = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleConnect = async (provider: '1am' | 'lace' | 'manual') => {
    if (provider === 'manual') {
      if (!manualAddr.trim()) return;
      await connectWallet('custom', manualAddr.trim());
    } else {
      await connectWallet(provider);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-500 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[0.55rem] flex items-center justify-center">
                <Wallet className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Midnight Wallet Manager</h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Preprod Testnet DApp Connector</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isConnected ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active Wallet</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-300/60 dark:border-emerald-800">
                  <CheckCircle2 className="w-3 h-3" /> Connected ({activeWalletType || '1am'})
                </span>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 mb-0.5">Wallet Address (Preprod)</div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-800 dark:text-slate-200">
                  <span>{walletAddress?.substring(0, 14)}...{walletAddress?.substring(walletAddress.length - 8)}</span>
                  <button onClick={handleCopy} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white">
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Balance</span>
                <span className="text-sm font-extrabold text-slate-900 dark:text-white">{balance}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  disconnectWallet();
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 border border-red-200 dark:border-red-800 text-xs font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Disconnect Wallet</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveTab('1am')}
                className={`flex-1 py-2 rounded-lg transition-all ${activeTab === '1am' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
              >
                1am Wallet
              </button>
              <button
                onClick={() => setActiveTab('lace')}
                className={`flex-1 py-2 rounded-lg transition-all ${activeTab === 'lace' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
              >
                Midnight Lace
              </button>
              <button
                onClick={() => setActiveTab('manual')}
                className={`flex-1 py-2 rounded-lg transition-all ${activeTab === 'manual' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
              >
                Custom Address
              </button>
            </div>

            {activeTab === '1am' && (
              <div className="p-4 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs">
                    1AM
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-slate-900 dark:text-white">1am Midnight Extension</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Connect using 1am Wallet for Midnight Preprod</p>
                  </div>
                </div>
                <button
                  onClick={() => handleConnect('1am')}
                  disabled={isConnecting}
                  className="w-full py-3 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-xs hover:opacity-95 shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  {isConnecting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wallet className="w-4 h-4" />}
                  <span>{isConnecting ? 'Connecting 1am Wallet...' : 'Connect 1am Wallet'}</span>
                </button>
              </div>
            )}

            {activeTab === 'lace' && (
              <div className="p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs">
                    LACE
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-slate-900 dark:text-white">Midnight Lace Wallet</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Connect using Official Lace DApp Connector</p>
                  </div>
                </div>
                <button
                  onClick={() => handleConnect('lace')}
                  disabled={isConnecting}
                  className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs hover:opacity-95 shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  {isConnecting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wallet className="w-4 h-4" />}
                  <span>{isConnecting ? 'Connecting Midnight Lace...' : 'Connect Midnight Lace'}</span>
                </button>
              </div>
            )}

            {activeTab === 'manual' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Enter 1am / Preprod Wallet Address
                  </label>
                  <input
                    type="text"
                    placeholder="mn_addr_preprod..."
                    value={manualAddr}
                    onChange={(e) => setManualAddr(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs font-mono dark:text-white"
                  />
                </div>
                <button
                  onClick={() => handleConnect('manual')}
                  disabled={!manualAddr.trim()}
                  className="w-full py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-extrabold text-xs hover:opacity-90 shadow-sm transition-all disabled:opacity-50"
                >
                  Set Active Preprod Address
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
