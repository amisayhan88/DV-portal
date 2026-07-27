import React from 'react';

interface CornerDecorationsProps {
  className?: string;
  color?: string;
}

export const CornerDecorations: React.FC<CornerDecorationsProps> = ({
  className = '',
  color = 'border-amber-400/60 dark:border-amber-400/40',
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className={`absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 ${color} rounded-tl-sm transition-all duration-300 group-hover:w-4 group-hover:h-4`} />
      <div className={`absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 ${color} rounded-tr-sm transition-all duration-300 group-hover:w-4 group-hover:h-4`} />
      <div className={`absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 ${color} rounded-bl-sm transition-all duration-300 group-hover:w-4 group-hover:h-4`} />
      <div className={`absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 ${color} rounded-br-sm transition-all duration-300 group-hover:w-4 group-hover:h-4`} />
    </div>
  );
};
