import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw, X, Globe } from 'lucide-react';
import { sound } from '../services/soundEffects';

interface ClockToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClockToolsModal: React.FC<ClockToolsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'stopwatch' | 'world'>('stopwatch');
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        setStopwatchTime((t) => t + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  if (!isOpen) return null;

  const formatMs = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const handleLap = () => {
    sound.playBeep(980);
    setLaps([stopwatchTime, ...laps]);
  };

  const handleReset = () => {
    sound.playBeep(440);
    setIsRunning(false);
    setStopwatchTime(0);
    setLaps([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-md rounded-3xl bg-gradient-to-b from-[#091424] to-[#040810] border-2 border-cyan-500/50 p-5 shadow-2xl shadow-cyan-500/30 text-white relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-cyan-400" />
          <h2 className="font-orbitron font-extrabold text-lg text-white">
            JARVIS Chronometer
          </h2>
        </div>

        <div className="flex border-b border-cyan-900/60 mb-4">
          <button
            onClick={() => setActiveTab('stopwatch')}
            className={`flex-1 py-2 font-orbitron text-xs font-bold transition border-b-2 ${
              activeTab === 'stopwatch'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400'
            }`}
          >
            Chronometer
          </button>
          <button
            onClick={() => setActiveTab('world')}
            className={`flex-1 py-2 font-orbitron text-xs font-bold transition border-b-2 ${
              activeTab === 'world'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400'
            }`}
          >
            World Telemetry
          </button>
        </div>

        {activeTab === 'stopwatch' ? (
          <div className="text-center py-4">
            <div className="font-orbitron font-extrabold text-4xl text-white text-glow-cyan my-4">
              {formatMs(stopwatchTime)}
            </div>

            <div className="flex justify-center gap-3 mb-6">
              <button
                onClick={() => {
                  sound.playArcPulse();
                  setIsRunning(!isRunning);
                }}
                className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-slate-950 transition active:scale-95 ${
                  isRunning
                    ? 'bg-amber-400 shadow-lg shadow-amber-400/40'
                    : 'bg-cyan-400 shadow-lg shadow-cyan-400/40'
                }`}
              >
                {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
              </button>

              <button
                onClick={handleLap}
                disabled={!isRunning}
                className="w-14 h-14 rounded-full border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 font-orbitron font-bold text-xs disabled:opacity-40 transition active:scale-95 flex items-center justify-center"
              >
                LAP
              </button>

              <button
                onClick={handleReset}
                className="w-14 h-14 rounded-full border border-slate-700 bg-slate-900 text-slate-300 hover:text-white transition active:scale-95 flex items-center justify-center"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            {laps.length > 0 && (
              <div className="max-h-36 overflow-y-auto space-y-1 text-left font-mono text-xs border-t border-cyan-900/60 pt-2">
                {laps.map((l, i) => (
                  <div key={i} className="flex justify-between py-1 border-b border-slate-800/40 text-slate-300">
                    <span className="text-cyan-400">Lap {laps.length - i}</span>
                    <span>{formatMs(l)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2.5 py-2">
            {[
              { city: 'London', tz: 'Europe/London', desc: 'GMT' },
              { city: 'New York', tz: 'America/New_York', desc: 'EST' },
              { city: 'Tokyo', tz: 'Asia/Tokyo', desc: 'JST' },
              { city: 'San Francisco', tz: 'America/Los_Angeles', desc: 'PST' },
            ].map((loc) => {
              const locTime = new Date().toLocaleTimeString('en-US', {
                timeZone: loc.tz,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
              });
              return (
                <div
                  key={loc.city}
                  className="p-3 rounded-2xl bg-[#06101c] border border-cyan-900/60 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="font-orbitron font-bold text-xs text-white">{loc.city}</div>
                      <div className="text-[10px] font-mono text-cyan-400/70">{loc.desc}</div>
                    </div>
                  </div>
                  <div className="font-mono text-sm font-bold text-cyan-300">{locTime}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
