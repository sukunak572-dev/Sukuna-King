import React, { useState } from 'react';
import { Film, Plus, Trash2, CheckCircle2, X } from 'lucide-react';
import { WatchlistItem } from '../types';
import { sound } from '../services/soundEffects';

interface WatchlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: WatchlistItem[];
  onAddItem: (item: Omit<WatchlistItem, 'id'>) => void;
  onToggleStatus: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

export const WatchlistModal: React.FC<WatchlistModalProps> = ({
  isOpen,
  onClose,
  items,
  onAddItem,
  onToggleStatus,
  onDeleteItem,
}) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'movie' | 'series' | 'documentary' | 'book'>('movie');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    sound.playAffirmative();
    onAddItem({
      title: title.trim(),
      type,
      status: 'plan_to_watch',
    });
    setTitle('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-md rounded-3xl bg-gradient-to-b from-[#091424] to-[#040810] border-2 border-cyan-500/50 p-5 shadow-2xl shadow-cyan-500/30 text-white relative max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Film className="w-5 h-5 text-cyan-400" />
          <h2 className="font-orbitron font-extrabold text-lg text-white">
            JARVIS Watchlist & Media
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mb-4 p-3 rounded-2xl bg-[#06101c] border border-cyan-900/60 space-y-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add title (e.g. Iron Man, Severance)..."
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-cyan-800/60 text-white text-xs font-rajdhani focus:outline-none focus:border-cyan-400"
          />
          <div className="flex gap-2">
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-800/60 text-white text-xs font-mono focus:outline-none focus:border-cyan-400 flex-1"
            >
              <option value="movie">Movie</option>
              <option value="series">TV Series</option>
              <option value="documentary">Documentary</option>
              <option value="book">Sci-Fi Book</option>
            </select>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron font-bold text-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </form>

        <div className="space-y-2">
          {items.length === 0 ? (
            <p className="text-xs font-mono text-slate-500 italic py-4 text-center">
              Watchlist empty. Add media to track.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-[#06101c] border border-cyan-900/60 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleStatus(item.id)}
                    className="text-cyan-400 hover:text-cyan-200"
                  >
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        item.status === 'completed' ? 'text-cyan-400' : 'text-slate-600'
                      }`}
                    />
                  </button>
                  <div>
                    <span
                      className={`text-xs font-rajdhani font-semibold block ${
                        item.status === 'completed' ? 'line-through text-slate-500' : 'text-white'
                      }`}
                    >
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400/70 capitalize">
                      {item.type} · {item.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="p-1 rounded text-slate-500 hover:text-rose-400"
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
