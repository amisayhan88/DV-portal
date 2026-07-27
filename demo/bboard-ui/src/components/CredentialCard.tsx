import React from 'react';
import { Credential } from '../store/useWalletStore';
import { CornerDecorations } from './CornerDecorations';
import { GraduationCap, ShieldCheck, CheckCircle2, AlertTriangle, Key } from 'lucide-react';

interface CredentialCardProps {
  credential: Credential;
  onGenerateProof?: (cred: Credential) => void;
}

export const CredentialCard: React.FC<CredentialCardProps> = ({ credential, onGenerateProof }) => {
  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-glow transition-all duration-300">
      <CornerDecorations />
      
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700/50 flex items-center justify-center text-amber-700 dark:text-amber-300 shadow-sm">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">{credential.degree}</h3>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">{credential.major}</p>
          </div>
        </div>

        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
          credential.status === 'VALID'
            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
            : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200 dark:border-rose-800'
        }`}>
          {credential.status === 'VALID' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />}
          {credential.status}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs">
        <div>
          <span className="text-slate-400 font-medium block">Institution</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{credential.institution}</span>
        </div>
        <div>
          <span className="text-slate-400 font-medium block">Graduation Year</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{credential.graduationYear}</span>
        </div>
        <div>
          <span className="text-slate-400 font-medium block">Private GPA</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <LockIcon className="w-3 h-3 text-slate-400" /> {credential.gpa.toFixed(2)} (Encrypted)
          </span>
        </div>
        <div>
          <span className="text-slate-400 font-medium block">Issued Date</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{credential.issueDate}</span>
        </div>
      </div>

      <div className="mt-4 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 truncate max-w-[210px]">
          <Key className="w-3.5 h-3.5 shrink-0 text-amber-500" />
          <span className="font-mono truncate">{credential.credentialHash}</span>
        </div>
        <span className="text-slate-400 font-medium shrink-0">ZK Sealed</span>
      </div>

      {onGenerateProof && (
        <button
          onClick={() => onGenerateProof(credential)}
          className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-emeraldAcc-500 text-slate-950 font-bold text-xs hover:opacity-95 shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Generate ZK Proof</span>
        </button>
      )}
    </div>
  );
};

const LockIcon = ({ className = 'w-3 h-3' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);
