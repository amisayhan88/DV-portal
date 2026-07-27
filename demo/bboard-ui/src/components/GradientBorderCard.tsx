import React from 'react';

interface GradientBorderCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GradientBorderCard: React.FC<GradientBorderCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`animated-border ${className}`}>
      <div className="animated-border-inner p-6 shadow-soft hover:shadow-glow transition-shadow duration-300">
        {children}
      </div>
    </div>
  );
};
