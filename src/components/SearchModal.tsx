import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, ArrowRight } from 'lucide-react';
import { ALL_LESSONS } from '../data';
import { Lesson } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (lessonId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // toggle will be handled by parent or custom handler
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = searchTerm.trim()
    ? ALL_LESSONS.filter((l: Lesson) => {
        const query = searchTerm.toLowerCase();
        return (
          l.title.toLowerCase().includes(query) ||
          l.objectives.some(o => o.toLowerCase().includes(query)) ||
          l.concepts.some(c => c.title.toLowerCase().includes(query) || c.definition.toLowerCase().includes(query)) ||
          l.codeExample.code.toLowerCase().includes(query)
        );
      })
    : ALL_LESSONS.slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-scaleUp">
        {/* Search Input */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm bài học theo từ khóa, cú pháp, khái niệm..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1">
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-3 py-1">
            {searchTerm ? `Kết quả tìm kiếm (${filtered.length})` : 'Gợi ý bài học tiêu biểu'}
          </div>

          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              Không tìm thấy bài học nào khớp với từ khóa "{searchTerm}".
            </div>
          ) : (
            filtered.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  onSelectLesson(l.id);
                  onClose();
                }}
                className="w-full p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors flex items-center justify-between group"
              >
                <div className="space-y-0.5 pr-2">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {l.title}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-md">
                    {l.objectives[0]}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 shrink-0 transition-colors" />
              </button>
            ))
          )}
        </div>

        {/* Modal footer shortcut note */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 px-4">
          <span>Nhấn ESC để đóng</span>
          <span>FLASK WEB LEARNING</span>
        </div>
      </div>
    </div>
  );
};
