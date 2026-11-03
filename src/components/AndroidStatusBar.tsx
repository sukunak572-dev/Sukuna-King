import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export const AndroidStatusBar: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-7 bg-[#04070d]/90 backdrop-blur-md px-4 flex items-center justify-between text-[11px] text-cyan-400/80 font-mono select-none border-b border-cyan-950/40 z-40 sticky top-0">
      <div className="flex items-center gap-2">
        <span className="font-semibold tracking-wider text-cyan-300">{time || '12:00'}</span>
        <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-semibold tracking-widest uppercase">
          JARVIS OS
        </span>
      </div>
      <div className="flex items-center gap-2 text-cyan-400/90">
        <span className="text-[10px] tracking-tight font-bold text-cyan-400">5G</span>
        <Signal className="w-3.5 h-3.5 text-cyan-400" />
        <Wifi className="w-3.5 h-3.5 text-cyan-400" />
        <div className="flex items-center gap-1">
          <span className="text-[10px]">98%</span>
          <BatteryMedium className="w-4 h-4 text-cyan-400" />
        </div>
      </div>
    </div>
  );
};
