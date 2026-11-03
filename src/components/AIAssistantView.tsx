import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Volume2, Sparkles, Mic, Trash2 } from 'lucide-react';
import { Message, generateJarvisResponse } from '../services/jarvisAI';
import { sound } from '../services/soundEffects';

interface AIAssistantViewProps {
  onLogActivity?: (action: string, type: 'chat') => void;
  onOpenVoice: () => void;
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({
  onLogActivity,
  onOpenVoice,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'jarvis',
      text: 'Good day, Sir. I am JARVIS, your mobile AI concierge. How may I assist your operations today? You can query the atmosphere, request a briefing, or initiate the Android APK installation.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    sound.playBeep(880);
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    if (onLogActivity) {
      onLogActivity(`Chat query: "${query}"`, 'chat');
    }

    setTimeout(() => {
      const responseText = generateJarvisResponse(query);
      const jarvisMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'jarvis',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, jarvisMsg]);
      setIsTyping(false);
      sound.playAffirmative();
    }, 600);
  };

  const handleSpeak = (text: string) => {
    sound.speak(text);
  };

  const handleClear = () => {
    sound.playBeep(440);
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'jarvis',
        text: 'Command terminal cleared. Standby for new directives.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-2xl mx-auto px-3 py-2">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-cyan-900/40">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-400 p-1 flex items-center justify-center">
            <Bot className="w-4 h-4 text-cyan-300" />
          </div>
          <div>
            <h2 className="font-orbitron font-bold text-xs text-white">
              JARVIS Neural Terminal
            </h2>
            <span className="text-[10px] font-mono text-cyan-400">
              Low Latency Concierge Engine
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenVoice}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono hover:bg-cyan-900/60 transition"
          >
            <Mic className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Voice Mode</span>
          </button>
          <button
            onClick={handleClear}
            className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-slate-200"
            title="Clear Terminal"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${
              msg.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs ${
                msg.sender === 'user'
                  ? 'bg-slate-800 text-slate-200 border border-slate-700'
                  : 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[82%] rounded-2xl p-3 text-xs font-rajdhani leading-relaxed shadow-md ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-900/40 to-slate-900 text-slate-100 border border-cyan-800/40 rounded-tr-none'
                  : 'bg-[#081322] text-cyan-50 border border-cyan-900/60 rounded-tl-none'
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-1">
                <span className="text-[10px] font-mono font-bold uppercase text-cyan-400">
                  {msg.sender === 'user' ? 'Operator' : 'JARVIS AI'}
                </span>
                <span className="text-[9px] font-mono text-slate-500">{msg.timestamp}</span>
              </div>
              <p className="whitespace-pre-wrap">{msg.text}</p>
              {msg.sender === 'jarvis' && (
                <div className="mt-2 pt-1 border-t border-cyan-950/60 flex justify-end">
                  <button
                    onClick={() => handleSpeak(msg.text)}
                    className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 hover:text-cyan-200"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>Speak</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono py-2">
            <Bot className="w-4 h-4 animate-bounce" />
            <span className="animate-pulse">JARVIS is processing query...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Chips */}
      <div className="py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px] font-mono">
        <span className="text-slate-500 text-[10px] shrink-0">PROMPTS:</span>
        {[
          'Download Android APK',
          'Morning briefing',
          'Atmosphere check',
          'System diagnostic',
        ].map((chip) => (
          <button
            key={chip}
            onClick={() => handleSend(chip)}
            className="px-2.5 py-1 rounded-full bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/40 text-cyan-300 whitespace-nowrap transition"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="pt-1">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#07111e] border border-cyan-500/40 shadow-lg shadow-cyan-950/50"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type directive to JARVIS..."
            className="flex-1 bg-transparent px-3 text-xs text-white placeholder:text-slate-500 font-rajdhani focus:outline-none"
          />

          <button
            type="button"
            onClick={onOpenVoice}
            className="p-2 rounded-xl text-cyan-400 hover:bg-cyan-950/60 transition"
            title="Voice Command"
          >
            <Mic className="w-4 h-4" />
          </button>

          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 transition active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
