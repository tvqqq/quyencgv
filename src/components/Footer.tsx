import React from 'react';

export const Footer: React.FC = () => {
  const version = 'v1.6.0';

  return (
    <footer className="mt-6 border-t border-zinc-800/60 py-3 px-4 flex items-center justify-center">
      <span className="font-mono text-zinc-500 font-bold text-xs tracking-wider">
        {version}
      </span>
    </footer>
  );
};
