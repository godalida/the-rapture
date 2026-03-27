import React from 'react';

export const EagleIcon = ({ className = "" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Majestic Eagle Wings Spread */}
    <path d="M12 10c-2-2-5-3-8-3 3 0 6 1 8 3 2-2 5-3 8-3-3 0-6 1-8 3" />
    <path d="M12 10c-3-1-7-1-10 1 3-2 7-2 10-1 3-1 7-1 10 1-3-2-7-2-10-1" />
    <path d="M12 10c-4 0-8 1-11 3 3-2 7-3 11-3 4 0 8 1 11 3-3-2-7-3-11-3" />
    
    {/* Eagle Body & Head */}
    <path d="M12 10v8c0 1-1 2-2 2 1 0 2-1 2-2v-8" />
    <path d="M12 10c0-2 1-4 3-5-1 0-2 1-3 2-1-1-2-2-3-2 2 1 3 3 3 5" />
    
    {/* Tail Feathers */}
    <path d="M10 18l2 3 2-3" />
    
    {/* Beak detail */}
    <path d="M12 5.5l1 1" />
  </svg>
);
