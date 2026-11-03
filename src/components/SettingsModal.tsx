import React from 'react';
import { Settings, Volume2, Sparkles, Smartphone, RotateCcw, X, Info } from 'lucide-react';
import { sound } from '../services/soundEffects';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetInstallPrompt: () => void;
  isInstalled: boolean;
  glowLevel: 'high' | 'med' | 'low';
  onChangeGlow: (level: 'high' | 'med' | 'low') => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  soundEnabled,
  onToggleSound,
  onResetInstallPrompt,
  isInstalled,
  glowLevel,
  onChangeGlow,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-md rounded-3xl bg-gradient-to-b from-[#091424] to-[#040810] border-2 border-cyan-500/50 p-5 shadow-2xl shadow-cyan-500/30 text-white relative max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-cyan-400" />
          <h2 className="font-orbitron font-extrabold text-lg text-white">
            JARVIS System Config
          </h2>
        </div>

        <div className="space-y-3 font-rajdhani text-xs">
          {/* Sound toggle */}
          <div className="p-3 rounded-2xl bg-[#06101c] border border-cyan-900/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Volume2 className="w-4 h-4 text-cyan-400" />
              <div>
                <span className="font-bold text-white block">Synthesized UI Audio</span>
                <span className="text-[11px] text-slate-400">Audio feedback & JARVIS vocalization</span>
              </div>
            </div>
            <button
              onClick={() => {
                onToggleSound();
                sound.playBeep(880);
              }}
              className={`px-3 py-1 rounded-xl font-mono text-xs font-bold transition ${
                soundEnabled ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {soundEnabled ? 'ENABLED' : 'MUTED'}
            </button>
          </div>

          {/* Glow intensity */}
          <div className="p-3 rounded-2xl bg-[#06101c] border border-cyan-900/60">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-white">HUD Neon Glow Intensity</span>
            </div>
            <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
              {(['high', 'med', 'low'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => onChangeGlow(lvl)}
                  className={`py-1.5 rounded-xl border uppercase font-bold transition ${
                    glowLevel === lvl
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                      : 'border-slate-800 bg-slate-900/40 text-slate-400'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Android PWA state & Prompt Reset */}
          <div className="p-3 rounded-2xl bg-[#06101c] border border-cyan-900/60 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-white">Android PWA Environment</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                {isInstalled ? 'Standalone Installed' : 'Browser Session'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Reset install popup if you clicked "Maybe Later" previously:
            </p>
            <button
              onClick={() => {
                onResetInstallPrompt();
                sound.playAffirmative();
              }}
              className="w-full py-1.5 rounded-xl border border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-900/40 text-cyan-300 font-mono text-xs flex items-center justify-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Installation Prompt Banner</span>
            </button>
          </div>

          {/* System Info */}
          <div className="p-3 rounded-2xl bg-[#06101c] border border-cyan-900/60 flex items-start gap-2">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-[11px] font-mono text-slate-400 leading-relaxed">
              <span className="text-white font-bold block mb-0.5">JARVIS AI Mobile Command</span>
              <span>Architecture by Adam Boys · v2.4.1 Build 20261102 · Vite 8 + PWA Workbox · Target SDK 35</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
