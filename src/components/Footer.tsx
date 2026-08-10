import React from 'react';

export const Footer: React.FC = () => {
  const version = 'v1.1.0';

  return (
    <footer className="mt-6 border-t border-zinc-800/80 bg-zinc-900/40 py-3 px-4 rounded-xl flex items-center justify-center">
      <div className="font-mono px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 font-bold text-xs tracking-wider">
        {version}
      </div>
    </footer>
  );
};
