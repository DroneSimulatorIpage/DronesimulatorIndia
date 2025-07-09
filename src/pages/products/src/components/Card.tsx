import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  highlighted?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', highlighted = false }) => {
  return (
    <div
      className={`
        bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300
        hover:shadow-lg ${highlighted ? 'border-2 border-orange-500 shadow-lg' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;