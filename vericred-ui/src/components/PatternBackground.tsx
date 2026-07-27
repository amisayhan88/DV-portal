import React from 'react';

export const PatternBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 bg-pattern-grid opacity-60 dark:opacity-30" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-100/50 dark:bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-emeraldAcc-400/20 dark:bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-brand-200/40 dark:bg-yellow-500/10 rounded-full blur-3xl" />
    </div>
  );
};
