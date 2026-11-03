import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-24 z-50 flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 px-4 py-2.5 text-xs font-rajdhani font-bold text-white shadow-xl shadow-amber-950/60 border border-amber-400/40 animate-bounce">
      <WifiOff className="w-4 h-4 text-white shrink-0" />
      <div className="flex-1">
        <span className="block font-orbitron text-[10px]">OFFLINE MODE ACTIVE</span>
        <span className="text-[11px] font-mono text-amber-100">
          Running from local PWA Cache & Storage
        </span>
      </div>
    </div>
  );
};
