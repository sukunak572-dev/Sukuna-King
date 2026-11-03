import React from 'react';
import {
  Bot,
  Mic,
  MessageSquare,
  Youtube,
  Globe,
  MessageCircle,
  Calendar,
  Clock,
  Film,
  Settings,
  Download,
  Cpu,
  Shield,
  Layers,
} from 'lucide-react';
import { sound } from '../services/soundEffects';

interface AppsGridViewProps {
  onOpenApp: (appId: string) => void;
  onLogActivity?: (action: string, type: 'app') => void;
}

export const AppsGridView: React.FC<AppsGridViewProps> = ({
  onOpenApp,
  onLogActivity,
}) => {
  const apps = [
    {
      id: 'assistant',
      name: 'AI Assistant',
      desc: 'Neural conversation engine',
      icon: Bot,
      color: 'text-cyan-400',
      bg: 'bg-cyan-950/40',
      border: 'border-cyan-500/40',
      internal: true,
    },
    {
      id: 'voice',
      name: 'Voice Assistant',
      desc: 'Hands-free voice telemetry',
      icon: Mic,
      color: 'text-cyan-300',
      bg: 'bg-cyan-950/40',
      border: 'border-cyan-500/40',
      internal: true,
    },
    {
      id: 'apk',
      name: 'Android APK Hub',
      desc: 'Download APK & PWA',
      icon: Download,
      color: 'text-white',
      bg: 'bg-cyan-500/20',
      border: 'border-cyan-400',
      highlight: true,
      internal: true,
    },
    {
      id: 'chatgpt',
      name: 'ChatGPT Portal',
      desc: 'External LLM interface',
      icon: MessageSquare,
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/30',
      border: 'border-emerald-600/30',
      url: 'https://chat.openai.com',
    },
    {
      id: 'youtube',
      name: 'YouTube Pad',
      desc: 'Streaming media player',
      icon: Youtube,
      color: 'text-rose-400',
      bg: 'bg-rose-950/30',
      border: 'border-rose-600/30',
      url: 'https://youtube.com',
    },
    {
      id: 'chrome',
      name: 'Chrome Browser',
      desc: 'Web portal navigation',
      icon: Globe,
      color: 'text-sky-400',
      bg: 'bg-sky-950/30',
      border: 'border-sky-600/30',
      url: 'https://google.com',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Web',
      desc: 'Instant message relay',
      icon: MessageCircle,
      color: 'text-green-400',
      bg: 'bg-green-950/30',
      border: 'border-green-600/30',
      url: 'https://web.whatsapp.com',
    },
    {
      id: 'calendar',
      name: 'Calendar & Tasks',
      desc: 'Event coordinator',
      icon: Calendar,
      color: 'text-cyan-400',
      bg: 'bg-cyan-950/30',
      border: 'border-cyan-700/30',
      internal: true,
    },
    {
      id: 'clock',
      name: 'World Clock & Timer',
      desc: 'Chronometer & time zones',
      icon: Clock,
      color: 'text-amber-400',
      bg: 'bg-amber-950/30',
      border: 'border-amber-600/30',
      internal: true,
    },
    {
      id: 'watchlist',
      name: 'Watchlist & Media',
      desc: 'Entertainment tracker',
      icon: Film,
      color: 'text-purple-400',
      bg: 'bg-purple-950/30',
      border: 'border-purple-600/30',
      internal: true,
    },
    {
      id: 'diagnostics',
      name: 'Diagnostics',
      desc: 'Hardware telemetry scan',
      icon: Cpu,
      color: 'text-cyan-300',
      bg: 'bg-cyan-950/30',
      border: 'border-cyan-700/30',
      internal: true,
    },
    {
      id: 'settings',
      name: 'Settings',
      desc: 'System customization',
      icon: Settings,
      color: 'text-slate-300',
      bg: 'bg-slate-900/60',
      border: 'border-slate-700/40',
      internal: true,
    },
  ];

  const handleAppClick = (app: (typeof apps)[0]) => {
    sound.playBeep(880);
    if (onLogActivity) {
      onLogActivity(`Launched ${app.name}`, 'app');
    }
    if (app.internal) {
      onOpenApp(app.id);
    } else if (app.url) {
      window.open(app.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-3 pb-24">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-orbitron font-extrabold text-base text-white">
            Applications & Workspaces
          </h2>
          <p className="text-xs font-mono text-cyan-400">
            Integrated Adam Boys Mobile Suite
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>{apps.length} APPS</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {apps.map((app) => {
          const Icon = app.icon;
          return (
            <button
              key={app.id}
              onClick={() => handleAppClick(app)}
              className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 group active:scale-95 cursor-pointer relative overflow-hidden ${
                app.highlight
                  ? 'bg-gradient-to-br from-[#0c2438] to-[#06101c] border-cyan-400 shadow-lg shadow-cyan-500/20'
                  : 'bg-[#060e19]/90 hover:bg-[#091524] border-cyan-900/50 hover:border-cyan-500/50 shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-110 ${app.bg} ${app.border}`}
                >
                  <Icon className={`w-5 h-5 ${app.color}`} />
                </div>
                {app.highlight && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-cyan-500 text-slate-950 font-bold uppercase">
                    HOT
                  </span>
                )}
              </div>

              <div>
                <span className="font-orbitron font-bold text-xs text-white block group-hover:text-cyan-300 transition-colors">
                  {app.name}
                </span>
                <span className="text-[11px] font-rajdhani text-slate-400 block line-clamp-1 mt-0.5">
                  {app.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
