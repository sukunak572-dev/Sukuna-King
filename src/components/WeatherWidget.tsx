import React, { useState } from 'react';
import { CloudSun, Wind, Droplets, Compass, RefreshCw } from 'lucide-react';
import { sound } from '../services/soundEffects';

export const WeatherWidget: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [temp, setTemp] = useState(22);
  const [condition, setCondition] = useState('Atmosphere Clear');
  const [humidity, setHumidity] = useState(48);
  const [wind, setWind] = useState(8);

  const handleScan = () => {
    sound.playBeep(980);
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setTemp(Math.floor(20 + Math.random() * 5));
      setHumidity(Math.floor(45 + Math.random() * 10));
      setWind(Math.floor(6 + Math.random() * 6));
      sound.playAffirmative();
    }, 1200);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#091322] to-[#050a12] border border-cyan-500/30 p-3.5 shadow-lg shadow-black/40 relative overflow-hidden">
      {/* Scanline beam when scanning */}
      {isScanning && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-[scanline_1s_linear_infinite] pointer-events-none" />
      )}

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <CloudSun className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="font-orbitron font-bold text-xs text-white tracking-wide">
            ATMOSPHERIC SCANNER
          </span>
        </div>
        <button
          onClick={handleScan}
          disabled={isScanning}
          className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 hover:text-cyan-200 transition bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40"
        >
          <RefreshCw className={`w-3 h-3 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'SCANNING…' : 'SCAN'}</span>
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-1.5">
          <span className="font-orbitron font-extrabold text-3xl text-cyan-300 drop-shadow">
            {temp}°C
          </span>
          <span className="text-xs font-rajdhani text-cyan-500 font-semibold">
            ({Math.round((temp * 9) / 5 + 32)}°F)
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-orbitron font-semibold text-slate-200 block">
            {isScanning ? 'Scanning atmosphere…' : condition}
          </span>
          <span className="text-[10px] font-mono text-cyan-400/80">Local Geo Telemetry</span>
        </div>
      </div>

      {/* Atmospheric metrics grid */}
      <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-cyan-950/80 text-[11px] font-mono">
        <div className="flex items-center gap-1.5 text-slate-300">
          <Droplets className="w-3.5 h-3.5 text-cyan-400" />
          <span>Hum: {humidity}%</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300">
          <Wind className="w-3.5 h-3.5 text-cyan-400" />
          <span>Wind: {wind} km/h</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>1014 hPa</span>
        </div>
      </div>
    </div>
  );
};
