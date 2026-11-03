import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, X, Sparkles } from 'lucide-react';
import { ArcReactor } from './ArcReactor';
import { sound } from '../services/soundEffects';
import { generateJarvisResponse } from '../services/jarvisAI';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogActivity?: (action: string, type: 'voice') => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  onLogActivity,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('Tap the microphone or say "Morning briefing"...');
  const [jarvisReply, setJarvisReply] = useState<string>('Greetings, Sir. JARVIS voice link established.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen) {
      sound.stopSpeaking();
      setIsListening(false);
      setIsSpeaking(false);
      return;
    }

    // Greet upon opening
    sound.speak('JARVIS voice channel online. Listening, Sir.', () => {
      setIsSpeaking(false);
    });
    setIsSpeaking(true);

    // Initialize Web Speech Recognition if available
    const SpeechRec = (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (SpeechRec) {
      const rec = new SpeechRec();
      rec.continuous = false;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsListening(true);
        setTranscript('Listening for command...');
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rec.onresult = (e: any) => {
        const text = Array.from(e.results)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((res: any) => res[0].transcript)
          .join('');
        setTranscript(text);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }

    return () => {
      sound.stopSpeaking();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleListen = () => {
    sound.playArcPulse();
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
    } else {
      sound.stopSpeaking();
      setIsSpeaking(false);
      setTranscript('Listening for your command...');
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch {
          // If already started or blocked
          simulateVoiceInput('Morning briefing');
        }
      } else {
        // Fallback simulated input for devices without Web Speech API
        simulateVoiceInput('What is the atmospheric status?');
      }
    }
  };

  const simulateVoiceInput = (sample: string) => {
    setIsListening(true);
    setTranscript(`Simulating voice: "${sample}"...`);
    setTimeout(() => {
      setIsListening(false);
      handleProcessQuery(sample);
    }, 1200);
  };

  const handleProcessQuery = (query: string) => {
    sound.playBeep(920);
    const reply = generateJarvisResponse(query);
    setJarvisReply(reply);
    setIsSpeaking(true);
    sound.speak(reply, () => {
      setIsSpeaking(false);
    });
    if (onLogActivity) {
      onLogActivity(`Voice query: "${query}"`, 'voice');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-xl">
      <div className="w-full max-w-md rounded-3xl bg-gradient-to-b from-[#071322] to-[#040810] border-2 border-cyan-500/60 p-6 shadow-2xl shadow-cyan-500/40 text-white relative text-center flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.stopSpeaking();
            sound.playBeep(440);
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase flex items-center justify-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>NEURAL AUDIO INTERFACE</span>
        </div>

        <h2 className="font-orbitron font-extrabold text-xl text-white mb-6">
          JARVIS Voice Assistant
        </h2>

        {/* Central Glowing Arc Reactor */}
        <div className="my-2">
          <ArcReactor
            size="lg"
            isSpeaking={isSpeaking}
            isListening={isListening}
            onClick={toggleListen}
          />
        </div>

        {/* Transcript Box */}
        <div className="w-full my-4 p-3.5 rounded-2xl bg-[#06101c] border border-cyan-500/30 text-left min-h-24">
          <div className="text-[10px] font-mono text-cyan-400/80 mb-1 flex justify-between">
            <span>VOICE TRANSCRIPT</span>
            <span className="text-slate-400">
              {isListening ? 'RECEIVING' : isSpeaking ? 'SYNTHESIZING' : 'STANDBY'}
            </span>
          </div>
          <p className="text-xs font-rajdhani text-slate-200 italic mb-2">
            "{transcript}"
          </p>
          <div className="pt-2 border-t border-cyan-900/50">
            <span className="text-[10px] font-mono text-cyan-300 block mb-0.5">JARVIS:</span>
            <p className="text-xs font-rajdhani text-cyan-100 font-semibold leading-relaxed">
              {jarvisReply}
            </p>
          </div>
        </div>

        {/* Mic Control Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleListen}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-95 cursor-pointer ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse shadow-rose-500/50'
                : 'bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 shadow-cyan-500/50'
            }`}
          >
            {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
          </button>
        </div>

        {/* Quick Voice Prompt Chips */}
        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          {['Morning briefing', 'Atmosphere check', 'Download APK', 'System diagnostic'].map(
            (cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setTranscript(cmd);
                  handleProcessQuery(cmd);
                }}
                className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-950/60 hover:bg-cyan-900/70 border border-cyan-800/40 text-cyan-300 transition"
              >
                "{cmd}"
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
