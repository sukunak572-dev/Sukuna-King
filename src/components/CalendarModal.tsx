import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, CheckCircle, Clock, Trash2, X } from 'lucide-react';
import { CalendarEvent } from '../types';
import { sound } from '../services/soundEffects';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: CalendarEvent[];
  onAddEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  onToggleComplete: (id: string) => void;
  onDeleteEvent: (id: string) => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({
  isOpen,
  onClose,
  events,
  onAddEvent,
  onToggleComplete,
  onDeleteEvent,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('14:00');
  const [newCategory, setNewCategory] = useState<'work' | 'personal' | 'ai-task' | 'alert'>('work');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    sound.playAffirmative();
    onAddEvent({
      title: newTitle.trim(),
      time: newTime,
      category: newCategory,
      completed: false,
    });
    setNewTitle('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-md rounded-3xl bg-gradient-to-b from-[#091424] to-[#040810] border-2 border-cyan-500/50 p-5 shadow-2xl shadow-cyan-500/30 text-white relative max-h-[85vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playBeep(440);
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-orbitron font-extrabold text-lg text-white">
              JARVIS Schedule & Events
            </h2>
            <p className="text-xs text-cyan-400 font-mono">
              Temporal event coordination
            </p>
          </div>
        </div>

        {/* Add Event Form */}
        <form onSubmit={handleSubmit} className="mb-4 p-3 rounded-2xl bg-[#06101c] border border-cyan-900/60 space-y-2.5">
          <div className="text-[11px] font-mono text-cyan-400 font-semibold uppercase">
            Schedule New Item
          </div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Event or task title..."
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-cyan-800/60 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-rajdhani"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-800/60 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as any)}
              className="px-2 py-1.5 rounded-xl bg-slate-900 border border-cyan-800/60 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
            >
              <option value="work">Work Protocol</option>
              <option value="personal">Personal</option>
              <option value="ai-task">AI Concierge</option>
              <option value="alert">Critical Alert</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron font-bold text-xs flex items-center justify-center gap-1 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to JARVIS Calendar</span>
          </button>
        </form>

        {/* Events List */}
        <div className="space-y-2">
          <div className="text-xs font-orbitron font-bold text-slate-300">
            Today's Schedule ({events.length})
          </div>
          {events.length === 0 ? (
            <p className="text-xs font-mono text-slate-500 italic py-4 text-center">
              All clear. No upcoming reminders.
            </p>
          ) : (
            events.map((evt) => (
              <div
                key={evt.id}
                className={`p-3 rounded-xl border flex items-center justify-between gap-2 transition ${
                  evt.completed
                    ? 'bg-slate-900/40 border-slate-800 opacity-60'
                    : 'bg-[#071322] border-cyan-900/60 hover:border-cyan-500/40'
                }`}
              >
                <button
                  onClick={() => {
                    sound.playBeep(880);
                    onToggleComplete(evt.id);
                  }}
                  className="flex items-center gap-2.5 text-left flex-1"
                >
                  <CheckCircle
                    className={`w-4 h-4 shrink-0 ${
                      evt.completed ? 'text-cyan-400' : 'text-slate-600'
                    }`}
                  />
                  <div>
                    <span
                      className={`text-xs font-rajdhani font-semibold block ${
                        evt.completed ? 'line-through text-slate-400' : 'text-white'
                      }`}
                    >
                      {evt.title}
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400/80">
                      <Clock className="w-3 h-3" />
                      <span>{evt.time}</span>
                      <span>·</span>
                      <span className="capitalize">{evt.category}</span>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    sound.playBeep(320);
                    onDeleteEvent(evt.id);
                  }}
                  className="p-1 rounded text-slate-500 hover:text-rose-400 transition"
                  aria-label="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
