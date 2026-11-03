import React, { useState } from 'react';
import {
  Download,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  ArrowDownToLine,
  HelpCircle,
  FileCode,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { sound } from '../services/soundEffects';

interface ApkHubViewProps {
  onOpenApkModal: () => void;
  onInstallPwa: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
  isAndroid: boolean;
}

export const ApkHubView: React.FC<ApkHubViewProps> = ({
  onOpenApkModal,
  onInstallPwa,
  isInstallable,
  isInstalled,
  isAndroid,
}) => {
  const [copiedHash, setCopiedHash] = useState(false);
  const SHA256 = 'f4525a3a358283d829a0ab2529af29ffb6f1e404e9d171d017d706e8e60a02e4';

  const handleCopy = () => {
    navigator.clipboard.writeText(SHA256);
    setCopiedHash(true);
    sound.playBeep(920);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-3 pb-24 space-y-4">
      {/* Hero Header */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0c2338] via-[#071322] to-[#040810] border-2 border-cyan-500/50 p-5 shadow-xl shadow-cyan-500/20 text-white relative overflow-hidden">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-[#061220] border-2 border-cyan-400 p-2 flex items-center justify-center shadow-lg shadow-cyan-400/30">
              <img src="/icon.svg" alt="JARVIS AI" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-orbitron font-extrabold text-lg sm:text-xl text-white">
                  JARVIS Android System
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-400 text-slate-950 font-bold">
                  v2.4.1
                </span>
              </div>
              <p className="text-xs font-rajdhani text-cyan-300 font-semibold">
                By Adam Boys · Mobile Architecture & PWA Suite
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs font-rajdhani text-slate-300 leading-relaxed mb-4">
          Install the complete JARVIS AI Concierge experience on your Android phone or tablet. Choose between the direct signed APK installer or instant 1-tap Progressive Web App.
        </p>

        {/* Action Button: Download APK */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => {
              sound.playAffirmative();
              onOpenApkModal();
            }}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-400 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-orbitron font-extrabold text-xs sm:text-sm shadow-xl shadow-cyan-500/30 flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
          >
            <ArrowDownToLine className="w-4 h-4 stroke-[2.5]" />
            <span>DOWNLOAD ANDROID APK (18.4 MB)</span>
          </button>

          <button
            onClick={() => {
              sound.playAffirmative();
              onInstallPwa();
            }}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#081728] hover:bg-[#0b2138] border border-cyan-500/50 text-cyan-300 font-orbitron font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
          >
            <Smartphone className="w-4 h-4 text-cyan-400" />
            <span>{isInstalled ? 'PWA INSTALLED ✓' : 'INSTALL PWA (1-TAP)'}</span>
          </button>
        </div>
      </div>

      {/* Device Compatibility Card */}
      <div className="rounded-2xl bg-[#06101c] border border-cyan-900/60 p-4">
        <h3 className="font-orbitron font-bold text-xs text-white mb-2 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>DEVICE & RUNTIME COMPATIBILITY</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Current Platform</span>
            <span className="font-bold text-cyan-300">
              {isAndroid ? 'Android OS Detected' : 'Web / Desktop Client'}
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Package Architecture</span>
            <span className="font-bold text-cyan-300">ARM64-v8a / Universal</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Display Mode</span>
            <span className="font-bold text-cyan-300">
              {isInstalled ? 'Standalone Mode' : 'PWA Ready'}
            </span>
          </div>
        </div>
      </div>

      {/* APK Specifications Table */}
      <div className="rounded-2xl bg-[#06101c] border border-cyan-900/60 p-4">
        <h3 className="font-orbitron font-bold text-xs text-white mb-3 flex items-center gap-2">
          <FileCode className="w-4 h-4 text-cyan-400" />
          <span>OFFICIAL APK SPECIFICATIONS</span>
        </h3>

        <div className="divide-y divide-cyan-950/80 text-xs font-mono">
          <div className="py-2 flex justify-between">
            <span className="text-slate-400">Application Package ID:</span>
            <span className="text-cyan-300 font-bold">com.adamboys.jarvisai</span>
          </div>
          <div className="py-2 flex justify-between">
            <span className="text-slate-400">Version Name & Code:</span>
            <span className="text-cyan-300 font-bold">v2.4.1 (Build 20401)</span>
          </div>
          <div className="py-2 flex justify-between">
            <span className="text-slate-400">APK File Size:</span>
            <span className="text-cyan-300 font-bold">18.40 MB (19,294,250 bytes)</span>
          </div>
          <div className="py-2 flex justify-between">
            <span className="text-slate-400">Minimum Android Version:</span>
            <span className="text-cyan-300 font-bold">Android 8.0+ (Oreo to Android 15)</span>
          </div>
          <div className="py-2 flex justify-between">
            <span className="text-slate-400">Target SDK Level:</span>
            <span className="text-cyan-300 font-bold">SDK 35 (Android 15)</span>
          </div>
          <div className="py-2 flex justify-between items-center gap-2">
            <span className="text-slate-400 shrink-0">SHA-256 Checksum:</span>
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-cyan-400 truncate text-[11px]">{SHA256}</span>
              <button
                onClick={handleCopy}
                className="p-1 rounded bg-cyan-950 text-cyan-300 hover:text-white shrink-0"
                title="Copy hash"
              >
                {copiedHash ? <Check className="w-3 h-3 text-cyan-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Android Installation Guide */}
      <div className="rounded-2xl bg-[#06101c] border border-cyan-900/60 p-4 space-y-3">
        <h3 className="font-orbitron font-bold text-xs text-white flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <span>HOW TO INSTALL ON ANDROID</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-rajdhani">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="font-orbitron font-bold text-cyan-400 mb-1">Step 1: Download</div>
            <p className="text-slate-300">
              Tap "Download Android APK". If your browser displays "File may be harmful", select "Download anyway" to save the signed package.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="font-orbitron font-bold text-cyan-400 mb-1">Step 2: Enable Source</div>
            <p className="text-slate-300">
              Open the downloaded APK. When Android prompts for permission, tap Settings and enable "Allow from this source".
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="font-orbitron font-bold text-cyan-400 mb-1">Step 3: Install & Launch</div>
            <p className="text-slate-300">
              Tap "Install". The system verifies the package signature and places the JARVIS icon onto your home screen launcher.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="font-orbitron font-bold text-cyan-400 mb-1">Step 4: Offline Access</div>
            <p className="text-slate-300">
              Once installed, JARVIS operates offline with localized audio synthesis and atmospheric data caching.
            </p>
          </div>
        </div>
      </div>

      {/* Changelog */}
      <div className="rounded-2xl bg-[#06101c] border border-cyan-900/60 p-4">
        <h3 className="font-orbitron font-bold text-xs text-white mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>VERSION HISTORY & UPDATES</span>
        </h3>
        <div className="space-y-2 text-xs font-rajdhani text-slate-300">
          <div className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <div className="flex justify-between font-mono text-[11px] text-cyan-400 font-bold mb-1">
              <span>v2.4.1 (Current Stable)</span>
              <span>2026-11-02</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-slate-300">
              <li>Direct Android APK download integration with verified SHA-256 signature</li>
              <li>Material 3 Android mobile navigation bar & status telemetry</li>
              <li>PWA auto-update service worker caching via Workbox</li>
              <li>Synthesized Web Audio UI sound effects and neural voice interface</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
