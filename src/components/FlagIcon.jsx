import React from 'react';

export const FlagIcon = React.memo(({ code, className = "w-6 h-4" }) => {
  if (!code) return null;
  let urlCode = code.toLowerCase();
  if (code === 'EN') urlCode = 'gb-eng';
  if (code === 'SCO') urlCode = 'gb-sct';
  
  return (
    <img 
      src={`https://flagcdn.com/w40/${urlCode}.png`} 
      alt={`Flag ${code}`}
      className={`rounded shadow-sm inline-block object-cover ${className}`}
      loading="lazy"
    />
  );
});

FlagIcon.displayName = 'FlagIcon';
