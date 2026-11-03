import React from 'react';
import { Download, Volume2, VolumeX, ShieldCheck, Sparkles } from 'lucide-react';
import { sound } from '../services/soundEffects';

interface AndroidHeaderProps {
  onOpenApkModal: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenVoice: () => void;
  onOpenInstallPopup?: () => void;
}

export const AndroidHeader: React.FC<AndroidHeaderProps> = ({
  onOpenApkModal,
  soundEnabled,
  onToggleSound,
  onOpenVoice,
  onOpenInstallPopup,
}) => {
  return (
    <header className="w-full bg-[#060a12]/95 backdrop-blur-md border-b border-cyan-900/30 px-3.5 py-2.5 flex items-center justify-between sticky top-7 z-30 shadow-lg shadow-black/40">
      {/* Brand & Status */}
      <div className="flex items-center gap-2.5">
        <div className="relative flex items-center justify-center">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-950 to-slate-900 border border-cyan-500/40 p-1 flex items-center justify-center shadow-sm shadow-cyan-500/20">
            <img src="/icon.svg" alt="JARVIS AI" className="w-full h-full object-contain" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400 border-2 border-[#060a12] animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-orbitron font-bold text-sm tracking-wide text-white drop-shadow">
              JARVIS AI
            </span>
            <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-cyan-900/40 text-cyan-300 border border-cyan-600/30 font-medium">
              Adam boys
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-cyan-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
            <span>Online · Core Active</span>
          </div>
        </div>
      </div>

      {/* Action Chips */}
      <div className="flex items-center gap-1.5">
        {/* Sound toggle */}
        <button
          onClick={() => {
            sound.playBeep(920);
            onToggleSound();
          }}
          className="p-1.5 rounded-lg border border-cyan-900/40 bg-cyan-950/20 text-cyan-400 hover:bg-cyan-900/40 hover:text-cyan-200 transition active:scale-95"
          title={soundEnabled ? 'Mute UI Sounds' : 'Enable UI Sounds'}
          aria-label="Toggle Sound"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
        </button>

        {/* Voice Trigger Chip */}
        <button
          onClick={() => {
            sound.playArcPulse();
            onOpenVoice();
          }}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 text-xs font-rajdhani font-semibold hover:bg-cyan-900/40 transition active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="hidden sm:inline">Voice</span>
        </button>

        {/* Dedicated APK Download Chip */}
        <button
          onClick={() => {
            sound.playAffirmative();
            onOpenApkModal();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-slate-950 text-xs font-orbitron font-bold shadow-md shadow-cyan-500/30 hover:from-cyan-400 hover:to-cyan-500 transition active:scale-95"
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>APK (18MB)</span>
        </button>
      </div>
    </header>
  );
};
