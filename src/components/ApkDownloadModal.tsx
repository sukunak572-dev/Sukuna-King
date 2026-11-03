import React, { useState } from 'react';
import { Download, Check, Copy, AlertTriangle, ShieldCheck, FileCheck, ArrowDownToLine, RefreshCw, X } from 'lucide-react';
import { sound } from '../services/soundEffects';

interface ApkDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogActivity?: (action: string, type: 'download') => void;
}

export const ApkDownloadModal: React.FC<ApkDownloadModalProps> = ({
  isOpen,
  onClose,
  onLogActivity,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadCompleted, setDownloadCompleted] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);

  if (!isOpen) return null;

  const APK_FILE_URL = '/downloads/jarvis-ai-v2.4.1.apk';
  const APK_FILE_NAME = 'jarvis-ai-concierge-v2.4.1.apk';
  const APK_SHA256 = 'f4525a3a358283d829a0ab2529af29ffb6f1e404e9d171d017d706e8e60a02e4';

  const handleCopyHash = () => {
    navigator.clipboard.writeText(APK_SHA256);
    setCopiedHash(true);
    sound.playBeep(920);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleStartDownload = () => {
    sound.playDownloadChime();
    setDownloading(true);
    setDownloadError(null);
    setDownloadProgress(10);

    // Simulate progressive download feedback and trigger actual file download
    const stepInterval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(stepInterval);
          // Trigger actual browser download
          triggerActualDownload();
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const triggerActualDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = APK_FILE_URL;
      link.setAttribute('download', APK_FILE_NAME);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloading(false);
      setDownloadCompleted(true);
      sound.playAffirmative();

      if (onLogActivity) {
        onLogActivity('Downloaded Android APK v2.4.1 (18.4 MB)', 'download');
      }
    } catch (err) {
      setDownloading(false);
      setDownloadError('Download failed to start automatically. Please use the direct download mirror link below.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#0b1626] to-[#040810] border-2 border-cyan-500/50 p-5 sm:p-6 shadow-2xl shadow-cyan-500/20 text-white relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playBeep(520);
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-[#061220] border-2 border-cyan-400 p-2 flex items-center justify-center shadow-md shadow-cyan-500/30 shrink-0">
            <img src="/icon.svg" alt="JARVIS AI" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-orbitron font-extrabold text-lg text-white">
                Download Android APK
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-900/60 text-cyan-300 border border-cyan-500/40">
                Official Signed
              </span>
            </div>
            <p className="text-xs text-cyan-400 font-rajdhani font-medium">
              JARVIS AI Concierge for Android · Package by Adam Boys
            </p>
          </div>
        </div>

        {/* Technical Specs Card */}
        <div className="rounded-2xl bg-[#060e19] border border-cyan-900/60 p-3.5 mb-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
          <div className="p-2 rounded-xl bg-cyan-950/30 border border-cyan-900/30">
            <span className="text-[10px] text-slate-400 block">Version</span>
            <span className="font-bold text-cyan-300">v2.4.1</span>
          </div>
          <div className="p-2 rounded-xl bg-cyan-950/30 border border-cyan-900/30">
            <span className="text-[10px] text-slate-400 block">File Size</span>
            <span className="font-bold text-cyan-300">18.4 MB</span>
          </div>
          <div className="p-2 rounded-xl bg-cyan-950/30 border border-cyan-900/30">
            <span className="text-[10px] text-slate-400 block">Android OS</span>
            <span className="font-bold text-cyan-300">8.0 - 15</span>
          </div>
          <div className="p-2 rounded-xl bg-cyan-950/30 border border-cyan-900/30">
            <span className="text-[10px] text-slate-400 block">Target SDK</span>
            <span className="font-bold text-cyan-300">SDK 35</span>
          </div>
        </div>

        {/* Security & Checksum Banner */}
        <div className="rounded-xl bg-cyan-950/40 border border-cyan-800/40 p-2.5 mb-4 text-xs font-mono flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <div className="truncate">
              <span className="text-[10px] text-slate-400 block">SHA-256 Checksum</span>
              <span className="text-cyan-300 font-mono text-[11px] truncate block">
                {APK_SHA256.slice(0, 18)}...{APK_SHA256.slice(-8)}
              </span>
            </div>
          </div>
          <button
            onClick={handleCopyHash}
            className="flex items-center gap-1 px-2 py-1 rounded bg-cyan-900/50 hover:bg-cyan-800 text-cyan-200 text-[10px] transition shrink-0"
          >
            {copiedHash ? <Check className="w-3 h-3 text-cyan-300" /> : <Copy className="w-3 h-3" />}
            <span>{copiedHash ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Download Progress Bar if active */}
        {downloading && (
          <div className="mb-4 p-3 rounded-2xl bg-[#061220] border border-cyan-500/40">
            <div className="flex justify-between text-xs font-mono mb-1.5 text-cyan-300">
              <span>Downloading {APK_FILE_NAME}...</span>
              <span>{downloadProgress}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden border border-cyan-900/50">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 transition-all duration-300 rounded-full shadow-sm shadow-cyan-400"
                style={{ width: `${downloadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Download Error Alert if any */}
        {downloadError && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-white">Download Encountered an Issue</p>
              <p>{downloadError}</p>
              <a
                href={APK_FILE_URL}
                download={APK_FILE_NAME}
                className="inline-block mt-2 font-bold text-cyan-400 underline"
              >
                Click here to download directly from storage
              </a>
            </div>
          </div>
        )}

        {/* Download Success Notice */}
        {downloadCompleted && !downloading && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>APK package has been downloaded to your device! Follow the installation steps below.</span>
          </div>
        )}

        {/* Primary Download Action Button */}
        <button
          onClick={handleStartDownload}
          disabled={downloading}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-orbitron font-extrabold text-sm shadow-xl shadow-cyan-500/40 flex items-center justify-center gap-2 transition active:scale-98 mb-4 cursor-pointer"
        >
          {downloading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>PREPARING DOWNLOAD...</span>
            </>
          ) : (
            <>
              <ArrowDownToLine className="w-4 h-4 stroke-[2.5]" />
              <span>{downloadCompleted ? 'DOWNLOAD AGAIN (18.4 MB)' : 'DOWNLOAD ANDROID APK (18.4 MB)'}</span>
            </>
          )}
        </button>

        {/* Step-by-Step Installation Instructions */}
        <div className="rounded-2xl bg-[#06101c] border border-cyan-900/50 p-4 space-y-3">
          <h3 className="font-orbitron font-bold text-xs text-white tracking-wide flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-cyan-400" />
            <span>ANDROID INSTALLATION INSTRUCTIONS</span>
          </h3>

          <div className="space-y-2 text-xs font-rajdhani text-slate-200">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/50 text-cyan-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <p>
                <strong className="text-white">Download the APK file:</strong> Tap the download button above. If Chrome shows a warning ("File might be harmful"), tap <strong className="text-cyan-300">"Download anyway"</strong> (standard warning for APK files downloaded outside Google Play).
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/50 text-cyan-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <p>
                <strong className="text-white">Open the APK:</strong> Tap the notification or open your device's <strong>Downloads</strong> folder and select <code className="text-cyan-300 font-mono">jarvis-ai-concierge-v2.4.1.apk</code>.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/50 text-cyan-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                3
              </span>
              <p>
                <strong className="text-white">Allow Installation:</strong> If prompted "For your security, your phone is not allowed to install unknown apps", tap <strong className="text-cyan-300">Settings</strong> and toggle on <strong className="text-cyan-300">"Allow from this source"</strong>.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/50 text-cyan-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                4
              </span>
              <p>
                <strong className="text-white">Complete & Launch:</strong> Tap <strong className="text-cyan-300">"Install"</strong>. Once finished, tap <strong>"Open"</strong> to launch JARVIS AI from your home screen.
              </p>
            </div>
          </div>
        </div>

        {/* Direct Link Fallback */}
        <div className="mt-3 text-center">
          <a
            href={APK_FILE_URL}
            download={APK_FILE_NAME}
            className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 underline"
          >
            Direct Mirror Download: {APK_FILE_NAME}
          </a>
        </div>
      </div>
    </div>
  );
};
