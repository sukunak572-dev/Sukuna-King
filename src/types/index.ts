export interface PWAInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export interface ActivityLog {
  id: string;
  action: string;
  timestamp: string;
  type: 'voice' | 'system' | 'app' | 'download' | 'chat';
}

export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  category: 'work' | 'personal' | 'ai-task' | 'alert';
  completed: boolean;
}

export interface WatchlistItem {
  id: string;
  title: string;
  type: 'movie' | 'series' | 'documentary' | 'book';
  status: 'watching' | 'plan_to_watch' | 'completed';
  rating?: number;
}

export interface ApkReleaseInfo {
  version: string;
  buildNumber: number;
  releaseDate: string;
  fileSizeBytes: number;
  fileSizeFormatted: string;
  sha256: string;
  downloadUrl: string;
  packageName: string;
  minAndroidVersion: string;
  targetSdk: number;
  changelog: string[];
}
