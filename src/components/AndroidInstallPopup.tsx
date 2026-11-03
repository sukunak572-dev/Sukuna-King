import React, { useState } from 'react';
import { Smartphone, CheckCircle2, X, Download, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { sound } from '../services/soundEffects';

interface AndroidInstallPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onInstallNow: () => Promise<void>;
  onOpenApkModal: () => void;
  isAndroid: boolean;
  isInstallable: boolean;
}

export const AndroidInstallPopup: React.FC<AndroidInstallPopupProps> = ({
  isOpen,
  onClose,
  onInstallNow,
  onOpenApkModal,
  isAndroid,
  isInstallable,
}) => {
  const [showAndroidManualGuide, setShowAndroidManualGuide] = useState(false);
  const [installing, setInstalling] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    sound.playAffirmative();
    setInstalling(true);
    try {
      if (isInstallable) {
        await onInstallNow();
        setInstalling(false);
        onClose();
      } else {
        // Fallback for Android Chrome when prompt isn't directly dispatchable
        setShowAndroidManualGuide(true);
        setInstalling(false);
      }
    } catch {
      setInstalling(false);
      setShowAndroidManualGuide(true);
    }
  };

  const handleMaybeLater = () => {
    sound.playBeep(440);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md transition-all">
      <div className="w-full max-w-md rounded-3xl bg-gradient-to-b from-[#0b1626] to-[#050a12] border-2 border-cyan-500/50 p-5 shadow-2xl shadow-cyan-500/30 text-white relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Glowing top line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        {/* Close / Dismiss 'X' */}
        <button
          onClick={handleMaybeLater}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800/60 text-slate-400 hover:text-white transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* App Identity Banner */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-[#081525] border-2 border-cyan-400 p-2 flex items-center justify-center shadow-lg shadow-cyan-500/30 relative">
            <img src="/icon.svg" alt="JARVIS AI" className="w-full h-full object-contain" />
            <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-cyan-500 text-slate-950">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-orbitron font-extrabold text-lg text-white">JARVIS AI</h2>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-900/60 text-cyan-300 border border-cyan-600/40">
                PRO
              </span>
            </div>
            <p className="text-xs text-cyan-400/90 font-rajdhani font-semibold">
              Adam Boys Mobile Architecture
            </p>
            <div className="flex items-center gap-2 text-xs font-mono mt-1 text-slate-300">
              <span className="flex items-center text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                4.9
              </span>
              <span>·</span>
              <span className="text-cyan-400 font-semibold">
                {isAndroid ? 'Android Ready' : 'Mobile PWA'}
              </span>
              <span>·</span>
              <span className="text-slate-400">Build 20261102</span>
            </div>
          </div>
        </div>

        {/* Value Proposition List */}
        <div className="bg-[#07111e]/90 rounded-2xl p-3 border border-cyan-900/50 mb-4 space-y-2 text-xs font-rajdhani">
          <div className="flex items-center gap-2 text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Full Android standalone experience with zero browser bars</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Instant voice assistant & offline atmospheric telemetry cache</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Smooth 60FPS animations optimized for mobile hardware</span>
          </div>
        </div>

        {/* Android Manual Guide if native trigger needed */}
        {showAndroidManualGuide && (
          <div className="mb-4 p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-xs text-cyan-200 font-mono">
            <p className="font-bold text-white mb-1">To add to your home screen:</p>
            <p>1. Tap Chrome's menu (three dots <span className="font-bold">⋮</span> at top right)</p>
            <p>2. Tap <span className="font-bold text-cyan-300">"Install app"</span> or <span className="font-bold text-cyan-300">"Add to Home screen"</span></p>
          </div>
        )}

        {/* Action Buttons: "Install Now" & "Maybe Later" */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={handleMaybeLater}
            className="w-full py-3 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-orbitron font-semibold text-xs transition active:scale-95"
          >
            Maybe Later
          </button>
          
          <button
            onClick={handleInstallClick}
            disabled={installing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-orbitron font-extrabold text-xs shadow-lg shadow-cyan-500/40 flex items-center justify-center gap-1.5 transition active:scale-95"
          >
            <Smartphone className="w-4 h-4" />
            <span>{installing ? 'INSTALLING…' : 'Install Now'}</span>
          </button>
        </div>

        {/* Alternate Option: Direct APK Download */}
        <div className="mt-3 pt-2.5 border-t border-cyan-950/80 flex items-center justify-between text-[11px] font-mono">
          <span className="text-slate-400">Prefer raw package?</span>
          <button
            onClick={() => {
              sound.playAffirmative();
              onClose();
              onOpenApkModal();
            }}
            className="text-cyan-400 hover:text-cyan-200 font-semibold flex items-center gap-1 hover:underline"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Android APK (18.4 MB)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
