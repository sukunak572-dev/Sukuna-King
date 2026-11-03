import React, { useState, useEffect } from 'react';
import { AndroidStatusBar } from './components/AndroidStatusBar';
import { AndroidHeader } from './components/AndroidHeader';
import { AndroidBottomNav, NavTab } from './components/AndroidBottomNav';
import { ArcReactor } from './components/ArcReactor';
import { DigitalClock } from './components/DigitalClock';
import { WeatherWidget } from './components/WeatherWidget';
import { AndroidInstallPopup } from './components/AndroidInstallPopup';
import { ApkDownloadModal } from './components/ApkDownloadModal';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { CalendarModal } from './components/CalendarModal';
import { ClockToolsModal } from './components/ClockToolsModal';
import { WatchlistModal } from './components/WatchlistModal';
import { SettingsModal } from './components/SettingsModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { AIAssistantView } from './components/AIAssistantView';
import { AppsGridView } from './components/AppsGridView';
import { ApkHubView } from './components/ApkHubView';
import { usePWAInstall } from './hooks/usePWAInstall';
import { CalendarEvent, WatchlistItem, ActivityLog } from './types';
import { sound } from './services/soundEffects';
import {
  Sparkles,
  Download,
  Calendar,
  MessageSquare,
  Mic,
  Clock,
  Film,
  Activity,
  Bell,
  Smartphone,
  ChevronRight,
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [glowLevel, setGlowLevel] = useState<'high' | 'med' | 'low'>('high');

  // Modals state
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);
  const [isInstallPopupOpen, setIsInstallPopupOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isClockModalOpen, setIsClockModalOpen] = useState(false);
  const [isWatchlistModalOpen, setIsWatchlistModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Events & Activity State
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 'e1',
      title: 'Daily AI Command Sync',
      time: '10:00',
      category: 'ai-task',
      completed: false,
    },
    {
      id: 'e2',
      title: 'Review Adam Boys Android Build v2.4',
      time: '15:30',
      category: 'work',
      completed: false,
    },
  ]);

  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([
    {
      id: 'w1',
      title: 'Iron Man (Mark VII HUD Telemetry)',
      type: 'movie',
      status: 'watching',
    },
    {
      id: 'w2',
      title: 'Severance Season 2',
      type: 'series',
      status: 'plan_to_watch',
    },
  ]);

  const [activities, setActivities] = useState<ActivityLog[]>([
    {
      id: 'a1',
      action: 'JARVIS Neural Core initialized',
      timestamp: 'Just now',
      type: 'system',
    },
    {
      id: 'a2',
      action: 'Android PWA Service Worker cached',
      timestamp: '1m ago',
      type: 'system',
    },
  ]);

  // PWA Hook
  const {
    isInstallable,
    isInstalled,
    isAndroid,
    isDismissed,
    install,
    dismiss,
    resetDismissal,
  } = usePWAInstall();

  // Automatic Install Popup on first visit after 1.5s
  useEffect(() => {
    if (!isInstalled && !isDismissed) {
      const timer = setTimeout(() => {
        setIsInstallPopupOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isInstalled, isDismissed]);

  const logActivity = (action: string, type: ActivityLog['type']) => {
    const newLog: ActivityLog = {
      id: Date.now().toString(),
      action,
      timestamp: 'Just now',
      type,
    };
    setActivities((prev) => [newLog, ...prev.slice(0, 9)]);
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
  };

  const handleMorningBriefing = () => {
    sound.playArcPulse();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const briefingText = `Good day, Sir. The current time is ${time}. Weather scanning shows 22 degrees Celsius and clear skies. You have ${
      events.filter((e) => !e.completed).length
    } pending items on your calendar. All Android PWA and APK nodes are running at optimal throughput.`;
    sound.speak(briefingText);
    logActivity('Triggered Morning Briefing', 'voice');
  };

  const handleOpenAppById = (appId: string) => {
    if (appId === 'assistant') setCurrentTab('chat');
    else if (appId === 'voice') setIsVoiceModalOpen(true);
    else if (appId === 'apk') setIsApkModalOpen(true);
    else if (appId === 'calendar') setIsCalendarModalOpen(true);
    else if (appId === 'clock') setIsClockModalOpen(true);
    else if (appId === 'watchlist') setIsWatchlistModalOpen(true);
    else if (appId === 'settings') setIsSettingsModalOpen(true);
    else if (appId === 'diagnostics') {
      sound.playArcPulse();
      sound.speak('Diagnostics running. All modules operating at nominal levels.');
      logActivity('Ran System Diagnostics', 'system');
    }
  };

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 flex flex-col relative selection:bg-cyan-500/30 selection:text-cyan-300 hud-grid">
      {/* 1. Android Status Bar */}
      <AndroidStatusBar />

      {/* 2. Top Android Header */}
      <AndroidHeader
        onOpenApkModal={() => setIsApkModalOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenVoice={() => setIsVoiceModalOpen(true)}
        onOpenInstallPopup={() => setIsInstallPopupOpen(true)}
      />

      {/* Main Tab Views */}
      <main className="flex-1 pb-20">
        {currentTab === 'home' && (
          <div className="max-w-2xl mx-auto px-4 py-3 space-y-4">
            {/* Top Greeting & Status Pill */}
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="text-cyan-300">
                <span className="text-slate-400">Greetings, </span>
                <span className="font-bold text-white">Sir.</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>Adam boys · PWA Online</span>
              </div>
            </div>

            {/* Android Install Banner / Prompt trigger if not installed */}
            {!isInstalled && (
              <div className="p-3 rounded-2xl bg-gradient-to-r from-[#0c283f] to-[#071322] border border-cyan-400/60 shadow-lg shadow-cyan-500/20 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-400/50 p-1.5 flex items-center justify-center shrink-0">
                    <Smartphone className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <span className="font-orbitron font-bold text-xs text-white block">
                      Install Android Experience
                    </span>
                    <span className="text-[11px] font-rajdhani text-cyan-300">
                      Standalone PWA or Signed APK (18.4 MB)
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    sound.playAffirmative();
                    setIsInstallPopupOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron font-extrabold text-[11px] shrink-0 shadow-md shadow-cyan-500/30 transition active:scale-95 cursor-pointer"
                >
                  INSTALL
                </button>
              </div>
            )}

            {/* Central Arc Reactor Display */}
            <div className="text-center pt-2">
              <ArcReactor
                size="md"
                onClick={() => {
                  sound.speak('JARVIS neural command active.');
                }}
              />
            </div>

            {/* Digital Chronometer */}
            <DigitalClock />

            {/* Quick Action Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => {
                  sound.playBeep(880);
                  setCurrentTab('chat');
                }}
                className="p-3 rounded-2xl bg-[#081424] hover:bg-[#0c2038] border border-cyan-900/60 hover:border-cyan-500/50 flex flex-col items-center justify-center gap-1.5 transition active:scale-95 text-center group cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="font-orbitron font-semibold text-xs text-white">
                  Talk to JARVIS
                </span>
                <span className="text-[10px] font-mono text-slate-400">New Chat</span>
              </button>

              <button
                onClick={() => {
                  sound.playArcPulse();
                  setIsVoiceModalOpen(true);
                }}
                className="p-3 rounded-2xl bg-[#081424] hover:bg-[#0c2038] border border-cyan-900/60 hover:border-cyan-500/50 flex flex-col items-center justify-center gap-1.5 transition active:scale-95 text-center group cursor-pointer"
              >
                <Mic className="w-5 h-5 text-cyan-300 group-hover:scale-110 transition-transform" />
                <span className="font-orbitron font-semibold text-xs text-white">
                  Voice Assistant
                </span>
                <span className="text-[10px] font-mono text-slate-400">Live Voice</span>
              </button>

              <button
                onClick={handleMorningBriefing}
                className="p-3 rounded-2xl bg-[#081424] hover:bg-[#0c2038] border border-cyan-900/60 hover:border-cyan-500/50 flex flex-col items-center justify-center gap-1.5 transition active:scale-95 text-center group cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="font-orbitron font-semibold text-xs text-white">
                  Morning Briefing
                </span>
                <span className="text-[10px] font-mono text-slate-400">Audio Digest</span>
              </button>

              <button
                onClick={() => {
                  sound.playAffirmative();
                  setIsCalendarModalOpen(true);
                }}
                className="p-3 rounded-2xl bg-[#081424] hover:bg-[#0c2038] border border-cyan-900/60 hover:border-cyan-500/50 flex flex-col items-center justify-center gap-1.5 transition active:scale-95 text-center group cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="font-orbitron font-semibold text-xs text-white">
                  Add Event
                </span>
                <span className="text-[10px] font-mono text-slate-400">Calendar Task</span>
              </button>
            </div>

            {/* Atmospheric Weather Scanner */}
            <WeatherWidget />

            {/* Notifications & Reminders Section */}
            <div className="rounded-2xl bg-[#07111e] border border-cyan-900/50 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-cyan-400" />
                  <span className="font-orbitron font-bold text-xs text-white">
                    Notifications & Alerts
                  </span>
                </div>
                <button
                  onClick={() => setIsCalendarModalOpen(true)}
                  className="text-[11px] font-mono text-cyan-400 hover:text-cyan-200"
                >
                  Manage Events
                </button>
              </div>

              {events.filter((e) => !e.completed).length === 0 ? (
                <div className="py-2 text-center text-xs font-mono text-slate-500">
                  All clear. No upcoming reminders.
                </div>
              ) : (
                <div className="space-y-1.5">
                  {events
                    .filter((e) => !e.completed)
                    .map((evt) => (
                      <div
                        key={evt.id}
                        onClick={() => setIsCalendarModalOpen(true)}
                        className="p-2.5 rounded-xl bg-slate-900/60 border border-cyan-950 flex items-center justify-between cursor-pointer hover:border-cyan-800 transition"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-cyan-400" />
                          <span className="text-xs font-rajdhani font-semibold text-slate-200">
                            {evt.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-400">
                          {evt.time}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Quick Applications Preview */}
            <div className="rounded-2xl bg-[#07111e] border border-cyan-900/50 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-orbitron font-bold text-xs text-white">
                  Applications Suite
                </span>
                <button
                  onClick={() => setCurrentTab('apps')}
                  className="text-[11px] font-mono text-cyan-400 hover:text-cyan-200 flex items-center gap-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center text-xs font-rajdhani">
                <button
                  onClick={() => setIsApkModalOpen(true)}
                  className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:bg-cyan-900/50 flex flex-col items-center gap-1 transition"
                >
                  <Download className="w-5 h-5 text-cyan-400" />
                  <span className="text-[11px] font-bold text-white">APK Hub</span>
                </button>

                <button
                  onClick={() => setIsCalendarModalOpen(true)}
                  className="p-2.5 rounded-xl bg-cyan-950/20 border border-cyan-900/40 hover:bg-cyan-900/30 flex flex-col items-center gap-1 transition"
                >
                  <Calendar className="w-5 h-5 text-cyan-300" />
                  <span className="text-[11px] font-medium text-slate-200">Calendar</span>
                </button>

                <button
                  onClick={() => setIsClockModalOpen(true)}
                  className="p-2.5 rounded-xl bg-cyan-950/20 border border-cyan-900/40 hover:bg-cyan-900/30 flex flex-col items-center gap-1 transition"
                >
                  <Clock className="w-5 h-5 text-amber-400" />
                  <span className="text-[11px] font-medium text-slate-200">Clock</span>
                </button>

                <button
                  onClick={() => setIsWatchlistModalOpen(true)}
                  className="p-2.5 rounded-xl bg-cyan-950/20 border border-cyan-900/40 hover:bg-cyan-900/30 flex flex-col items-center gap-1 transition"
                >
                  <Film className="w-5 h-5 text-purple-400" />
                  <span className="text-[11px] font-medium text-slate-200">Watchlist</span>
                </button>
              </div>
            </div>

            {/* Recent Activity Log */}
            <div className="rounded-2xl bg-[#07111e] border border-cyan-900/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span className="font-orbitron font-bold text-xs text-white">
                  Recent Activity
                </span>
              </div>
              <div className="space-y-1.5 font-mono text-[11px]">
                {activities.map((act) => (
                  <div
                    key={act.id}
                    className="p-2 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-center justify-between text-slate-300"
                  >
                    <span className="truncate pr-2">{act.action}</span>
                    <span className="text-[10px] text-cyan-400/80 shrink-0">
                      {act.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentTab === 'chat' && (
          <AIAssistantView
            onLogActivity={logActivity}
            onOpenVoice={() => setIsVoiceModalOpen(true)}
          />
        )}

        {currentTab === 'voice' && (
          <div className="py-8">
            <VoiceAssistantModal
              isOpen={true}
              onClose={() => setCurrentTab('home')}
              onLogActivity={logActivity}
            />
          </div>
        )}

        {currentTab === 'apps' && (
          <AppsGridView
            onOpenApp={handleOpenAppById}
            onLogActivity={logActivity}
          />
        )}

        {currentTab === 'apk' && (
          <ApkHubView
            onOpenApkModal={() => setIsApkModalOpen(true)}
            onInstallPwa={async () => {
              if (isInstallable) {
                await install();
              } else {
                setIsInstallPopupOpen(true);
              }
            }}
            isInstallable={isInstallable}
            isInstalled={isInstalled}
            isAndroid={isAndroid}
          />
        )}
      </main>

      {/* 3. Material 3 Android Bottom Navigation Bar */}
      <AndroidBottomNav currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Offline Mode Indicator */}
      <OfflineIndicator />

      {/* Installation Popup Modal */}
      <AndroidInstallPopup
        isOpen={isInstallPopupOpen}
        onClose={() => {
          dismiss(3); // Do not repeatedly prompt user if dismissed
          setIsInstallPopupOpen(false);
        }}
        onInstallNow={async () => {
          await install();
        }}
        onOpenApkModal={() => {
          setIsInstallPopupOpen(false);
          setIsApkModalOpen(true);
        }}
        isAndroid={isAndroid}
        isInstallable={isInstallable}
      />

      {/* Dedicated APK Download Modal */}
      <ApkDownloadModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
        onLogActivity={logActivity}
      />

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onLogActivity={logActivity}
      />

      {/* Calendar Modal */}
      <CalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
        events={events}
        onAddEvent={(newEvent) => {
          setEvents((prev) => [...prev, { ...newEvent, id: Date.now().toString() }]);
          logActivity(`Scheduled: ${newEvent.title}`, 'system');
        }}
        onToggleComplete={(id) => {
          setEvents((prev) =>
            prev.map((e) => (e.id === id ? { ...e, completed: !e.completed } : e))
          );
        }}
        onDeleteEvent={(id) => {
          setEvents((prev) => prev.filter((e) => e.id !== id));
        }}
      />

      {/* Clock Tools Modal */}
      <ClockToolsModal
        isOpen={isClockModalOpen}
        onClose={() => setIsClockModalOpen(false)}
      />

      {/* Watchlist Modal */}
      <WatchlistModal
        isOpen={isWatchlistModalOpen}
        onClose={() => setIsWatchlistModalOpen(false)}
        items={watchlist}
        onAddItem={(item) => {
          setWatchlist((prev) => [...prev, { ...item, id: Date.now().toString() }]);
          logActivity(`Added to watchlist: ${item.title}`, 'app');
        }}
        onToggleStatus={(id) => {
          setWatchlist((prev) =>
            prev.map((w) =>
              w.id === id
                ? {
                    ...w,
                    status: w.status === 'completed' ? 'watching' : 'completed',
                  }
                : w
            )
          );
        }}
        onDeleteItem={(id) => {
          setWatchlist((prev) => prev.filter((w) => w.id !== id));
        }}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onResetInstallPrompt={() => {
          resetDismissal();
          setIsInstallPopupOpen(true);
        }}
        isInstalled={isInstalled}
        glowLevel={glowLevel}
        onChangeGlow={setGlowLevel}
      />
    </div>
  );
}
