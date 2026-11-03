import React, { useState, useEffect } from 'react';

export const DigitalClock: React.FC = () => {
  const [time, setTime] = useState<string>('--:--:--');
  const [dateStr, setDateStr] = useState<string>('');
  const [uptimeSeconds, setUptimeSeconds] = useState<number>(0);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
      setDateStr(
        now.toLocaleDateString([], {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      );
      setUptimeSeconds((s) => s + 1);
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (total: number) => {
    const hrs = Math.floor(total / 3600);
    const mins = Math.floor((total % 3600) / 60);
    const secs = total % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center py-2">
      <div className="inline-block px-4 py-2 rounded-2xl bg-[#08121f]/70 border border-cyan-500/30 shadow-lg shadow-cyan-950/40 backdrop-blur-md">
        <div className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase flex items-center justify-center gap-2 mb-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>CYBERNETIC TIME SYNC</span>
          <span className="text-slate-500">|</span>
          <span>UPTIME {formatUptime(uptimeSeconds)}</span>
        </div>
        <div className="font-orbitron font-extrabold text-3xl sm:text-4xl tracking-wider text-white text-glow-cyan">
          {time}
        </div>
        <div className="text-xs font-rajdhani font-semibold text-cyan-300/80 tracking-widest uppercase mt-0.5">
          {dateStr}
        </div>
      </div>
    </div>
  );
};
