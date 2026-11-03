import React from 'react';
import { sound } from '../services/soundEffects';

interface ArcReactorProps {
  isSpeaking?: boolean;
  isListening?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export const ArcReactor: React.FC<ArcReactorProps> = ({
  isSpeaking = false,
  isListening = false,
  onClick,
  size = 'md',
}) => {
  const sizeMap = {
    sm: 'w-32 h-32',
    md: 'w-52 h-52 sm:w-60 sm:h-60',
    lg: 'w-64 h-64 sm:w-72 sm:h-72',
  };

  const handleClick = () => {
    sound.playArcPulse();
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`relative ${sizeMap[size]} mx-auto flex items-center justify-center cursor-pointer select-none group transition transform active:scale-95`}
    >
      {/* Outer ambient glow */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-700 ${
          isSpeaking || isListening
            ? 'bg-cyan-500/25 blur-2xl scale-110'
            : 'bg-cyan-500/10 blur-xl group-hover:bg-cyan-500/20'
        }`}
      />

      {/* Ring 1: Outermost dashed rotation */}
      <div className="absolute inset-0 rounded-full border border-cyan-800/40 animate-arc-spin">
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-300" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-300" />
      </div>

      {/* Ring 2: Segmented cyber ring (counter-clockwise) */}
      <div className="absolute inset-3 rounded-full border-2 border-dashed border-cyan-500/40 animate-arc-spin-reverse" />

      {/* Ring 3: Segmented tick ring */}
      <div className="absolute inset-6 rounded-full border border-cyan-400/30 flex items-center justify-center">
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="absolute w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />
      </div>

      {/* Ring 4: Inner fast energy ring */}
      <div
        className={`absolute inset-9 rounded-full border-2 border-cyan-400/60 animate-arc-spin-fast ${
          isSpeaking || isListening ? 'border-cyan-300 shadow-lg shadow-cyan-400/50' : ''
        }`}
      />

      {/* Core Glowing Arc Hub */}
      <div
        className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#05111d] border-2 border-cyan-400 flex flex-col items-center justify-center transition-all duration-300 ${
          isSpeaking || isListening
            ? 'scale-105 border-cyan-200 shadow-2xl shadow-cyan-400/70'
            : 'shadow-lg shadow-cyan-500/40 group-hover:scale-102 group-hover:border-cyan-300'
        }`}
      >
        {/* Core light gradient */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-cyan-600/30 via-cyan-400/40 to-white/30 backdrop-blur-sm" />

        {/* Central Audio waveform / Pulse indicators */}
        <div className="relative z-20 flex items-center gap-1">
          {[0.6, 1, 0.7, 0.4, 0.9, 0.5].map((scale, i) => (
            <span
              key={i}
              className={`w-1 rounded-full bg-cyan-300 transition-all duration-150 ${
                isSpeaking || isListening
                  ? 'animate-pulse bg-white'
                  : 'group-hover:bg-cyan-200'
              }`}
              style={{
                height: isSpeaking || isListening ? `${14 * scale + 10}px` : `${10 * scale}px`,
                animationDelay: `${i * 120}ms`,
              }}
            />
          ))}
        </div>

        <span className="relative z-20 mt-1 font-orbitron font-bold text-[9px] text-cyan-200 tracking-wider">
          {isSpeaking ? 'TRANSMITTING' : isListening ? 'LISTENING' : 'ONLINE'}
        </span>
      </div>
    </div>
  );
};
