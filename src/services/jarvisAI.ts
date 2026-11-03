export interface Message {
  id: string;
  sender: 'user' | 'jarvis';
  text: string;
  timestamp: string;
}

export function generateJarvisResponse(query: string): string {
  const q = query.toLowerCase().trim();

  if (q.includes('apk') || q.includes('download') || q.includes('install')) {
    return 'The Android APK for JARVIS AI Concierge (v2.4.1 Build 20261102) is ready for direct installation. It is 18.4 MB, signed by Adam Boys Dev Team, and compatible with Android 8.0 through 15. Tap "Download Android App" from the top bar or APK Hub to start.';
  }

  if (q.includes('weather') || q.includes('forecast') || q.includes('atmosphere')) {
    return 'Atmospheric scan indicates 22°C (72°F) under clear skies. Humidity is at 48%, wind speed is 8 km/h NW, and barometric pressure is steady at 1014 hPa. Optimal conditions for mobile deployment.';
  }

  if (q.includes('briefing') || q.includes('morning') || q.includes('status report')) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `Good day, Sir. Current system time is ${time}. All JARVIS background services, neural subsystems, and PWA caches are operating at peak efficiency. You have 2 calendar items scheduled today. Weather is clear, and the signed APK v2.4.1 download node is active.`;
  }

  if (q.includes('diagnostic') || q.includes('system') || q.includes('specs')) {
    return 'Diagnostic completed in 14ms: Kernel state: Online. GPU acceleration: Active (Vulkan/WebGL). PWA Service Worker: Registered. Local cache: 100% synchronized. Security signature: Verified.';
  }

  if (q.includes('who are you') || q.includes('what can you do') || q.includes('adam boys')) {
    return 'I am JARVIS, your intelligent AI Concierge developed for mobile and desktop systems by Adam boys. I coordinate your schedule, apps, voice commands, atmospheric telemetry, and provide direct APK/PWA mobile delivery.';
  }

  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return 'Greetings, Sir. JARVIS is at your service. How may I assist you with your digital command center today?';
  }

  if (q.includes('event') || q.includes('reminder') || q.includes('schedule')) {
    return 'I have opened your schedule manager. You can review today\'s events, add priority tasks, or set reminders using the Calendar tool in the Apps grid.';
  }

  if (q.includes('time') || q.includes('date')) {
    const now = new Date();
    return `Current time is ${now.toLocaleTimeString()} on ${now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}.`;
  }

  return `Affirmative, Sir. I have processed "${query}". All protocols verified. I can assist you with your schedule, weather telemetry, system diagnostics, or mobile APK installation.`;
}
