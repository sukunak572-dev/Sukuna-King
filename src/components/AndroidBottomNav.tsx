import React from 'react';
import { Home, Bot, Mic, Grid, Smartphone } from 'lucide-react';
import { sound } from '../services/soundEffects';

export type NavTab = 'home' | 'chat' | 'voice' | 'apps' | 'apk';

interface AndroidBottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const AndroidBottomNav: React.FC<AndroidBottomNavProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const tabs = [
    { id: 'home' as NavTab, label: 'HUD Home', icon: Home },
    { id: 'chat' as NavTab, label: 'Assistant', icon: Bot },
    { id: 'voice' as NavTab, label: 'Voice AI', icon: Mic, special: true },
    { id: 'apps' as NavTab, label: 'Apps', icon: Grid },
    { id: 'apk' as NavTab, label: 'APK & PWA', icon: Smartphone, badge: 'v2.4' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#050810]/95 backdrop-blur-lg border-t border-cyan-900/40 px-2 pb-safe pt-1 shadow-2xl shadow-cyan-950/50">
      <div className="max-w-md mx-auto flex items-center justify-around py-1">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;

          if (tab.special) {
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playArcPulse();
                  onSelectTab(tab.id);
                }}
                className="relative -top-4 flex flex-col items-center group active:scale-95 transition"
              >
                <div
                  className={`w-13 h-13 rounded-full flex items-center justify-center shadow-lg transition-all ${
                    isActive
                      ? 'bg-cyan-400 text-slate-950 shadow-cyan-400/50 scale-105'
                      : 'bg-gradient-to-tr from-cyan-600 to-cyan-400 text-slate-950 shadow-cyan-500/30 hover:scale-105'
                  }`}
                >
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-orbitron font-semibold text-cyan-300 mt-1 tracking-wider">
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playBeep(700);
                onSelectTab(tab.id);
              }}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all active:scale-95 ${
                isActive
                  ? 'text-cyan-300'
                  : 'text-slate-400 hover:text-cyan-200'
              }`}
            >
              <div
                className={`p-1.5 rounded-lg transition-colors relative ${
                  isActive ? 'bg-cyan-950/80 border border-cyan-500/50 shadow-sm shadow-cyan-500/20' : ''
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-300' : 'text-slate-400'}`} />
                {tab.badge && (
                  <span className="absolute -top-1 -right-1.5 px-1 py-0.2 text-[8px] font-mono bg-cyan-500 text-slate-950 font-bold rounded-full">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[11px] font-rajdhani font-semibold tracking-wide mt-0.5 ${
                  isActive ? 'text-cyan-300' : 'text-slate-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
