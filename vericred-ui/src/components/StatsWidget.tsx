import React from 'react';
import { CornerDecorations } from './CornerDecorations';

interface StatsWidgetProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ElementType;
  description?: string;
}

export const StatsWidget: React.FC<StatsWidgetProps> = ({
  title,
  value,
  change,
  icon: Icon,
  description,
}) => {
  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-glow transition-all duration-300">
      <CornerDecorations />
      
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{title}</span>
        <div className="w-9 h-9 rounded-xl bg-amber-100/80 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700/50 flex items-center justify-center text-amber-700 dark:text-amber-300">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{value}</span>
        {change && (
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
            {change}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-1.5 text-[11px] text-slate-400 dark:text-slate-500 leading-normal">{description}</p>
      )}
    </div>
  );
};
